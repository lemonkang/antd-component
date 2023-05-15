import NiceModal, { antdModalV5, useModal } from "@ebay/nice-modal-react";
import { Modal } from "antd";

enum FunctionModal {
  ResultModal = "result-modal",
}
const ResultModal = NiceModal.create(({ content }: { content?: string }) => {
  const modal = useModal();
  return <Modal {...antdModalV5(modal)}>{content}</Modal>;
});

NiceModal.register(FunctionModal.ResultModal, ResultModal);

function Demo() {
  const modal = useModal(FunctionModal.ResultModal);
  const showModal = () => {
    modal.show({ content: "hi" });
  };
  return <button onClick={showModal}>hi</button>;
}

export default Demo;
