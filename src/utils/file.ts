export function getFilenameFromUrl(url: string): string {
  const parts = url.split("/");
  return parts[parts.length - 1];
}

export function isFileTooLarge(file: File, max: number) {
  const maxSize = max * 1024 * 1024;
  return file.size > maxSize;
}
