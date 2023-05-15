import type { ButtonProps } from "antd";
import { Button } from "antd";
import IconFont from "@components/IconFont/IconFont";

const defaultIcon = <IconFont type={"icon-cross"} />;

function AddButton({ icon, ...props }: ButtonProps) {
  return <Button {...props} icon={icon ?? defaultIcon} />;
}

export default AddButton;
