<script>
    import { createEventDispatcher } from 'svelte';
  
    export let showModal = false;
    export let title = "";
    export let content = "Default content goes here.";
  
    const dispatch = createEventDispatcher();
  
    const closeModal = () => {
      showModal = false;
      dispatch('close');
    };
  </script>
  
  {#if showModal}
    <dialog class="modal" open>
      <div class="modal-box relative">
        <form method="dialog" class="absolute right-2 top-2">
          <button class="btn btn-sm btn-circle btn-ghost" on:click={closeModal}>✕</button>
        </form>
        
        {#if title}
          <h3 class="text-lg font-bold uppercase">{title}</h3>
        {/if}
        
        <p class="py-4">{content}</p>
        
        <slot></slot> <!-- Slot for custom content -->
      </div>
    </dialog>
  {/if}
  

  <style>
    /* Custom styles for modal appearance */
    .modal {
      /* Fullscreen background with fade effect */
      background-color: rgba(0, 0, 0, 0.5);
    }
  </style>