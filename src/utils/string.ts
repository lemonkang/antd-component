export const firstLetter = (str?: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase();
};

export function camelToSnake(camelCase: string): string {
  return camelCase.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
