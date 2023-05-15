import type { DatePickerProps } from "antd";
import { DatePicker as AntDatePicker } from "antd";
import IconFont from "@components/IconFont/IconFont";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";

type ValueProps = {
  value?: null | string;
  onChange?: (v: ValueProps["value"]) => void;
};
const defaultCalendarIcon = (
  <IconFont type={"icon-calendar"} className={"text-lg"} />
);
const DefaultDateFormat = "YYYY-MM-DD";
export const DatePicker = ({
  value,
  onChange,
  ...props
}: Omit<DatePickerProps, "value" | "onChange"> & ValueProps) => {
  return (
    <AntDatePicker
      suffixIcon={defaultCalendarIcon}
      {...props}
      value={value ? dayjs(value) : null}
      onChange={(dayjsDate) => {
        if (dayjsDate) {
          onChange?.(dayjsDate.format(DefaultDateFormat));
        } else {
          onChange?.(dayjsDate);
        }
      }}
    />
  );
};

export const RangePicker = ({
  value,
  onChange,
  ...props
}: Omit<RangePickerProps, "value" | "onChange"> & {
  value?: [string, string] | null;
  onChange?: (values: [string, string] | null) => void;
}) => {
  return (
    <AntDatePicker.RangePicker
      suffixIcon={defaultCalendarIcon}
      {...props}
      value={value ? [dayjs(value[0]), dayjs(value[1])] : null}
      onChange={(values) => {
        if (values?.[0] && values[1]) {
          onChange?.([
            values[0].format(DefaultDateFormat),
            values[1].format(DefaultDateFormat),
          ]);
        } else {
          onChange?.(null);
        }
      }}
    />
  );
};
