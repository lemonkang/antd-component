import type { BasicInfo } from "@apis/user";
import { Avatar } from "@components/Avatar/Avatar";
import { useAtomValue } from "jotai";
import atoms from "@/atoms";
import type { MenuProps } from "antd";
import { AvatarMenuItem } from "@/features/Layout/DashboardLayout/UserPanel/AvatarMenuItem";
import { Dropdown } from "antd";
import { PersonalInfo } from "@/features/Layout/DashboardLayout/UserPanel/PersonalInfo";
import { NotificationControl } from "@/features/Layout/DashboardLayout/UserPanel/NotificationControl";

const items: MenuProps["items"] = [
  {
    key: "avatar",
    label: <AvatarMenuItem />,
  },
  {
    key: "personal-info",
    label: <PersonalInfo />,
  },
  {
    key: "notification",
    label: <NotificationControl />,
  },
];

export const UserPanel = () => {
  const basicInfo = useAtomValue(atoms.user.basicInfo);
  if (!basicInfo) {
    return null;
  }
  return (
    <Dropdown menu={{ items }}>
      <div className={"cursor-pointer flex items-center"}>
        <DisplayableInfo
          clientPhoto={basicInfo.clientPhoto}
          firstName={basicInfo.firstName}
        />
      </div>
    </Dropdown>
  );
};

const DisplayableInfo = ({
  clientPhoto,
  firstName,
}: Pick<BasicInfo, "clientPhoto" | "firstName">) => {
  return (
    <div className={"inline-flex items-center"}>
      <Avatar name={firstName} remoteHref={clientPhoto} />
      <span>{firstName}</span>
    </div>
  );
};
