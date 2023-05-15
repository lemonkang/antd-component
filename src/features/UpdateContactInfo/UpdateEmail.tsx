import { Modal } from "@components/Modal/Modal";
import { Input, Button, Form, message } from "antd";
import NiceModal, { antdModalV5, useModal } from "@ebay/nice-modal-react";
import { OTPModalSingleChannel } from "@/features/OTPVerification/OTPVerification";
import apis from "@/apis";
import { useRequest } from "ahooks";

export const UpdateEmail = NiceModal.create(() => {
  const modal = useModal();
  const [form] = Form.useForm();
  const updateEmailApi = useRequest(apis.user.updateEmail, {
    manual: true,
    onSuccess() {
      message.success("Update email successfully!");
      modal.resolve(form.getFieldValue("email"));
      modal.hide();
    },
    onError(e) {
      message.error(e.message);
    },
  });
  const handleSubmit = (values: { email: string }) => {
    NiceModal.show(OTPModalSingleChannel, {
      modalConfig: {
        title: "Update email",
      },
      OTPVerificationProps: {
        sendTo: {
          value: values.email,
        },
        sendOtp: async (value) => {
          await apis.otp.sendOTP({
            value,
            channel: "email",
          });
        },
      },
    }).then((otp) => {
      updateEmailApi.run({
        email: values.email,
        otpCode: otp as string,
      });
    });
  };
  return (
    <Modal title={"Update phone"} footer={null} {...antdModalV5(modal)}>
      <Form
        layout={"vertical"}
        form={form}
        className={"pb-5"}
        onFinish={handleSubmit}
      >
        <Form.Item label={"New email"} name={"email"}>
          <Input placeholder={"email"} />
        </Form.Item>
        <Button
          block
          type={"primary"}
          htmlType={"submit"}
          loading={updateEmailApi.loading}
        >
          Submit
        </Button>
      </Form>
    </Modal>
  );
});
