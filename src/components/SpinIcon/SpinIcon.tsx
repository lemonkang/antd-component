import LoadingIcon from "@images/loading-kaleidoscope.svg";
import LoadingLineIcon from "@images/loading-line.svg";
import type { CSSProperties } from "react";
import classNames from "classnames";
import Style from "./icon.module.scss";
import { useMemo } from "react";
import useBrowserInfo from "@/hooks/useBrowserInfo";

function SpinIcon({
  style,
  className,
  type,
}: {
  style?: CSSProperties;
  className?: string;
  type?: "line";
}) {
  const { browser, isMobile, version } = useBrowserInfo();
  const showRollingElement = useMemo(() => {
    const chromeCondition = browser === "chrome" && version >= 69;
    const edgCondition = browser === "edg" && version >= 79;
    const safariCondition = browser === "safari" && version > 12;
    const iosCondition = browser === "safari" && isMobile && version > 12;
    const firefoxCondition = browser === "firefox" && version > 83;
    const androidCondition = browser === "android";

    return (
      chromeCondition ||
      edgCondition ||
      safariCondition ||
      iosCondition ||
      androidCondition ||
      firefoxCondition
    );
  }, [browser, isMobile, version]);
  const icon = useMemo(() => {
    if (type === "line") {
      return LoadingLineIcon;
    }
    return LoadingIcon;
  }, [type]);
  return (
    <div
      className={classNames(
        "justify-center items-center",
        className,
        !className?.includes("flex") && "inline-flex"
      )}
      style={style}
    >
      <span className={classNames(Style.spinIcon)}>
        {showRollingElement && type === "line" ? (
          <RollingElement />
        ) : (
          <img src={icon} alt="" />
        )}
      </span>
    </div>
  );
}

const RollingElement = () => {
  return (
    <div className={classNames(Style.rollingNode, Style.rotate)}>
      <div className={Style.whiteFill} />
    </div>
  );
};

export default SpinIcon;
