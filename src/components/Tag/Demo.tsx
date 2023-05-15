import { Space } from "antd";
import { Tag, TagColor } from "@components/Tag/Tag";

export default () => {
  return (
    <Space>
      <Tag text={"hello"} type={"primary"} />
      <Tag text={"hello"} type={"outline"} />
      <Tag text={"hello"} type={"text"} color={TagColor.gray} />
      <Tag text={"hello"} type={"text"} color={TagColor.blue} />
      <Tag text={"hello"} type={"text"} color={TagColor.yellow} />
      <Tag text={"hello"} color={TagColor.green} />
      <Tag text={"hello"} color={TagColor.gray} />
      <Tag text={"hello"} color={TagColor.red} />
      <Tag text={"hello"} color={TagColor.yellow} />
      <Tag text={"hello"} color={TagColor.lightBlue} />
      <Tag text={"hello"} color={TagColor.purple} />
      <Tag text={"hello"} size={"lg"} />
    </Space>
  );
};
