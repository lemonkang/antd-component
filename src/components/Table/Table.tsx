import { Table as AntdTable } from "antd";
import type { TableProps } from "antd";
import IconFont from "@components/IconFont/IconFont";

const defaultFilterIcon = () => (
  <IconFont type="icon-filter" className={"text-lg"} />
);

function Table({ columns, pagination, size, ...props }: TableProps<any>) {
  const newColumns = columns?.map((col) => {
    if (col.filters) {
      return {
        ...col,
        filterIcon: col.filterIcon ?? defaultFilterIcon,
      };
    }
    return col;
  });
  return (
    <AntdTable
      size={size ?? "small"}
      {...props}
      columns={newColumns}
      pagination={
        typeof pagination === "boolean"
          ? pagination
          : { position: ["bottomCenter"], ...pagination }
      }
    />
  );
}

export default Table;
