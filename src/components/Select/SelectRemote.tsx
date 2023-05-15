import { Select } from "@components/Select/Select";
import SpinIcon from "@components/SpinIcon/SpinIcon";
import type { SelectProps } from "antd";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import type { LabelInValue } from "@components/Select/AvatarOption";
import { message } from "antd";
import { useRequest } from "ahooks";

export type SelectOption = {
  value: string
  label: ReactNode
}

type Props = {
  handleSearch: (search?: string) => Promise<SelectOption[]>
  onSelect: (value: string | LabelInValue ) => void
  onCreateOption?: () => void
} & Omit<SelectProps, 'showSearch' | 'labelInValue' | 'defaultActiveFirstOption' | 'filterOption'>

export function SelectRemote({ handleSearch, onSelect,suffixIcon, ...props }: Props) {

  const [options, setOptions] = useState<SelectOption[]>([]);
  const [value, setValue] = useState<string>();

  const { run: getOptions, loading } = useRequest(handleSearch, {
    onSuccess(data) {
      setOptions(data);
    },
    onError(e) {
      message.error(e.message);
    }
  });
  const debounce = useRef<ReturnType<typeof setTimeout>>();
  const searchData = async (search: string) => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      try{
        getOptions(search);
      }catch (error){
        message.success(error as string);
      }
    }, 500);
  };

  return (
    <Select
      showSearch
      labelInValue
      value={value}
      defaultActiveFirstOption={false}
      filterOption={false}
      onSearch={searchData}
      onChange={(v: string) => { setValue(v); }}
      onSelect={onSelect}
      notFoundContent={loading ? <SpinIcon /> : null}
      options={options}
      suffixIcon={suffixIcon}
      {...props}
    />
  );
}