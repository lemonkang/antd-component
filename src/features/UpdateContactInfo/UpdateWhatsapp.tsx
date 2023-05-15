import { Modal } from "@components/Modal/Modal";
import { Input, Button, Form, message } from "antd";
import NiceModal, { antdModalV5, useModal } from "@ebay/nice-modal-react";
import { OTPModalSingleChannel } from "@/features/OTPVerification/OTPVerification";
import apis from "@/apis";
import { useRequest } from "ahooks";

export const UpdateWhatsapp = NiceModal.create(() => {
  const modal = useModal();
  const [form] = Form.useForm();
  const updateWhatsappApi = useRequest(apis.user.updateWhatsapp, {
    manual: true,
    onSuccess() {
      message.success("Update whatsapp successfully!");
      modal.resolve(form.getFieldValue("whatsapp"));
      modal.hide();
    },
    onError(e) {
      message.error(e.message);
    },
  });
  const handleSubmit = (values: { whatsapp: string }) => {
    NiceModal.show(OTPModalSingleChannel, {
      modalConfig: {
        title: "Update whatsapp",
      },
      OTPVerificationProps: {
        sendTo: {
          label: `+91 ${values.whatsapp}`,
          value: values.whatsapp,
        },
        sendOtp: async (value) => {
          await apis.otp.sendOTP({
            value,
            channel: "whatsapp",
          });
        },
      },
    }).then((otp) => {
      updateWhatsappApi.run({
        otp: otp as string,
        newWhatsapp: values.whatsapp,
      });
    });
  };
  return (
    <Modal title={"Update whatsapp"} footer={null} {...antdModalV5(modal)}>
      <Form
        layout={"vertical"}
        form={form}
        className={"pb-5"}
        onFinish={handleSubmit}
      >
        <Form.Item label={"New whatsapp number"} name={"whatsapp"}>
          <Input
            prefix={<span className={"text-color-quaternary"}>+91</span>}
            maxLength={10}
          />
        </Form.Item>
        <Button
          block
          type={"primary"}
          htmlType={"submit"}
          loading={updateWhatsappApi.loading}
        >
          Submit
        </Button>
      </Form>
    </Modal>
  );
});
