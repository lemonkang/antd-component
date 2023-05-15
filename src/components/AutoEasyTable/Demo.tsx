import {
  AutoEasyTable,
  useAutoEasyTable,
} from "@components/AutoEasyTable/AutoEasyTable";
import Button from "@components/Button/Button";
import { Space } from "antd";

// eslint-disable-next-line react/display-name
export default () => {
  const table$ = useAutoEasyTable();
  return (
    <div>
      <Space>
        <Button
          onClick={() => {
            table$.emit("refresh");
          }}
        >
          refresh
        </Button>
        <Button
          onClick={() => {
            table$.emit("reset");
          }}
        >
          reset
        </Button>
      </Space>
      <AutoEasyTable
        table$={table$}
        columns={[
          {
            dataIndex: "name",
            title: "name",
            width: "25%",
          },
          {
            dataIndex: "age",
            title: "age",
          },
          {
            dataIndex: "career",
            title: "career",
          },
        ]}
        url={"/test"}
      />
    </div>
  );
};
