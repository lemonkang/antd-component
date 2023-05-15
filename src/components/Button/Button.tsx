import type { ButtonProps } from "antd";
import { Button as AntButton } from "antd";
import classNames from "classnames";

function Button({ className, size, ...props }: ButtonProps) {
  const contentPadding = size === "small" ? "px-3" : "px-7";
  return (
    <AntButton
      size={size}
      className={classNames(contentPadding, className)}
      {...props}
    />
  );
}
export default Button;
