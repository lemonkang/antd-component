import type { CSSProperties } from "react";
import type { OtpInputProps } from "react-otp-input";
import OtpInput from "react-otp-input";

export default function InputOTP({
  ...props
}: Omit<
  OtpInputProps,
  | "containerStyle"
  | "focusStyle"
  | "inputStyle"
  | "errorStyle"
  | "disabledStyle"
  | "numInputs"
  | "onChange"
> & { onChange?: (otp: string) => void }) {
  return (
    <OtpInput
      {...props}
      numInputs={6}
      containerStyle={containerStyle}
      focusStyle={focusStyle}
      inputStyle={inputStyle}
      errorStyle={errorStyle}
      disabledStyle={disabledStyle}
    />
  );
}

const disabledStyle: CSSProperties = {
  backgroundColor: "#F2F3F4",
  boxShadow: "none",
  borderColor: `#E3E4E6`,
  cursor: "not-allowed",
};
const containerStyle: CSSProperties = {
  justifyContent: "space-between",
};
const inputStyle: CSSProperties = {
  width: "44px",
  height: "44px",
  fontSize: "18px",
  fontWeight: 500,
  borderColor: `#E3E4E6`,
  backgroundColor: "#fff",
  borderStyle: "solid",
  borderWidth: "1px",
  borderRadius: "4px",
  outline: "none",
};
const focusStyle: CSSProperties = {
  borderColor: "#2962FF",
  boxShadow: "0px 0px 0px 2px rgba(41, 98, 255, 0.2)",
};
const errorStyle: CSSProperties = {
  borderColor: "#ED513F",
  boxShadow: "none",
};
