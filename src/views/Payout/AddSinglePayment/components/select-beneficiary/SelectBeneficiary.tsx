import { SelectBeneficiary as BasicSelectBeneficiary } from "@/features/Payout/select-beneficiary/SelectBeneficiary";
import type { LabelInValue } from "@components/Select/AvatarOption";
import { AvatarOption } from "@components/Select/AvatarOption";
import type { Beneficiary } from "@apis/payout";

type Props = {
  value?: LabelInValue
  onChange?: (uuid: LabelInValue) => void
}

export function SelectBeneficiary({ value, onChange }: Props) {

  const handleRecordToLabelInValue = (beneficiary: Beneficiary) => {
    const item = {
      title: beneficiary.beneficiaryName,
      content1: beneficiary.accountBankName,
      content2: beneficiary.accountNumber
    };
    return ({
      value: beneficiary.uuid,
      label: <AvatarOption item={item} />
    });
  };

  const handleCreateBeneficiary = () => {
    console.log("open create beneficiary dialog");
  };
  return (
    <BasicSelectBeneficiary
      value={value}
      onChange={onChange}
      url={"/payout/bene/account/list"}
      handleRecordToLabelInValue={handleRecordToLabelInValue}
      onCreateOption={handleCreateBeneficiary}
    />
  );
}