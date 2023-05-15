export type LocaleCode = "india" | "us";
type CurrencySymbol = Record<LocaleCode, string>;
export const currencySymbols: CurrencySymbol = {
  india: "₹",
  us: "$",
};

const currencyCode: Record<LocaleCode, string> = {
  india: "INR",
  us: "USA",
};

const intlCode: Record<LocaleCode, string> = {
  india: "IN",
  us: "US",
};

export const localSymbols = {
  currencySymbols,
  currencyCode,
  intlCode,
};
