import Button from "@/components/Button/Button";
import IconFont from "@/components/IconFont/IconFont";
import type { ButtonProps } from "antd";
const RefreshDataBtn = ({ onClick }: ButtonProps) => {
  return (
    <Button
      className="h-8 w-8 pr-0 pl-0"
      onClick={onClick}
      icon={<IconFont type={"icon-reset"} />}
    ></Button>
  );
};
export default RefreshDataBtn;
