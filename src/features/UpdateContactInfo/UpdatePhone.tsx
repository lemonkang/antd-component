import { Modal } from "@components/Modal/Modal";
import { Input, Button, Form, message } from "antd";
import NiceModal, { antdModalV5, useModal } from "@ebay/nice-modal-react";
import { OTPModalSingleChannel } from "@/features/OTPVerification/OTPVerification";
import apis from "@/apis";
import { useRequest } from "ahooks";

export const UpdatePhone = NiceModal.create(() => {
  const modal = useModal();
  const [form] = Form.useForm();
  const updatePhoneApi = useRequest(apis.user.updatePhone, {
    manual: true,
    onSuccess() {
      message.success("Update phone successfully!");
      modal.resolve(form.getFieldValue("phone"));
      modal.hide();
    },
    onError(e) {
      message.error(e.message);
    },
  });
  const handleSubmit = (values: { phone: string }) => {
    NiceModal.show(OTPModalSingleChannel, {
      modalConfig: {
        title: "Update phone",
      },
      OTPVerificationProps: {
        sendTo: {
          label: `+91 ${values.phone}`,
          value: values.phone,
        },
        sendOtp: async (value) => {
          await apis.otp.sendOTP({
            value,
            channel: "sms",
            phoneAreaCode: "+91",
          });
        },
      },
    }).then((otp) => {
      updatePhoneApi.run({
        phone: values.phone,
        otp: otp as string,
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
        <Form.Item label={"New phone"} name={"phone"}>
          <Input
            prefix={<span className={"text-color-quaternary"}>+91</span>}
            maxLength={10}
          />
        </Form.Item>
        <Button
          block
          type={"primary"}
          htmlType={"submit"}
          loading={updatePhoneApi.loading}
        >
          Submit
        </Button>
      </Form>
    </Modal>
  );
});
