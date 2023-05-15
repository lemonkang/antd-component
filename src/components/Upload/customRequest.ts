import type { UploadProps } from "antd";
import request from "@apis/request/request";
import type { AxiosError } from "axios";

type UploadRequest = Required<UploadProps>["customRequest"];
const customUploadRequest: UploadRequest = async ({
  file,
  filename = "file",
  action,
  data,
  headers,
  onProgress,
  onSuccess,
  onError,
  method,
}) => {
  const formData = new FormData();
  try {
    formData.append(filename, file);
    if (data) {
      for (const key in data) {
        const value = data[key];
        if (typeof value === "string") {
          formData.append(key, value);
        }
      }
    }
    const res = await request[method.toLowerCase() as "post"](
      action,
      formData,
      {
        headers: {
          ...headers,
        },
        onUploadProgress: ({ total, loaded }) => {
          total &&
            onProgress?.({
              percent: Number(Math.round((loaded / total) * 100).toFixed(2)),
            });
        },
      }
    );
    onSuccess?.(res);
  } catch (e) {
    onError?.(e as AxiosError);
  }
};

export default customUploadRequest;
