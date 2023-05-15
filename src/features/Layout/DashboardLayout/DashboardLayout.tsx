import { Layout } from "antd";
import type { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import Style from "./style.module.scss";
import { LogoWithToggle } from "@/features/Layout/DashboardLayout/LogoWithToggle";
import { CompanyCenter } from "@/features/Layout/DashboardLayout/CompanyCenter";
import { useAtom } from "jotai";
import atoms from "@/atoms";
import { SupportContact } from "@/features/Layout/DashboardLayout/SupportContact";
import { FAQ } from "@/features/Layout/DashboardLayout/FAQ";
import { UserPanel } from "@/features/Layout/DashboardLayout/UserPanel/UserPanel";
import { useLogout } from "@/features/Logout/useLogout";

export const DashboardLayout: FunctionComponent = () => {
  const logout = useLogout();
  const [collapsed, setCollapsed] = useAtom(atoms.layout.sideBarCollapsed);
  return (
    <Layout className={"text-gray-400"}>
      <Layout.Sider
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        width={212}
        collapsedWidth={80}
        className={"bg-gray-700 py-4"}
        breakpoint={"xl"}
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
      >
        <div className={"grid grid-cols-1 gap-6"}>
          <LogoWithToggle
            collapsed={collapsed}
            onToggle={() => {
              setCollapsed((prev) => !prev);
            }}
          />
          <CompanyCenter />
        </div>
      </Layout.Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 212 }}>
        <Layout.Header className={Style.header}>
          <div className="inline-grid grid-flow-col gap-4">
            <SupportContact />
            <FAQ />
            <UserPanel />
            <button onClick={logout.run}>logout</button>
          </div>
        </Layout.Header>
        <Layout.Content className={Style.content}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
