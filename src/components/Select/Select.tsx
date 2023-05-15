import { Select as AntSelect } from "antd";
import type { SelectProps } from "antd";
import IconFont from "@components/IconFont/IconFont";
import type { ReactElement } from "react";

type Props = {
  onCreateOption?: () => void
} & SelectProps

const defaultSuffixIcon = (
  <IconFont type={"icon-arrow-down"} className={"text-lg"} />
);
const defaultRemoveIcon = <IconFont type={"icon-fail"} className={"text-lg"} />;

export function Select({ onCreateOption, ...props }: Props) {

  return (
    <AntSelect
      suffixIcon={defaultSuffixIcon}
      removeIcon={defaultRemoveIcon}
      allowClear
      dropdownRender={(menu => <DropdownRender menu={menu} onCreateOption={onCreateOption} />)}
      {...props}
    />
  );
}


type TDropdownRender = {
  menu: ReactElement
  onCreateOption?: () => void
}

function DropdownRender({ menu, onCreateOption }: TDropdownRender) {
  return <>
    {menu}
    {
      onCreateOption &&
      <div
        onClick={onCreateOption}
        className={"cursor-pointer text-primary py-[5px] flex align-center justify-center border-t border-solid border-gray-100"}
      >
        <IconFont type={"icon-cross"} className={"text-lg mr-2"} />
        Create
      </div>
    }
  </>;
}