import { Breadcrumb } from "antd";
import IconFont from "@components/IconFont/IconFont";
import type { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";

type Props = {
  breadItems: BreadcrumbItemType[]
  rightComponent?: JSX.Element
  className?: string
}

export function PageHeader({ breadItems, rightComponent, className }: Props) {
  const title = breadItems[breadItems.length - 1].title;
  return <div className={className}>
    <div className={"flex align-center justify-between"}>
      <span className={"text-gray-700 font-bold-inter text-3xl"}>{title}</span>
      {rightComponent}
    </div>
    <div className={"flex align-center mt-1"}>
      <IconFont type={"icon-dizhi"} className={"text-lg mr-2"} />
      <Breadcrumb
        items={breadItems}
      />
    </div>
  </div>;
}