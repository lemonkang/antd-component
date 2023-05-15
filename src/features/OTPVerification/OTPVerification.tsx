import NiceModal, { antdModalV5, useModal } from "@ebay/nice-modal-react";
import BaseOTPVerification from "@/features/OTPVerification/BaseOTPVerification";
import type { ComponentProps } from "react";
import { Modal } from "@components/Modal/Modal";
import type { ModalProps } from "antd";
import { Button } from "antd";
import { useState } from "react";

export const OTPVerification = () => {
  return <></>;
};

export const OTPModalSingleChannel = NiceModal.create(
  ({
    modalConfig,
    OTPVerificationProps,
  }: {
    modalConfig?: ModalProps;
    OTPVerificationProps: Omit<
      ComponentProps<typeof BaseOTPVerification>,
      "onChange" | "value"
    >;
  }) => {
    const modal = useModal();
    const [otp, setOTP] = useState("");
    return (
      <Modal
        footer={
          <Button
            block
            type={"primary"}
            disabled={otp.length < 6}
            onClick={() => {
              modal.resolve(otp);
              modal.hide();
            }}
          >
            Submit
          </Button>
        }
        {...modalConfig}
        {...antdModalV5(modal)}
      >
        <BaseOTPVerification
          value={otp}
          onChange={setOTP}
          {...OTPVerificationProps}
        />
      </Modal>
    );
  }
);
