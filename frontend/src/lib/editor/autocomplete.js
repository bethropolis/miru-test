import { syntaxTree } from "@codemirror/language";
import { template } from "./template";
import { javascriptLanguage } from "@codemirror/lang-javascript";
import { snippetCompletion } from "@codemirror/autocomplete";


// List of metadata options for autocomplete
const metadataOptions = [
    { label: "@name", type: "keyword", detail: "Extension Name" },
    { label: "@version", type: "keyword", detail: "Version (e.g., v0.0.1)" },
    { label: "@author", type: "keyword", detail: "Author name" },
    { label: "@lang", type: "keyword", detail: "Language (e.g., zh-cn)" },
    { label: "@icon", type: "keyword", detail: "Icon URL" },
    { label: "@package", type: "keyword", detail: "Package identifier" },
    { label: "@type", type: "keyword", detail: "Type (e.g., bangumi)" },
    { label: "@webSite", type: "keyword", detail: "Website URL" },
    { label: "@nsfw", type: "keyword", detail: "NSFW (true/false)" },
  ];
  
  // Custom autocomplete function targeting metadata comments
  export function completeMetadata(context) {
    const { state, pos } = context;
    const doc = state.sliceDoc(0);
  
    // Detect the start and end of the MiruExtension comment block
    const metadataStart = doc.indexOf("// ==MiruExtension==");
    const metadataEnd = doc.indexOf("// ==/MiruExtension==", metadataStart);
  
    // Check if we're within the bounds of this metadata block
    if (pos < metadataStart || pos > metadataEnd || metadataStart === -1) return null;
  
    // Get text up to cursor position
    let textBeforeCursor = state.sliceDoc(metadataStart, pos);
  
    // Find the last instance of '@' in this context to suggest tags only after it
    let tagMatch = /@\w*$/.exec(textBeforeCursor);
  
    // Return suggestions when user explicitly types `@` or starts typing tag
    if (!tagMatch && !context.explicit) return null;
  
    return {
      from: tagMatch ? pos - tagMatch[0].length : pos,
      options: metadataOptions,
      validFor: /^@\w*$/,
    };
  }

export let jsMetadataCompletions = javascriptLanguage.data.of({
    autocomplete: completeMetadata,
  });
  

export let codeCompletions = javascriptLanguage.data.of({
    autocomplete: [
      snippetCompletion(template, { label: "!", detail: "MiruExtension Template" }),
    ],
  });
