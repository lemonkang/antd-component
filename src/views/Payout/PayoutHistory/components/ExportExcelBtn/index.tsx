import Button from "@/components/Button/Button";
import IconFont from "@/components/IconFont/IconFont";
import type { ButtonProps } from "antd";
const ExportExcelBtn = ({ onClick }: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="h-8 text-sm"
      size="small"
      type={"primary"}
      icon={<IconFont type={"icon-download"} />}
    >
      Export EXCEL
    </Button>
  );
};
export default ExportExcelBtn;
