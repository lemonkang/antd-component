import errorHandler from "@apis/request/error-handler";
function getHeaderContentType(
  data: FormData | string | Record<string, unknown> | undefined | null
) {
  let contentType: string;
  if (typeof data === "string") {
    contentType = "application/x-www-form-urlencoded";
  } else if (data instanceof FormData) {
    contentType = "multipart/form-data";
  } else {
    contentType = "application/json";
  }
  return contentType;
}

function typeOf(d: unknown) {
  const rawType = Object.prototype.toString.call(d);
  const match = rawType.match(/\[object\s(\w+)]/);
  if (match?.[1]) {
    return match[1].toLowerCase();
  } else {
    return "unknown";
  }
}

function camelCaseToSnakeCase(str: string) {
  return str
    .replace(/\w([A-Z])/g, function (m) {
      return m[0] + "_" + m[1];
    })
    .toLowerCase();
}

function snakeCaseToCamelCase(str: string) {
  return str.replace(/_([a-z])/g, function (m) {
    return m[1].toUpperCase();
  });
}

function dataStyleTransfer(
  data: unknown,
  dataStyle: "camel" | "snake" | "none"
): unknown {
  // return the raw data if it is not an object
  if (dataStyle === "none") {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map((item) => dataStyleTransfer(item, dataStyle));
  } else if (typeOf(data) === "object") {
    const initObj: Record<string, unknown> = {};
    return Object.entries(data as Record<string, unknown>).reduce(
      (acc, [key, value]) => {
        const newKey =
          dataStyle === "camel"
            ? snakeCaseToCamelCase(key)
            : camelCaseToSnakeCase(key);
        acc[newKey] = dataStyleTransfer(value, dataStyle);
        return acc;
      },
      initObj
    );
  }
  return data;
}

const getCustomTokenFromSearchParams = (url: string, key: string) => {
  const search = url.split("?")[1];
  if (!search) return null;
  const searchParams = new URLSearchParams(search);
  return searchParams.get(key);
};

const easyRequestUtils = {
  getHeaderContentType,
  dataStyleTransfer,
  getCustomTokenFromSearchParams,
  snakeCaseToCamelCase,
  camelCaseToSnakeCase,
  errorHandler,
};

export default easyRequestUtils;
