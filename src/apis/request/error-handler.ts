const errorHandler = (errorData?: any) => {
  const ERROR_DEFAULT_MESSAGE = "Network error, please try again.";
  // find all the string in the obj, and push into errors
  const errors = extractMessageByPriority(errorData);
  return errors[0] || ERROR_DEFAULT_MESSAGE;
};

export default errorHandler;

function extractMessageByPriority(errorData: unknown) {
  // 越靠前的, 优先级越高
  const MESSAGE_PRIORITY = ["errorMessage", "detail", "errorCode", "data"];
  const errors: string[] = [];

  if (!errorData) return errors;

  if (typeof errorData === "string") {
    if (errorData.match(/Cannot\s(GET|POST|PUT|DELETE)/)) {
      errors.push("Request timeout!");
    } else {
      errors.push(errorData);
    }
  } else if (Array.isArray(errorData)) {
    for (const i of errorData) {
      errors.push(...extractMessageByPriority(i));
    }
  } else if (typeof errorData === "object") {
    const keys = Object.keys(errorData as Record<string, unknown>);
    keys.sort((prev, nxt) => {
      // 不属于 MESSAGE_PRIORITY 的更靠前, -1 应该是最大的, 再是 0..1..2
      return -MESSAGE_PRIORITY.findIndex((i) => prev === i) >
        -MESSAGE_PRIORITY.findIndex((i) => i === nxt)
        ? -1 // prev 在前
        : 1; // nxt 在前
    });
    for (const key of keys) {
      errors.push(
        ...extractMessageByPriority((errorData as Record<string, unknown>)[key])
      ); // 优先级高的字段信息放在前面
    }
  }
  return errors;
}
