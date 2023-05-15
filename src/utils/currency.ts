import { localSymbols } from "@/config/localSymbols";

type FormatOptions = {
  locale?: string;
  unit?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
};

const defaultFormatOptions: Intl.NumberFormatOptions = {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  currency: localSymbols.currencyCode.india,
};
export const format = (
  v: string | number | undefined | null,
  options?: FormatOptions
) => {
  if (typeof v === "undefined" || v === null || Number.isNaN(v)) {
    return "";
  }
  if (typeof v === "string") {
    v = Number(v);
  }
  const intlFormatter = new Intl.NumberFormat(options?.locale ?? "en-IN", {
    ...defaultFormatOptions,
    style: options?.unit ? "currency" : undefined,
    ...options?.formatOptions,
  });
  return intlFormatter.format(v);
};
