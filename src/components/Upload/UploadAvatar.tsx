import type { UploadProps } from "antd";
import Icon from "./upload-icon.svg";
import { BaseUpload } from "@components/Upload/BaseUpload";
import classNames from "classnames";
import { Avatar } from "@components/Avatar/Avatar";

export const UploadAvatar = ({
  boxSize = 40,
  url,
  onUploadSuccess,
  className,
  ...props
}: {
  boxSize?: number;
  url?: string;
  onUploadSuccess?: (response: any) => void;
} & UploadProps) => {
  return (
    <BaseUpload
      {...props}
      maxCount={1}
      showUploadList={false}
      className={classNames("block", className)}
      onChange={(info) => {
        if (info.file.status === "done" && info.file.response) {
          onUploadSuccess?.(info.file.response);
        }
      }}
    >
      <div
        className="rounded-full overflow-hidden"
        style={{ width: boxSize, height: boxSize }}
      >
        {url ? (
          <Avatar remoteHref={url} size={boxSize} />
        ) : (
          <RenderImg href={Icon} />
        )}
      </div>
    </BaseUpload>
  );
};

const RenderImg = ({ href }: { href: string }) => {
  return (
    <img
      src={href}
      alt=""
      className={"w-full cursor-pointer hover:opacity-80 transition-opacity"}
    />
  );
};
