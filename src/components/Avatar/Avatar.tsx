import classNames from "classnames";
import utils from "@/utils";
import { useMemo } from "react";

const DefaultColorSet = [
  ["#EAEFE6", "#060A23"],
  ["#EEEDFD", "#4409B9"],
  ["#ECFAFE", "#1F84A3"],
  ["#FFEBEE", "#BD0F2C"],
  ["#FDEFE2", "#C56511"],
  ["#D8E8F3", "#060A23"],
  ["#F2FFD1", "#526E0C"],
];
export const Avatar = ({
  size = 24,
  className,
  name,
  remoteHref,
}: {
  size?: number;
  className?: string;
  name?: string;
  remoteHref?: string;
}) => {
  const randomStyle = useMemo(() => {
    const color =
      DefaultColorSet[utils.random.arrayIndex(DefaultColorSet.length)];
    return {
      backgroundColor: color[0],
      color: color[1],
    };
  }, [name]);
  return (
    <div
      className={classNames(
        "rounded-full flex items-center justify-center relative overflow-hidden text-lg",
        className
      )}
      style={{ width: size, height: size, ...randomStyle }}
    >
      {utils.string.firstLetter(name)}
      {remoteHref && (
        <div
          className={
            "absolute inset-0 w-full bg-no-repeat bg-cover bg-origin-content bg-center"
          }
          style={{
            backgroundImage: `url(${remoteHref})`,
          }}
        />
      )}
    </div>
  );
};
