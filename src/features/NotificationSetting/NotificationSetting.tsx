import type { SwitchProps } from "antd";
import { message, Switch } from "antd";
import { useRequest } from "ahooks";
import apis from "@/apis";
import { Notification } from "@/global-types";
import { useAtom } from "jotai";
import atoms from "@/atoms";
import { useState } from "react";
import NiceModal, { antdModalV5, useModal } from "@ebay/nice-modal-react";
import { Modal } from "@components/Modal/Modal";

const NotificationLabel = {
  [Notification.email]: "Email",
  [Notification.sms]: "SMS",
  [Notification.whatsapp]: "Whatsapp",
};
export const NotificationSetting = () => {
  const [current, setCurrent] = useState<Notification>();
  const [notification, setNotification] = useAtom(
    atoms.user.notificationSetting
  );
  const updateApi = useRequest(apis.notification.switchNotificationSetting, {
    manual: true,
  });

  const handleSwitch = (channel: Notification, isOn: boolean) => {
    setCurrent(channel);
    updateApi
      .runAsync({ channel, isOn })
      .then(() => {
        setNotification((state) => {
          state[channel] = isOn;
        });
        message.success("Done");
        setCurrent(undefined);
      })
      .catch((e) => {
        message.error(e.message);
      });
  };

  return (
    <ul className={"divide-y"}>
      {Object.values(Notification).map((channel) => {
        return (
          <li key={channel}>
            <SwitchItem
              label={NotificationLabel[channel]}
              loading={updateApi.loading && channel === current}
              checked={notification[channel]}
              onChange={(checked) => {
                handleSwitch(channel, checked);
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

const SwitchItem = ({
  label,
  ...switchProps
}: Pick<SwitchProps, "checked" | "onChange" | "loading"> & {
  label: string;
}) => {
  return (
    <div className={"flex items-center justify-between h-[56px]"}>
      <span>{label}</span>
      <Switch
        {...switchProps}
        checkedChildren={"On"}
        unCheckedChildren={"Off"}
      />
    </div>
  );
};

export const NotificationSettingModal = NiceModal.create(() => {
  const modal = useModal();
  return (
    <Modal title={"Notification setting"} {...antdModalV5(modal)} footer={null}>
      <NotificationSetting />
    </Modal>
  );
});
