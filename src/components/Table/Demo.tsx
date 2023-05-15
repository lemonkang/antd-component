import Table from "@components/Table/Table";
import FnTextContainer from "@components/Table/FnTextContainer";
import type { ColumnsType, TableProps } from "antd/es/table";
import type React from "react";
import { useState } from "react";

function Demo() {
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Category 1",
          value: "Category 1",
        },
        {
          text: "Category 2",
          value: "Category 2",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value as string),
      width: "30%",
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.startsWith(value as string),
      filterSearch: true,
      width: "40%",
    },
    {
      title: "Operation",
      dataIndex: "age",
      render: (age) => {
        const fnTexts = [
          {
            item: "Edit",
            onClick: () => {
              console.log(age, "Edit");
            },
          },
          {
            item: "Delete",
            onClick: () => {
              console.log(age, "Delete");
            },
          },
        ];
        return <FnTextContainer fnTexts={fnTexts} />;
      },
    },
  ];

  const data: DataType[] = [
    {
      key: "01",
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
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
    {
      key: "5",
      name: "John Brown",
      age: 35,
      address: "New York No. 5 Lake Park",
    },
    {
      key: "6",
      name: "Jim Green6",
      age: 46,
      address: "London No. 6 Lake Park",
    },
    {
      key: "7",
      name: "Joe Black7",
      age: 37,
      address: "Sydney No. 7 Lake Park",
    },
    {
      key: "8",
      name: "Jim Red8",
      age: 38,
      address: "London No. 8 Lake Park",
    },
    {
      key: "9",
      name: "John Brown9",
      age: 39,
      address: "New York No. 9 Lake Park",
    },
    {
      key: "10",
      name: "Jim Green10",
      age: 42,
      address: "London No. 10 Lake Park",
    },
    {
      key: "11",
      name: "Joe Black11",
      age: 31,
      address: "Sydney No. 11 Lake Park",
    },
    {
      key: "12",
      name: "Jim Red12",
      age: 32,
      address: "London No. 12 Lake Park",
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === "Jim Green",
      name: record.name,
    }),
  };
  return (
    <Table columns={columns} dataSource={data} rowSelection={rowSelection} />
  );
}

export default Demo;
