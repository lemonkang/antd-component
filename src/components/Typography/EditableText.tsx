import { Typography } from "antd";
import type { ParagraphProps } from "antd/es/typography/Paragraph";

function EditableText({
  value,
  onChange,
  children,
  ...props
}: Omit<ParagraphProps, "editable"> & {
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <Typography.Paragraph
      editable={{
        text: value,
        onChange,
      }}
      {...props}
    >
      {value ?? children}
    </Typography.Paragraph>
  );
}

export default EditableText;
