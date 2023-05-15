import type { InputNumberProps } from "antd";
import { InputNumber } from "antd";
import type { LocaleCode } from "@/config/localSymbols";
import utils from "@/utils";
import { localSymbols } from "@/config/localSymbols";

const currencyParser = (locale: string) => (val: any) => {
  try {
    // for when the input gets clears
    if (typeof val === "string" && !val.length) {
      return null;
    }

    // detecting and parsing between comma and dot
    const group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, "");
    const decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, "");
    let reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
    reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");
    //  => 1232.21 €

    // removing everything except the digits and dot
    reversedVal = reversedVal.replace(/[^0-9.]/g, "");
    //  => 1232.21

    // appending digits properly
    const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length;
    const needsDigitsAppended = digitsAfterDecimalCount > 2;

    if (needsDigitsAppended) {
      reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
    }

    return Number.isNaN(reversedVal) ? 0 : reversedVal;
  } catch (error) {
    console.error(error);
  }
};

export function InputMoney({
  locale = "india",
  ...props
}: Omit<InputNumberProps, "prefix" | "placeholder"> & { locale?: LocaleCode }) {
  return (
    <InputNumber
      controls={false}
      formatter={(value) => {
        if (!value && typeof value !== "number") {
          return "";
        }
        return utils.currency.format(value, {
          formatOptions: { minimumFractionDigits: undefined },
        });
      }}
      prefix={
        <span className={"pr-1"}>{localSymbols.currencySymbols[locale]}</span>
      }
      parser={currencyParser(localSymbols.intlCode[locale])}
      placeholder={"0.00"}
      {...props}
    />
  );
}
