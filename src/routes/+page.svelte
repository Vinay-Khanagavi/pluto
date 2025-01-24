<!-- src/routes/+page.svelte -->
<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { Search, Plus } from "lucide-svelte";
    import { Badge } from "$lib/components/ui/badge";
    import { MoreVertical } from "lucide-svelte";
    import { Card } from "$lib/components/ui/card";
    import AddGatewaySheet from "$lib/components/common/AddGatewaySheet.svelte";
  
    // Add type safety
    type Gateway = {
      location: string;
      domains: string[];
      status: 'Healthy' | 'Unhealthy' | 'Down';
    };
  
    let sheetOpen = false;
    let searchQuery = '';
  
    let gateways: Gateway[] = [
      {
        location: "Mumbai DC II",
        domains: ["ss.dev", "samespace.com"],
        status: "Healthy"
      },
      {
        location: "US",
        domains: ["tlkn.com"],
        status: "Unhealthy"
      },
      {
        location: "Singapore DC",
        domains: ["tribe.com"],
        status: "Down"
      },
      {
        location: "France DC II",
        domains: ["origon.ai"],
        status: "Healthy"
      }
    ];
  
    // Add search functionality
    $: filteredGateways = gateways.filter(gateway => 
      gateway.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gateway.domains.some(domain => 
        domain.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  
    const getStatusColor = (status: Gateway['status']) => {
      switch (status.toLowerCase()) {
        case 'healthy': return 'bg-emerald-500/15 text-emerald-500';
        case 'unhealthy': return 'bg-orange-500/15 text-orange-500';
        case 'down': return 'bg-red-500/15 text-red-500';
        default: return 'bg-gray-500/15 text-gray-500';
      }
    };
  
    // Handle new gateway addition
    function handleNewGateway(event: CustomEvent<Gateway>) {
      gateways.push(event.detail);
      gateways = [...gateways]; // Trigger reactivity
    }
  </script>
  
  <div class="container mx-auto py-6">
    <h1 class="text-2xl font-semibold mb-6">Gateways</h1>
    <Card class="p-6">
      <div class="flex items-center justify-between mb-6">
        <div class="relative flex-1 max-w-md">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4"></Search>
          <Input type="search" placeholder="Search" class="pl-10"></Input>
        </div>
        <Button variant="outline" class="gap-2" on:click={() => sheetOpen = true}>
          <Plus class="h-4 w-4"></Plus>
          Add
        </Button>
      </div>
  
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">LOCATION</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">DOMAINS</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">STATUS</th>
              <th class="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {#each gateways as gateway}
              <tr class="border-b border-gray-100 hover:bg-gray-50">
                <td class="py-3 px-4">{gateway.location}</td>
                <td class="py-3 px-4">
                  <div class="flex flex-col gap-1">
                    {#each gateway.domains as domain}
                      <a href="#{domain}" class="text-blue-500 hover:underline">{domain}</a>
                    {/each}
                  </div>
                </td>
                <td class="py-3 px-4">
                  <Badge variant="outline" class={getStatusColor(gateway.status)}>
                    {#if gateway.status === 'Healthy'}
                      <div class="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                    {:else if gateway.status === 'Unhealthy'}
                      <div class="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                    {:else}
                      <div class="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                    {/if}
                    {gateway.status}
                  </Badge>
                </td>
                <td class="py-3 px-4">
                  <Button variant="ghost" size="icon" class="h-8 w-8">
                    <MoreVertical class="h-4 w-4"></MoreVertical>
                  </Button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
  <AddGatewaySheet bind:open={sheetOpen} />