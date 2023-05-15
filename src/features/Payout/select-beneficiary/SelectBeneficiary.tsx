import type { SelectOption } from "@components/Select/SelectRemote";
import { SelectRemote } from "@components/Select/SelectRemote";
import type { LabelInValue } from "@components/Select/AvatarOption";
import { useMemo } from "react";
import apis from '@/apis'

type Props = {
  value?: LabelInValue
  onChange?: (item: LabelInValue) => void
  onCreateOption?: () => void
  url: string
  handleRecordToLabelInValue: (record: any) => SelectOption
}

export function SelectBeneficiary({ value, onChange, onCreateOption, url, handleRecordToLabelInValue }: Props) {

  const handleSearch = async (search?:string) => {
    const data = await apis.payout.getBeneficiaries(url,search)
    return data?.results.map(handleRecordToLabelInValue)
  };

  const handleSelect = (value: string | LabelInValue) => {
    if (typeof value !== "string") {
      onChange?.(value);
    }
  };

  const suffixIcon = useMemo(() => {
    if (value) {
      const accountNumber = value.label.props.item.content2;
      const safeNumber = "**** " + (accountNumber ? accountNumber.slice(-4) : "");
      return <div>{safeNumber}</div>;
    } else {
      return null;
    }
  }, [value]);

  return (
    <SelectRemote
      handleSearch={handleSearch}
      onSelect={handleSelect}
      placeholder={"input and search beneficiary"}
      suffixIcon={suffixIcon}
      onCreateOption={onCreateOption}
    />
  );
}