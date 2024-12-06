import { request } from "../extension/req";
import ExtensionStore from "../store/extension";
import SettingsStore from "../store/settings";
import { config } from "../store/store";
import { readExtensionMetaData } from "./extension";

/**
 * @typedef {import('../types/index').Extension} Extension
 */

let ENDPOINT_URL;

let DOWNLOAD_BASE_URL;

  config.subscribe((value) => {
    ENDPOINT_URL = value.repo + "/index.json" ;
    DOWNLOAD_BASE_URL = value.repo + "/repo/";
  });

  let setStore = new SettingsStore();


  let extStore = new ExtensionStore(setStore);

  extStore.init();

/**
 * Fetches the list of extensions from the upstream server.
 *
 * @returns {Promise<Extension[]>} A promise that resolves to an array of extensions.
 */
export async function getUpstreamExtensions() {


  try {
    const extensions = await request(ENDPOINT_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return extensions;
  } catch (error) {
    console.error("Error fetching extensions:", error);
    throw error;
  }
}



/**
 * Downloads and installs an extension.
 *
 * @param {string} filename - The name or identifier of the extension to download.
 * @returns {Promise<boolean>} - A promise that resolves to true if the extension was successfully installed.
 * @throws {Error} - Throws an error if there is an issue fetching the extension data.
 */
export async function downloadExtension(filename) {
    try {
        const script = await request(DOWNLOAD_BASE_URL + filename, {
        method: "GET",
        headers: {},
        });

        await extStore.installExtension(script);
        return true
    } catch (error) {
        console.error("Error fetching extension data:", error);
        throw error;
    }
}


/**
 * Checks if a specific extension is installed.
 *
 * @param {string} pkg - The name of the package to check.
 * @returns {Promise<boolean>} - A promise that resolves to true if the extension is installed, otherwise false.
 */
export async function isExtensionInstalled(pkg) {
    return await extStore.getExtension(pkg) !==  undefined;
}