import type { ModalProps } from "antd";
import { Typography, Modal as AntModal } from "antd";
import IconFont from "@components/IconFont/IconFont";
import type { ReactNode } from "react";

export const Modal = ({ closeIcon, title, onCancel, ...props }: ModalProps) => {
  return (
    <AntModal
      width={328}
      {...props}
      onCancel={onCancel}
      title={
        <TitleWrapper
          title={title}
          closeIcon={closeIcon}
          onClose={onCancel as any}
        />
      }
      closable={false}
    />
  );
};

const DefaultCloseIcon = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className={
      "flex items-center justify-center w-[24px] h-[24px] border-none bg-white cursor-pointer transition-opacity hover:opacity-70"
    }
  >
    {<IconFont type={"icon-close"} className={"text-lg"} />}
  </button>
);

const TitleWrapper = ({
  title,
  closeIcon,
  onClose,
}: {
  title?: ReactNode;
  closeIcon?: ReactNode;
  onClose?: () => void;
}) => {
  if (!title && !closeIcon) return null;
  return (
    <div className="flex items-center justify-between">
      {typeof title === "string" ? (
        <Typography.Title level={4} className={"mb-0"}>
          {title}
        </Typography.Title>
      ) : (
        title
      )}
      {closeIcon ?? <DefaultCloseIcon onClick={onClose} />}
    </div>
  );
};
