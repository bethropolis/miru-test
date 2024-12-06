import { readExtensionMetaData } from "../utils/extension.js";
import Extension from "./extension.js";

// Attach Extension to the global object
// For browsers
if (typeof window !== "undefined") {
  Object.defineProperty(window, "Extension", {
    value: Extension,
  });
}

export class ExtensionManager {
  constructor() {
    this.extension = null;
  }
  async ExtractExtensionMetaData(jsCode) {
    let extensionData = readExtensionMetaData(jsCode);
    Object.assign(this.extension, extensionData);
  }

  async loadExtension(jsCode) {
    const blob = new Blob([jsCode], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const module = await import(url);
    this.extension = new module.default();
    await this.ExtractExtensionMetaData(jsCode);

    if (this.extension.load) {
      await this.extension.load();
    }
    URL.revokeObjectURL(url);
  }

  async latest(page) {
    if (!this.extension) throw new Error("Extension not loaded");
    return await this.extension.latest(page);
  }

  async detail(url) {
    if (!this.extension) throw new Error("Extension not loaded");
    return await this.extension.detail(url);
  }

  async search(kw, page = 1) {
    if (!this.extension) throw new Error("Extension not loaded");
    return await this.extension.search(kw, page);
  }

  async watch(url) {
    if (!this.extension) throw new Error("Extension not loaded");
    return await this.extension.watch(url);
  }
}
