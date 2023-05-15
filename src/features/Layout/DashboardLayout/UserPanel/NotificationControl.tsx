import { PanelItem } from "@/features/Layout/DashboardLayout/UserPanel/PanelItem";
import NiceModal from "@ebay/nice-modal-react";
import { NotificationSettingModal } from "@/features/NotificationSetting/NotificationSetting";

export const NotificationControl = () => {
  const handleClick = () => {
    NiceModal.show(NotificationSettingModal);
  };
  return (
    <PanelItem
      icon={"icon-setting"}
      label={"Notification setting"}
      onClick={handleClick}
    />
  );
};
