import { useCountDown } from "ahooks";
import type { ReactNode } from "react";
import { Fragment, useEffect, useState } from "react";
import type { OtpInputProps as ReactOTPInputProps } from "react-otp-input";
import InputOTP from "@components/Input/InputOTP";

type OTPInputProps = Pick<ReactOTPInputProps, "value"> & {
  onChange: (otp: string) => void;
  sendTo: {
    label?: string;
    value: string;
  };
  sendOtp?: (value: string) => Promise<{ error: string } | void>;
  pause?: boolean;
  pauseReason?: ReactNode;
  externalComponent?: ReactNode;
  customTitle?: (sendTo: OTPInputProps["sendTo"]) => ReactNode;
};
type State = "init" | "pending" | "failed" | "waiting";

function BaseOTPVerification({
  value,
  onChange,
  sendTo,
  sendOtp,
  pause,
  pauseReason,
  externalComponent,
  customTitle,
}: OTPInputProps) {
  const [state, setState] = useState<State>("init");
  const [errorInfo, setErrorInfo] = useState<string>();
  const [targetDate, setTargetDate] = useState<number>();
  const [countdown] = useCountDown({
    targetDate,
    onEnd() {
      setState("waiting");
    },
  });
  const handleSendOtp = async () => {
    if (!sendOtp || state === "pending") return;
    const handleError = (errorInfo: string) => {
      setState("failed");
      setErrorInfo(errorInfo);
    };
    try {
      const res = await sendOtp(sendTo.value);
      if (res?.error) {
        handleError(res.error);
      } else {
        setState("pending");
        setTargetDate(Date.now() + 60 * 1000);
      }
    } catch (e) {
      handleError((e as Error).message);
    }
  };
  useEffect(() => {
    setState("init");
  }, [sendTo.value, pause]);
  useEffect(() => {
    if (state === "init" && !pause) {
      handleSendOtp();
    }
  }, [state, pause]);

  const defaultPrefixTextOfTitle =
    state === "init" && pause ? "OTP will be sent to" : "OTP has been sent to";
  return (
    <div className={"grid grid-flow-row gap-3"}>
      {customTitle ? (
        customTitle(sendTo)
      ) : (
        <div>
          <span className={"text-color-secondary"}>
            {defaultPrefixTextOfTitle}
          </span>{" "}
          {sendTo.label ?? sendTo.value}
        </div>
      )}
      <div className={"relative"}>
        <InputOTP
          shouldAutoFocus
          hasErrored={state === "failed"}
          value={value}
          onChange={onChange}
          isInputNum
          separator={<span style={{ width: 4, display: "inline-block" }} />}
        />
        {state === "failed" && errorInfo && (
          <Fragment>
            <div className={"absolute mt-2 left-0 right-0"}>
              <div className="text-sm text-error text-ellipsis">
                {errorInfo}
              </div>
            </div>
            <div className="h-4" />
          </Fragment>
        )}
      </div>
      <div className={"flex justify-between items-center"}>
        <div style={{ height: 20 }}>
          <SendCountdown
            countdown={countdown}
            state={state}
            pause={pause}
            pauseReason={pauseReason}
            onSendOtp={handleSendOtp}
          />
        </div>

        {externalComponent}
      </div>
    </div>
  );
}

const SendCountdown = ({
  countdown,
  state,
  onSendOtp,
  pause,
  pauseReason,
}: {
  countdown: number;
  state: State;
  onSendOtp?: () => void;
  pause?: boolean;
  pauseReason?: ReactNode;
}) => {
  if (state === "init") {
    if (!pause) return null;
    if (pauseReason) return <Fragment>{pauseReason}</Fragment>;
    return <span className={"cursor-pointer text-primary"}>Send OTP</span>;
  }
  if (state === "pending" && countdown > 0) {
    return (
      <span className={"text-color-secondary"}>
        Resend in <span>{Math.round(countdown / 1000)}</span>s
      </span>
    );
  }
  return (
    <span className="text-primary cursor-pointer" onClick={onSendOtp}>
      Resend OTP
    </span>
  );
};

export default BaseOTPVerification;
