import type { TabsProps } from "antd";
import { Space } from "antd";
import TabsCard from "@components/TabsCard/TabsCard";

export default function Demo() {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Tab 1`,
      children: `Content of Tab Pane 1`,
    },
    {
      key: "2",
      label: `Tab 2`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: "3",
      label: `Tab 3`,
      children: `Content of Tab Pane 3`,
    },
    {
      key: "4",
      label: `Tab 4`,
      children: `Content of Tab Pane 4`,
    },
    {
      key: "5",
      label: `Tab 5`,
      children: `Content of Tab Pane 5`,
    },
  ];
  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <TabsCard defaultActiveKey="1" items={items} onChange={onChange} />
    </Space>
  );
}
