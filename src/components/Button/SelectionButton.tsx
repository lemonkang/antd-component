import type { ButtonProps } from "antd";
import { Button } from "antd";
import IconFont from "@components/IconFont/IconFont";

const defaultIcon = (
  <IconFont type={"icon-arrow-down"} className={"ml-2 text-lg leading-none"} />
);

function SelectButton({ children, ...props }: ButtonProps) {
  const childrenNode =
    typeof children === "string" ? (
      <div className={"flex"}>
        {children}
        {defaultIcon}
      </div>
    ) : (
      children
    );
  return <Button {...props} children={childrenNode} />;
}

export default SelectButton;
