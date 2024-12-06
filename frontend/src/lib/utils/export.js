

/**
 * Downloads a JavaScript file with the given code and file name.
 *
 * @param {string} code - The JavaScript code to be included in the file.
 * @param {string} fileName - The name of the file to be downloaded.
 */
export function exportExtension(fileName, code) {
  const blob = new Blob([code], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
