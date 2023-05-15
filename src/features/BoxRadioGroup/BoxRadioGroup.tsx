import classNames from "classnames";

export const BoxRadioGroup = ({
  value,
  options,
  onChange,
}: {
  value?: string | number;
  options: Array<{ value: string; label?: string }>;
  onChange?: (v: string) => void;
}) => {
  return (
    <ul className={"p-[2px] bg-gray-bg rounded flex items-center"}>
      {options?.map((opt) => (
        <li
          onClick={() => onChange?.(opt.value)}
          className={classNames(
            "rounded px-2 py-[2px] cursor-pointer",
            opt.value === value && "text-primary bg-white",
            "hover:text-primary hover:bg-white transition-colors"
          )}
          key={opt.value}
        >
          {opt.label ?? opt.value}
        </li>
      ))}
    </ul>
  );
};
