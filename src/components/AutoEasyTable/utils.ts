export function shallowCompare(obj1: any, obj2: any, keys?: string[]): boolean {
  // Handle primitives and null/undefined values
  if (obj1 === obj2) return true;

  if (typeof obj1 !== typeof obj2 || obj1 === null || obj2 === null)
    return false;

  // Check objects
  const obj1Keys = keys
    ? keys.filter((k) => Object.prototype.hasOwnProperty.call(obj1, k))
    : Object.keys(obj1);
  const obj2Keys = keys
    ? keys.filter((k) => Object.prototype.hasOwnProperty.call(obj2, k))
    : Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) return false;

  for (const key of obj1Keys) {
    if (!obj2Keys.includes(key) || obj1[key] !== obj2[key]) return false;
  }

  return true;
}

export function deepCompare(obj1: any, obj2: any): boolean {
  // Handle primitives and null/undefined values
  if (obj1 === obj2) return true;

  if (typeof obj1 !== typeof obj2 || obj1 === null || obj2 === null)
    return false;

  // Check arrays
  if (Array.isArray(obj1)) {
    if (!Array.isArray(obj2) || obj1.length !== obj2.length) return false;

    for (let i = 0; i < obj1.length; i++) {
      if (!deepCompare(obj1[i], obj2[i])) return false;
    }

    return true;
  }

  // Check objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepCompare(obj1[key], obj2[key]))
      return false;
  }

  return true;
}
