import { extensionDB } from "../db/db";
import { triggerErrorAlert } from "./alert";
import { readExtensionMetaData } from "./extension";

/**
 * Imports an extension from a file.
 *
 * @param {File} file - The file to import.
 * @returns {Promise<boolean>} A promise that resolves to true if the import is successful, otherwise false.
 */
export async function importExtension(file) {
  if (!file) {
    triggerErrorAlert("No file selected");
    return false;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      if (typeof content !== "string") {
        triggerErrorAlert("Failed to read file content");
        resolve(false);
        return;
      }

      let extension = await readExtensionMetaData(content);

      if (!extension) {
        triggerErrorAlert("Invalid extension file");
        resolve(false);
        return;
      }

      await extensionDB.addExtension({ ...extension, script: content });
      resolve(true);
    };
    reader.onerror = () => {
      triggerErrorAlert("Failed to read file");
      resolve(false);
    };
    reader.readAsText(file);
  });
}