import { useAtomValue, useSetAtom, useAtom } from "jotai/index";
import atoms from "@/atoms";
import { UploadAvatar } from "@components/Upload/UploadAvatar";

const UserFullName = () => {
  const basicInfo = useAtomValue(atoms.user.basicInfo);
  if (!basicInfo) {
    return null;
  }
  return (
    <div>
      <div className={"font-bold-inter"}>{basicInfo.fullName}</div>
      {basicInfo.email && (
        <div className={"text-color-tertiary"}>{basicInfo.email}</div>
      )}
    </div>
  );
};
export const AvatarMenuItem = () => {
  const [basicInfo, setBasicInfo] = useAtom(atoms.user.basicInfo);
  return (
    <div className={"flex items-center"}>
      <UploadAvatar
        boxSize={40}
        name={"clientPhoto"}
        action={"/users/upload-photo"}
        accept={".jpg,.jpeg,.png"}
        className={"mr-2"}
        url={basicInfo?.clientPhoto}
        onUploadSuccess={(res) => {
          setBasicInfo((prev) => {
            if (prev) {
              prev.clientPhoto = res.clientPhoto;
            }
          });
        }}
      />
      <UserFullName />
    </div>
  );
};
