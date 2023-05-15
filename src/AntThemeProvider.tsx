import type { ReactNode } from "react";
import AntTheme from "./config/Ant Design Theme.json";
import { ConfigProvider } from "antd";

function AntThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider theme={AntTheme}>
      <ConfigProvider
        theme={{
          inherit: true,
          components: {
            Layout: {
              colorBgHeader: "#fff",
            },
            Button: {
              controlHeightLG: 44,
              controlHeightSM: 24,
            },
            InputNumber: {},
            Checkbox: {
              borderRadiusSM: 2,
            },
            Tabs: {
              colorPrimary: "#242628",
              colorPrimaryHover: "#242628",
              colorPrimaryActive: "#242628",
              colorText: "#484B50",
            },
            Table: {
              colorTextHeading: "#66696D",
            },
            Pagination: {
              colorText: "#66696D",
              colorTextDisabled: "#B5B7BA",
            },
          },
          token: {
            fontFamily: "Inter Regular",
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ConfigProvider>
  );
}

export default AntThemeProvider;
