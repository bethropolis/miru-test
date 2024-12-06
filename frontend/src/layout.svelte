<script>
  import Sidebar from "./components/Sidebar.svelte";
  import Alert from "./components/utils/alert.svelte";
</script>

<main class="flex h-screen">
    
  <aside class="w-16 bg-gray-800">
    <Sidebar />
  </aside>

  <slot />
</main>

<Alert />
