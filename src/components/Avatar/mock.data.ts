import type { ComponentProps } from "react";
import type { Avatar } from "@components/Avatar/Avatar";

export const AvatarProps: ComponentProps<typeof Avatar> = {
  size: 25,
  name: "Vito",
  className: "p-4",
};
