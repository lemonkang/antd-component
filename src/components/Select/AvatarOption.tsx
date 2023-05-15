import { Avatar } from "@components/Avatar/Avatar";


type TOptionItem = {
  title: string
  content1: string
  content2: string
}

export type LabelInValue = {
  value: string
  label: {
    props: {
      item: TOptionItem
    }
  }
}

type Props = {
  item: TOptionItem
  showAvatar?: boolean
}

export function AvatarOption({ item, showAvatar }: Props) {
  return (
    <div className={"flex"}>
      {showAvatar &&
      <Avatar name={item.title} className={"mr-2 select-avatar"} />
      }
      <div>
        <div className={"text-gray-700"}>{item.title}</div>
        <div className={"text-gray-400 flex align-center"}>
          <span>{item.content1}</span>
          <div className={"mx-1 my-auto w-1 h-1 rounded bg-gray-400"} />
          <span>{item.content2}</span>
        </div>
      </div>
    </div>
  );
}