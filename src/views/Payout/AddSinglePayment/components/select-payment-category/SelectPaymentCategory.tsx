import { Select } from "@components/Select/Select";

export enum TransactionCategory {
  vendor = "Vendor payment",
  utility = "Utilities & Phone",
  travel = "Travel & Hotel",
  ad = "Advertising & Marketing",
  service = "Professional business services",
  edu = "Training & Education",
  food = "Food & Entertainment",
  office = "Office supplies",
  software = "Website & Software",
  payroll = "Payroll",
  other = "Others",
}


const categoryOptions = Object
  .entries(TransactionCategory)
  .map(([_, value]) => ({ value, label: value }))
  .slice(1);

type Props = {
  value?: TransactionCategory
  onChange?: (category: TransactionCategory) => void
}

export function SelectPaymentCategory({ value, onChange }: Props) {
  return (
    <Select
      value={value}
      onChange={onChange}
      placeholder={"Select"}
      options={categoryOptions}
    />
  );
}