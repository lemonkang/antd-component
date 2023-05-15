import { Typography } from "antd";
import type { ParagraphProps } from "antd/es/typography/Paragraph";
import IconFont from "@components/IconFont/IconFont";

export default function CopyableText({ copyable, ...props }: ParagraphProps) {
  return (
    <Typography.Paragraph
      {...props}
      copyable={
        typeof copyable === "boolean"
          ? copyable
          : { icon: defaultCopyIcon, tooltips: ["Copy", "Copied"], ...copyable }
      }
    />
  );
}

const defaultCopyIcon = <IconFont type={"icon-copy"} />;
