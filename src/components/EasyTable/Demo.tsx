import type React from "react";
import { EasyTable } from "./EasyTable";
import type { ColumnsType } from "antd/lib/table";

type DataRecord = {
  key: string;
  name: string;
  age: number;
  address: string;
};

const columns: ColumnsType<DataRecord> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

const data: DataRecord[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
];

const customConfig: any = {
  filter: {
    age: {
      options: [
        { text: "20-30", value: "20-30" },
        { text: "31-40", value: "31-40" },
        { text: "41-50", value: "41-50" },
      ],
      multiple: true,
    },
  },
  sorter: {
    age: "descend",
  },
  colEmptyText: "-",
  action: {
    items: [
      {
        text: "Edit",
        onClick: ({ record }: { record: DataRecord }) => {
          console.log("Edit clicked, record:", record);
        },
      },
      {
        text: "Delete",
        danger: true,
        onClick: ({ record }: { record: DataRecord }) => {
          console.log("Delete clicked, record:", record);
        },
      },
    ],
  },
};

const Demo: React.FC = () => {
  return (
    <EasyTable
      columns={columns}
      dataSource={data}
      {...customConfig}
      pagination={false}
    />
  );
};

export default Demo;
