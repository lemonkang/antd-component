import type { ReactNode } from "react";
import classNames from "classnames";
import utils from "@/utils";
export enum TagColor {
  blue,
  green,
  red,
  yellow,
  lightBlue,
  purple,
  gray,
}
const colorConfig: Record<TagColor, Record<"primary" | "light", string>> = {
  [TagColor.blue]: {
    primary: "#2962FF",
    light: "#EAEFFF",
  },
  [TagColor.green]: {
    primary: "#29B35A",
    light: "#D4F0DE",
  },
  [TagColor.red]: {
    primary: "#ED513F",
    light: "#FFD9D6",
  },
  [TagColor.yellow]: {
    primary: "#FFB638",
    light: "#FFF0D7",
  },
  [TagColor.lightBlue]: {
    primary: "#459EF8",
    light: "#DAECFE",
  },
  [TagColor.purple]: {
    primary: "#A059E7",
    light: "#F6EEFD",
  },
  [TagColor.gray]: {
    primary: "#979A9E",
    light: "#F0F1F3",
  },
};
type TagProps = {
  text?: string;
  icon?: ReactNode;
  type?: "outline" | "text" | "primary";
  color?: TagColor;
  size?: "lg" | "sm";
  capitalize?: boolean;
  className?: string;
};
const spaceSize = {
  lg: "px-2 py-1",
  sm: "px-2 py-px",
};

function CustomIcon(props: {
  type: "outline" | "text" | "primary";
  color: TagColor;
  icon: ReactNode;
}) {
  return (
    <span
      style={{ color: iconColor(props.type, props.color) }}
      className={"mr-1"}
    >
      {props.icon}
    </span>
  );
}

export const Tag = ({
  text,
  className,
  color = TagColor.blue,
  size = "sm",
  icon,
  type = "primary",
  capitalize = true,
}: TagProps) => {
  return (
    <span
      className={classNames(
        "inline-block rounded-sm text-sm",
        type === "outline" && "border",
        spaceSize[size],
        className
      )}
      style={{
        backgroundColor: bgColor(type, color),
        borderColor: borderColor(type, color),
      }}
    >
      {icon ? (
        <CustomIcon type={type} color={color} icon={icon} />
      ) : (
        type === "text" && <DefaultTextIcon bg={iconColor("primary", color)} />
      )}
      <span style={{ color: textColor(type, color) }}>
        {capitalize ? utils.string.capitalizeFirstLetter(text ?? "") : text}
      </span>
    </span>
  );
};
type SpecificColor = (
  type: Required<TagProps>["type"],
  color: Required<TagProps>["color"]
) => string;

const textColor: SpecificColor = (type, color) => {
  if (type === "text") {
    return "#66696D";
  }
  return colorConfig[color].primary;
};

const iconColor: SpecificColor = (type, color) => {
  if (type === "text") {
    if (color === TagColor.gray) {
      return "#B5B7BA";
    }
  }
  return colorConfig[color].primary;
};

const bgColor: SpecificColor = (type, color) => {
  if (type === "primary") {
    return colorConfig[color].light;
  }
  return "transparent";
};

const borderColor: SpecificColor = (type, color) => {
  if (type === "outline") {
    return colorConfig[color].light;
  }
  return "transparent";
};

const DefaultTextIcon = ({ bg }: { bg: string }) => (
  <span
    className={"w-2 h-2 rounded-full inline-block mr-1"}
    style={{ backgroundColor: bg }}
  />
);
