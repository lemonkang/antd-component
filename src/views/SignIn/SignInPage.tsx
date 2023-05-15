import { Button, Form, Input, Space } from "antd";
import InputOTP from "@components/Input/InputOTP";
import { useState } from "react";
import { useRequest } from "ahooks";
import { useAtom } from "jotai";
import atoms from "@/atoms";
import apis from "@/apis";
import utils from "@/utils";
import { useAuthenticate } from "@/hooks/useAuthenticate";

export function SignInPage() {
  const [otpDisable, setOtpDisable] = useState(true);
  const { sendOTP, sendOTPLoading } = useSendOTP(() => {
    setOtpDisable(false);
  });
  const [form] = Form.useForm();
  const email = Form.useWatch("email", form);
  const login = useLogin();
  const [isLogin] = useAtom(atoms.user.isLogin);
  return (
    <div className={"py-10 flex justify-center flex-col items-center"}>
      <div>isLogin: {isLogin.toString()}</div>

      <Form
        form={form}
        layout={"vertical"}
        className={"w-[325px]"}
        onFinish={(values) => {
          login.submitLogin({ email: values.email, otp: values.otp });
        }}
      >
        <Form.Item label={"Email"}>
          <Space>
            <Form.Item name={"email"} noStyle>
              <Input />
            </Form.Item>
            <Button
              loading={sendOTPLoading}
              onClick={() => {
                sendOTP(email);
              }}
            >
              Send OTP
            </Button>
          </Space>
        </Form.Item>
        <Form.Item name={"otp"} label={"OTP"}>
          <InputOTP isDisabled={otpDisable} />
        </Form.Item>
        <Button type={"primary"} htmlType={"submit"} loading={login.loading}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

const useSendOTP = (onSuccess?: () => void) => {
  const { run, loading } = useRequest(
    async (email: string) => await apis.auth.sendOTP(email),
    {
      manual: true,
      onSuccess,
    }
  );
  return {
    sendOTP: run,
    sendOTPLoading: loading,
  };
};

const useLogin = () => {
  const [, setIsLogin] = useAtom(atoms.user.isLogin);
  const authenticate = useAuthenticate();
  const { run, loading } = useRequest(
    async (data: { email: string; otp: string }) => {
      return await apis.auth.login({ value: data.email, otp: data.otp });
    },
    {
      manual: true,
      async onSuccess(data) {
        utils.jwtToken.set(data.token);
        await authenticate();
        setIsLogin(true);
      },
    }
  );
  return {
    submitLogin: run,
    loading,
  };
};
