import type { LabelInValue } from "@components/Select/AvatarOption";
import { AvatarOption } from "@components/Select/AvatarOption";
import { SelectChecker as BasicSelectChecker } from "@/features/Payout/select-checker/SelectChecker";
import type { Checker } from "@apis/payout";

type Props = {
  value?: LabelInValue
  onChange?: (uuid: LabelInValue) => void
}

export function SelectChecker({ value, onChange }: Props) {

  const handleRecordToLabelInValue = (checker: Checker) => {
    const item = {
      title: checker.username,
      content1: checker.phone,
      content2: checker.email
    };
    return ({
      value: checker.id,
      label: <AvatarOption item={item} showAvatar />
    });
  };

  return (
    <BasicSelectChecker
      value={value}
      onChange={onChange}
      url={"/payout/txn/checkers"}
      handleRecordToLabelInValue={handleRecordToLabelInValue}
    />
  );
}