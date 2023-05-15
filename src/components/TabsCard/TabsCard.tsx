import type { TabsProps } from "antd";
import { Tabs } from "antd";
import Style from "./tabsCard.module.scss";
import classNames from "classnames";

function TabsCard({ className, ...props }: TabsProps) {
  return (
    <Tabs
      type={"card"}
      className={classNames(Style.tabs, className)}
      {...props}
    />
  );
}

TabsCard.TabPane = Tabs.TabPane;

export default TabsCard;
