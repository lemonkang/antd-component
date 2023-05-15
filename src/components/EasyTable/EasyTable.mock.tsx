import type { EasyTable } from "@components/EasyTable/EasyTable";
import type { ComponentProps } from "react";
import NiceModal, { antdModalV5, useModal } from "@ebay/nice-modal-react";
import { Modal } from "@components/Modal/Modal";

const ViewModal = NiceModal.create<{ record: any }>(({ record }) => {
  const modal = useModal();
  return <Modal {...antdModalV5(modal)}>hi {record.name}</Modal>;
});

export const EasyTableProps: ComponentProps<typeof EasyTable> = {
  filterSerialize: (value) => {
    return value.join("|");
  },
  onTableConditionChange: (change) => {
    console.log(change);
  },
  onRefresh: () => {
    console.log("refresh");
  },
  size: "small",
  rowKey: "name",
  columns: [
    {
      dataIndex: "name",
      title: "Name",
    },
    {
      dataIndex: "age",
      title: "Age",
      align: "right",
    },
    {
      dataIndex: "birthday",
      title: "Birth",
    },
    {
      dataIndex: "career",
      title: "Career",
    },
  ],
  filter: {
    name: {
      options: [
        {
          value: "wang",
        },
        {
          text: "Li",
          value: "li",
        },
      ],
    },
  },

  dataSource: [
    {
      name: "jiaxi",
      age: 18,
      birthday: "1993-03-31",
      career: "worker",
    },
    {
      name: "vito",
      age: 30,
      birthday: "2000-01-01",
    },
  ],
  sorter: {
    age: null,
  },
  formatter: {
    age: {
      type: "currency",
      hasUnit: true,
    },
    birthday: {
      type: "datetime",
      datetimeFormat: "YYYY-MM-DD",
    },
    career: {
      type: "enum",
      enum: {
        worker: (value) => <span className={"text-primary"}>{value}</span>,
        student: "学生",
      },
    },
  },
  colEmptyText: "--",
  action: {
    title: "Action",
    items: [
      {
        text: "view",
        onClick: ({ record }) => {
          NiceModal.show(ViewModal, { record });
        },
      },
      {
        text: "delete",
        danger: (record) => {
          return record.name === "vito";
        },
        onClick: ({ onRefresh }) => {
          onRefresh?.();
        },
      },
    ],
  },
  onChange: (...args) => {
    console.log("onChoose", ...args);
  },
};
