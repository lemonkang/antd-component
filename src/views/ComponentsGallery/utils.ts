export function parseInput(input: string) {
  if (!input) {
    return undefined;
  }
  const lines = input.trim().split("\n");
  const parsed = {} as any;

  for (const line of lines) {
    const [key, value] = line.split("=");
    const [prop, type] = key.split("|");

    let parsedValue;

    switch (type) {
      case "number":
        parsedValue = Number(value);
        break;
      case "boolean":
        parsedValue = value === "true";
        break;
      case "function":
        parsedValue = (...args: any[]) => {
          console.log(`${prop}:`, ...args);
        };
        break;
      default:
        parsedValue = value;
        break;
    }

    parsed[prop] = parsedValue;
  }

  return parsed;
}

export function parseMockData(input: string) {
  return JSON.parse(input);
}

export function filterOptionOnSearch(input: string, label: string) {
  const inputSplit = input.split(" ").filter(Boolean);
  return inputSplit.every((keyword) => label.includes(keyword));
}
