<script lang="ts">
    import * as Sheet from "$lib/components/ui/sheet";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    
    export let open: boolean;
  </script>
  
  <Sheet.Root bind:open>
    <Sheet.Content side="right">
      <Sheet.Header>
        <Sheet.Title>Add Services</Sheet.Title>
        <Sheet.Description>Add a new Serivce to your gateway.</Sheet.Description>
      </Sheet.Header>
  
      
  
      <div class="flex justify-between mt-8">
        <Button variant="ghost" on:click={() => open = false}>
          Back
        </Button>
        <Button>Done</Button>
      </div>
    </Sheet.Content>
  </Sheet.Root>