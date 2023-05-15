import { Space } from "antd";
import ExportExcelBtn from "@/views/Payout/PayoutHistory/components/ExportExcelBtn";
import RefreshDataBtn from "@/views/Payout/PayoutHistory/components/RefreshDataBtn";

const TableDataSearch = () => {
  return (
    <div>
      <Space>
        <ExportExcelBtn />
        <RefreshDataBtn />
      </Space>
    </div>
  );
};

export default TableDataSearch;
