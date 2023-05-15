import type { InputProps } from "antd";
import { Input } from "antd";
import IconFont from "@components/IconFont/IconFont";
import Style from "./InputSearch.module.scss";
import classNames from "classnames";

const searchIcon = (
  <IconFont type={"icon-search"} className={"text-lg text-gray-300"} />
);
const clearIcon = (
  <IconFont type={"icon-fail"} className={"text-lg text-gray-300"} />
);
const enterButtonNode = (
  <div className="flex items-center">
    <IconFont type={"icon-search"} className={"text-lg mr-1"} />
    <span>Search</span>
  </div>
);
const InputSearch = ({
  suffixButton,
  value,
  className,
  ...props
}: InputProps & { suffixButton?: boolean }) => {
  if (suffixButton) {
    return (
      <Input.Search
        allowClear={{ clearIcon }}
        placeholder={"Input"}
        value={value}
        enterButton={enterButtonNode}
        className={classNames(Style.inputSearch, className)}
        {...props}
      />
    );
  }
  return (
    <Input
      placeholder={"Input"}
      value={value}
      suffix={!value && searchIcon}
      allowClear={{ clearIcon }}
      className={className}
      {...props}
    />
  );
};

export default InputSearch;
