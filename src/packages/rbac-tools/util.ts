const BRACKET_RE_S = /\['([^']+)'\]/g;
const BRACKET_RE_D = /\["([^"]+)"\]/g;

function normalizeKeyPath(path: string) {
  return !path.includes("[")
    ? path
    : path.replace(BRACKET_RE_S, ".$1").replace(BRACKET_RE_D, ".$1");
}

export function getPath(obj: any, path: string) {
  const normalizedPath = normalizeKeyPath(path);

  if (!normalizedPath.includes(".")) {
    return obj[path];
  }
  const pathList = normalizedPath.split(".");
  let d = -1;
  const l = pathList.length;
  while (++d < l && obj != null) {
    obj = obj[pathList[d]];
  }

  return obj;
}
