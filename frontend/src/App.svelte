<script>
  import { activeTab, manager } from "./lib/store/store.js";
  import Editor from "./components/editor/editor.svelte";
  import ExtensionManager from "./components/extensions/extensionManager.svelte";
  import JsonHeader from "./components/json/jsonHeader.svelte";
  import JsonEditorPane from "./components/json/JsonEditorPane.svelte";
  import Layout from "./layout.svelte";
</script>

<Layout>
  <div
    class="flex-1 max-w-[calc(50%-2rem)] border-r border-gray-300 overflow-hidden"
  >
    {#if $activeTab === "code"}
      <Editor />
    {/if}
    {#if $activeTab === "extensions"}
      <ExtensionManager />
    {/if}
    {#if $activeTab === "settings"}
      <!-- Methods content here -->
    {/if}
  </div>

  <div class="flex-1 py-4 pl-4 max-w-[calc(50%-2rem)]">
    <JsonHeader />
    <JsonEditorPane />
  </div>
</Layout>
