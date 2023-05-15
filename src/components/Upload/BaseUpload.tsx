import type { UploadProps } from "antd";
import { Upload } from "antd";
import customUploadRequest from "@components/Upload/customRequest";
import utils from "@/utils";
import { useState } from "react";

export const BaseUpload = ({
  customRequest,
  onChange,
  disabled,
  ...props
}: UploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const defaultUploadProps: UploadProps = {
    disabled: disabled ?? isUploading,
    customRequest: customRequest ?? customUploadRequest,
    beforeUpload: (file) => {
      if (utils.file.isFileTooLarge(file, 20)) {
        return Upload.LIST_IGNORE;
      }
      return Boolean(props?.action);
    },
    onChange: (args) => {
      if (args.file.status === "uploading") {
        setIsUploading(true);
      } else {
        setIsUploading(false);
      }
      onChange?.(args);
    },
  };

  return <Upload {...defaultUploadProps} {...props} />;
};
