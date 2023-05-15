import Logo from "@images/logo-white.svg";
import IconFont from "@components/IconFont/IconFont";
import classNames from "classnames";

export const LogoWithToggle = ({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle?: () => void;
}) => {
  return (
    <div
      className={classNames(
        "flex  items-center px-4 pb-4 text-white",
        !collapsed ? "justify-between" : "justify-end"
      )}
    >
      <img src={Logo} alt={""} className={classNames(collapsed && "hidden")} />
      <IconFont
        type={collapsed ? "icon-zhankaicaidan1" : "icon-shouqicaidan1"}
        className={classNames("text-xl")}
        onClick={() => {
          onToggle?.();
        }}
      />
    </div>
  );
};
