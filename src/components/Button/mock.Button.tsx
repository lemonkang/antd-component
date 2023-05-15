import type { ComponentProps } from "react";
import type Button from "@components/Button/Button";

export const ButtonDefaultProps: ComponentProps<typeof Button> = {
  size: "large",
  type: "primary",
  children: <span>yes man</span>,
};
