import { Avatar } from "@components/Avatar/Avatar";

export const FullNameWithAvatar = ({ name }: { name: string }) => {
  return (
    <div className={"flex items-center"}>
      <Avatar name={name} size={24} />
      <span className={"ml-1"}>{name}</span>
    </div>
  );
};
