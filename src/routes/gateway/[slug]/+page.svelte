<!-- src/routes/gateway/[slug]/+page.svelte -->
<script lang="ts">
    import { page } from '$app/stores';
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { Search, Plus } from "lucide-svelte";
    
    type Service = {
      name: string;
      type: 'Global' | 'Local';
      hits: string;
      latency: string;
      status: 'Healthy' | 'Unhealthy' | 'Down';
    };
  
    let searchQuery = $state('');
    let services: Service[] = $state([
      {
        name: "LLM-Generic-70B",
        type: "Global",
        hits: "1.3k",
        latency: "10ms",
        status: "Healthy"
      },
      {
        name: "TTS English",
        type: "Global",
        hits: "4564",
        latency: "10ms",
        status: "Down"
      },
      {
        name: "TTS Spanish",
        type: "Local",
        hits: "2.6k",
        latency: "240ms",
        status: "Healthy"
      }
    ]);

    // Status Icon Components
    const StatusIcons = {
      Healthy: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47692 6.47692 2 12 2C17.5231 2 22 6.47692 22 12C22 17.5231 17.5231 22 12 22C6.47692 22 2 17.5231 2 12ZM15.7026 10.1395C15.7641 10.0575 15.8086 9.96402 15.8335 9.86456C15.8584 9.76511 15.8632 9.66168 15.8475 9.56036C15.8319 9.45904 15.7962 9.36187 15.7424 9.27456C15.6887 9.18725 15.618 9.11157 15.5346 9.05195C15.4512 8.99233 15.3567 8.94999 15.2567 8.92741C15.1567 8.90484 15.0532 8.90248 14.9523 8.92047C14.8514 8.93847 14.755 8.97646 14.669 9.03222C14.583 9.08797 14.5089 9.16036 14.4513 9.24513L11.1323 13.8913L9.46667 12.2256C9.32085 12.0898 9.12798 12.0158 8.9287 12.0193C8.72941 12.0228 8.53927 12.1036 8.39834 12.2445C8.2574 12.3854 8.17667 12.5756 8.17315 12.7748C8.16964 12.9741 8.24361 13.167 8.37949 13.3128L10.6872 15.6205C10.7661 15.6994 10.8613 15.7602 10.9661 15.7986C11.071 15.837 11.1829 15.8522 11.2941 15.843C11.4054 15.8338 11.5133 15.8006 11.6104 15.7455C11.7075 15.6904 11.7914 15.6149 11.8564 15.5241L15.7026 10.1395Z" fill="#059669"/>
      </svg>`,
      Unhealthy: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47692 6.47692 2 12 2C17.5231 2 22 6.47692 22 12C22 17.5231 17.5231 22 12 22C6.47692 22 2 17.5231 2 12ZM12 8.15385C12.204 8.15385 12.3997 8.23489 12.5439 8.37915C12.6882 8.52341 12.7692 8.71906 12.7692 8.92308V12.7692C12.7692 12.9732 12.6882 13.1689 12.5439 13.3132C12.3997 13.4574 12.204 13.5385 12 13.5385C11.796 13.5385 11.6003 13.4574 11.4561 13.3132C11.3118 13.1689 11.2308 12.9732 11.2308 12.7692V8.92308C11.2308 8.71906 11.3118 8.52341 11.4561 8.37915C11.6003 8.23489 11.796 8.15385 12 8.15385Z" fill="#EA580C"/>
      </svg>`,
      Down: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.47692 4.47692 0 10 0C15.5231 0 20 4.47692 20 10C20 15.5231 15.5231 20 10 20C4.47692 20 0 15.5231 0 10ZM6.15385 7.49949C6.15385 6.75692 6.75692 6.15385 7.50051 6.15385H12.4995C13.2431 6.15385 13.8462 6.75692 13.8462 7.50051V12.4995C13.8462 13.2431 13.2431 13.8462 12.4995 13.8462H7.50154C7.32465 13.8463 7.14948 13.8115 6.98603 13.7439C6.82259 13.6763 6.67408 13.5771 6.549 13.452C6.42392 13.3269 6.32474 13.1784 6.25711 13.015C6.18948 12.8515 6.15474 12.6764 6.15487 12.4995V7.50154L6.15385 7.49949Z" fill="#DC2626"/>
      </svg>`
    };
  
    const filteredServices = $derived(
      services.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
</script>

<div class="bg-[#2E2E2E] relative">
  <div class="absolute bottom-0 left-0 right-0 h-px bg-white/10"></div>
  <div class="max-w-7xl mx-auto px-6">
    <!-- Gateway name and tabs -->
    <div class="space-y-4 py-4">
      <h1 class="text-2xl text-white font-normal">{$page.params.slug.split('-').join(' ')}</h1>
      <div class="flex gap-8">
        <a 
          href="#services" 
          class="text-white border-b-2 border-white px-1 py-2 text-sm font-medium"
        >
          Services
        </a>
        <a 
          href="#domains" 
          class="text-gray-400 hover:text-gray-300 px-1 py-2 text-sm font-medium"
        >
          Domains
        </a>
      </div>
    </div>
  </div>
</div>

<div class="max-w-7xl mx-auto px-6 py-6">
  <div class="flex items-center justify-between mb-6">
    <div class="relative">
      <Search 
        class="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" 
      />
      <Input
        type="search"
        placeholder="Search"
        class="w-[320px] pl-10"
        bind:value={searchQuery}
      />
    </div>
    <Button
      variant="outline"
      size="icon"
      class="rounded-full w-10 h-10"
    >
      <Plus class="h-5 w-5" />
    </Button>
  </div>

  <div class="bg-white rounded-lg shadow-sm">
    <table class="w-full">
      <thead>
        <tr class="border-b border-gray-200">
          <th class="text-left py-3 px-4 text-xs font-medium text-gray-500">SERVICE</th>
          <th class="text-left py-3 px-4 text-xs font-medium text-gray-500">TYPE</th>
          <th class="text-left py-3 px-4 text-xs font-medium text-gray-500">HITS</th>
          <th class="text-left py-3 px-4 text-xs font-medium text-gray-500">LATENCY</th>
          <th class="w-10"></th>
        </tr>
      </thead>
      <tbody>
        {#each filteredServices as service}
          <tr class="border-b border-gray-100">
            <td class="py-3 px-4">
              <div class="flex items-center gap-2">
                {@html StatusIcons[service.status]}
                <span>{service.name}</span>
              </div>
            </td>
            <td class="py-3 px-4">{service.type}</td>
            <td class="py-3 px-4">{service.hits}</td>
            <td class="py-3 px-4" class:text-red-500={parseInt(service.latency) > 100}>
              {service.latency}
            </td>
            <td class="py-3 px-4">
              <Button variant="ghost" size="icon" class="h-8 w-8">
                <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="2" r="1.5" fill="currentColor"/>
                  <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                  <circle cx="8" cy="14" r="1.5" fill="currentColor"/>
                </svg>
              </Button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>