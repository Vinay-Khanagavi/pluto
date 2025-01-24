<!-- src/lib/components/common/AddGatewaySheet.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import * as Sheet from "$lib/components/ui/sheet";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
  
    export let open = false;
    const dispatch = createEventDispatcher();
  
    function onSubmit() {
      // Handle form submission
      console.log("Form submitted");
      open = false;
    }
  </script>
  
  <Sheet.Root {open} onOpenChange={(value) => open = value}>
    <Sheet.Content>
      <Sheet.Header>
        <Sheet.Title>Add Gateway</Sheet.Title>
        <Sheet.Description>Add a new gateway to your infrastructure.</Sheet.Description>
      </Sheet.Header>
      
      <form class="space-y-6 py-6" on:submit|preventDefault={onSubmit}>
        <!-- Location Section -->
        <div class="space-y-4">
          <h3 class="text-sm font-medium">Location</h3>
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="name">Name</Label>
              <Input id="name" placeholder="Mumbai DC II"></Input>
            </div>
            <div class="grid gap-2">
              <Label for="description">Description</Label>
              <Input id="description" placeholder="Add Description"></Input>
            </div>
          </div>
        </div>
  
        <!-- Domains Section -->
        <div class="space-y-4">
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="domain">Domain</Label>
              <Input id="domain" placeholder="samespace.com"></Input>
            </div>
            <div class="grid gap-2">
              <Label for="certificate">Certificate</Label>
              <div class="grid grid-cols-2 gap-4">
                <Input id="certificate" type="file" accept=".crt,.pem"></Input>
                <Input id="privateKey" type="file" accept=".key,.pem"></Input>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Buttons -->
        <div class="flex justify-end space-x-4 pt-6">
          <Button variant="outline" type="button" on:click={() => open = false}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Sheet.Content>
  </Sheet.Root>