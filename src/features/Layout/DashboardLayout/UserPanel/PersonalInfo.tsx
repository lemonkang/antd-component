import { Modal } from "@/components/Modal/Modal";
import type { ModalProps } from "antd";
import { Button, message, Typography } from "antd";
import { useControlModal } from "@/hooks/useControlModal";
import atoms from "@/atoms";
import { useAtom, useAtomValue } from "jotai";
import NiceModal from "@ebay/nice-modal-react";
import { UpdatePhone } from "@/features/UpdateContactInfo/UpdatePhone";
import { UpdateWhatsapp } from "@/features/UpdateContactInfo/UpdateWhatsapp";
import { UpdateEmail } from "@/features/UpdateContactInfo/UpdateEmail";
import { PanelItem } from "@/features/Layout/DashboardLayout/UserPanel/PanelItem";

export const PersonalInfo = () => {
  const modal = useControlModal();
  return (
    <>
      <PanelItem
        onClick={() => {
          modal.show();
        }}
        icon={"icon-user-no-outline"}
        label={"Personal info"}
      />
      <PersonalInfoModal {...modal} />
    </>
  );
};

const PersonalInfoModal = (props: ModalProps) => {
  const [basicInfo, setBasicInfo] = useAtom(atoms.user.basicInfo);
  const phone = useAtomValue(atoms.user.phoneWithCode);
  const items = [
    {
      label: "password",
      value: "".padEnd(8, "*"),
      operationText: "Reset",
      onOperation: () => {
        message.info(
          "Upon successful implementation of the module, gracefully redirect to the reset-password page."
        );
      },
    },
    {
      label: "Phone",
      value: phone,
      onOperation: () => {
        NiceModal.show(UpdatePhone).then((phone) => {
          setBasicInfo((prev) => {
            if (prev) {
              prev.phone = phone as string;
            }
          });
        });
      },
    },
    {
      label: "Whatsapp",
      value: basicInfo?.whatsAppNumber ?? "",
      onOperation: () => {
        NiceModal.show(UpdateWhatsapp).then((whatsapp) => {
          setBasicInfo((prev) => {
            if (prev) {
              prev.whatsAppNumber = whatsapp as string;
            }
          });
        });
      },
    },
    {
      label: "Email",
      value: basicInfo?.email ?? "",
      onOperation: () => {
        NiceModal.show(UpdateEmail).then((email) => {
          setBasicInfo((prev) => {
            if (prev) {
              prev.email = email as string;
            }
          });
        });
      },
    },
  ];
  return (
    <Modal
      title={"Personal info"}
      footer={null}
      bodyStyle={{ paddingBottom: 20 }}
      {...props}
    >
      <ul>
        {items.map((props) => (
          <ListItem {...props} key={props.label} />
        ))}
      </ul>
    </Modal>
  );
};

const ListItem = ({
  label,
  value,
  operationText,
  onOperation,
}: {
  label: string;
  value: string;
  operationText?: string;
  onOperation?: () => void;
}) => {
  return (
    <li
      className={
        "flex items-center py-3 border-0 border-b border-solid border-gray-200 last:border-b-0"
      }
    >
      <div className={"w-[82px] shrink-0"}>{label}</div>
      <div className="inline-flex items-center justify-between flex-grow">
        <span className={"text-color-tertiary flex-grow break-all"}>
          {value}
        </span>
        <Button type={"text"} className={"hover:bg-white"}>
          <Typography.Link onClick={onOperation}>
            {operationText ?? (value ? "Update" : "Add")}
          </Typography.Link>
        </Button>
      </div>
    </li>
  );
};
