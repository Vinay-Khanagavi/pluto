<!-- src/lib/components/common/AddGatewaySheet.svelte -->
<script lang="ts">
  import * as Sheet from "$lib/components/ui/sheet";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Plus, Upload } from 'lucide-svelte';
  import { Textarea } from "$lib/components/ui/textarea";

  export let open = false;

  function onSubmit() {
    console.log("Form submitted");
    open = false;
  }
</script>

<Sheet.Root {open} onOpenChange={(value) => open = value}>
  <Sheet.Content>
    <div class="flex flex-col h-full">
      <!-- Header with Gateway Icon -->
      <div class="flex items-center gap-2 mb-8 pb-4 border-b border-gray-100 shrink-0">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          class="text-gray-900"
        >
          <path 
            d="M7.90011 12L3.59258 14.1012C2.84381 14.4665 2.84381 15.5335 3.59258 15.8988L11.5617 19.7861C11.8384 19.9211 12.1618 19.9211 12.4385 19.7861L20.4076 15.8988C21.1564 15.5335 21.1564 14.4665 20.4076 14.1012L16.1001 12M7.90011 12L3.59258 9.89878C2.84381 9.53352 2.84382 8.46649 3.59259 8.10124L11.5617 4.21387C11.8384 4.0789 12.1618 4.0789 12.4385 4.21387L20.4076 8.10124C21.1564 8.46649 21.1564 9.53352 20.4076 9.89878L16.1001 12M7.90011 12L11.5617 13.7861C11.8384 13.9211 12.1618 13.9211 12.4385 13.7861L16.1001 12" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="square" 
            stroke-linejoin="round"
          />
        </svg>
        <h2 class="text-xl font-semibold">Add Gateway</h2>
      </div>
      
      <!-- Scrollable Content -->
      <div class="overflow-y-auto scrollbar-hide flex-1 -mr-6 pr-6">
        <form class="space-y-8" on:submit|preventDefault={onSubmit}>
          <!-- Name Section -->
          <div class="space-y-2 pb-6 border-b border-gray-100">
            <Label for="name" class="text-sm text-gray-500">Name</Label>
            <Input id="name" placeholder="US DC III" />
          </div>

          <!-- Addresses Section -->
          <div class="space-y-6 pb-6 border-b border-gray-100">
            <h3 class="text-sm text-gray-500">Addresses</h3>
            
            <!-- Peer Address -->
            <div class="space-y-2">
              <Label class="text-sm text-gray-600">Peer Address (mTLS)</Label>
              <div class="flex gap-2">
                <div class="bg-gray-50 rounded-lg px-4 py-2 text-sm flex-grow">:6193</div>
                <Button variant="outline" size="icon" class="shrink-0">
                  <Plus class="h-4 w-4" />
                </Button>
              </div>
            </div>

            <!-- Peer TLS Config -->
            <div class="space-y-4">
              <Label class="text-sm text-gray-600">Peer TLS Config</Label>
              
              <div class="space-y-2">
                <Label class="text-sm text-gray-500">Certificate</Label>
                <Textarea
                  rows={4}
                  placeholder="-----BEGIN CERTIFICATE-----"
                  class="font-mono text-sm bg-gray-50"
                />
              </div>

              <div class="space-y-2">
                <Label class="text-sm text-gray-500">Private Key</Label>
                <Textarea
                  rows={4}
                  placeholder="-----BEGIN EC PRIVATE KEY-----"
                  class="font-mono text-sm bg-gray-50"
                />
              </div>

              <div class="space-y-2">
                <Label class="text-sm text-gray-500">CA Certificate</Label>
                <Textarea
                  rows={4}
                  placeholder="-----BEGIN CERTIFICATE-----"
                  class="font-mono text-sm bg-gray-50"
                />
              </div>
            </div>
          </div>

          <!-- Plugin Section -->
          <div class="space-y-2 pb-6">
            <Label class="text-sm text-gray-500">Plugin</Label>
            <Button variant="outline" class="w-full h-24 border-dashed border-gray-300">
              <div class="flex flex-col items-center gap-2 text-gray-500">
                <Upload class="h-6 w-6" />
                <span>Upload Wasm File</span>
              </div>
            </Button>
          </div>
        </form>
      </div>

      <!-- Footer -->
      <div class="flex justify-between pt-6 mt-8 border-t border-gray-200 shrink-0">
        <Button variant="ghost" type="button" on:click={() => open = false}>
          Back
        </Button>
        <Button type="submit" variant="default">Done</Button>
      </div>
    </div>
  </Sheet.Content>
</Sheet.Root>

<style>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

:global(.font-mono) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
</style>