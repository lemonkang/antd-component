import classNames from "classnames";
import type { Key, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

interface TabItemProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function TabItem({ label, active, onClick }: TabItemProps) {
  return (
    <li
      onClick={onClick}
      className={classNames(
        "py-2 border-b-2 cursor-pointer transition-colors",
        active ? "border-color text-color" : "border-transparent text-gray-500",
        "hover:text-color hover:border-color"
      )}
    >
      <div>{label}</div>
    </li>
  );
}
type TableTabsProps = {
  items: Array<{ label: string; key: Key; children?: ReactNode }>;
  activeKey?: Key;
  onTabClick?: (key: Key) => void;
  contentClassName?: string;
  containerClassName?: string;
  tabHeaderClassName?: string;
};
export const TableTabs = ({
  items,
  activeKey,
  onTabClick,
  containerClassName,
  contentClassName,
  tabHeaderClassName,
}: TableTabsProps) => {
  const [current, setCurrent] = useState<Key | undefined>(activeKey);
  useEffect(() => {
    if (activeKey) {
      setCurrent(activeKey);
    } else {
      setCurrent(items?.[0].key);
    }
  }, [activeKey, items]);
  const currentContent = useMemo(() => {
    return items?.find((item) => item.key === current)?.children;
  }, [items, current]);
  return (
    <div className={containerClassName}>
      <ul
        className={classNames(
          "inline-grid gap-6 grid-flow-col mb-3",
          tabHeaderClassName
        )}
      >
        {items?.map((item) => (
          <TabItem
            active={current === item.key}
            label={item.label}
            onClick={() => {
              setCurrent(item.key);
              onTabClick?.(item.key);
            }}
            key={item.key}
          />
        ))}
      </ul>
      <div className={contentClassName}>{currentContent}</div>
    </div>
  );
};
