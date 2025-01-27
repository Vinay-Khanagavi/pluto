<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Search, Plus } from 'lucide-svelte';
	import { MoreVertical } from 'lucide-svelte';
	import AddGatewaySidebar from '$lib/components/common/AddGatewaySidebar.svelte';
	import { goto } from '$app/navigation';

	type Gateway = {
		location: string;
		domains: string[];
		status: 'Healthy' | 'Unhealthy' | 'Down';
	};

	let sheetOpen = $state(false);
	let searchQuery = $state('');
	let gateways: Gateway[] = $state([
		{
			location: 'Mumbai DC II',
			domains: ['ss.dev', 'samespace.com', 'origon.ai'],
			status: 'Healthy'
		},
		{
			location: 'US',
			domains: ['samespace.com', 'tlkn.com'],
			status: 'Healthy'
		},
		{
			location: 'Singapore DC',
			domains: ['samespace.com'],
			status: 'Down'
		},
		{
			location: 'France DC II',
			domains: ['ss.dev', 'origon.ai', 'tlkn.com'],
			status: 'Unhealthy'
		}
	]);

	const filteredGateways = $derived(
		gateways.filter(
			(gateway) =>
				gateway.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
				gateway.domains.some((domain) => domain.toLowerCase().includes(searchQuery.toLowerCase()))
		)
	);

	function navigateToGateway(gatewayName: string) {
		const urlName = gatewayName.toLowerCase().replace(/ /g, '-');
		goto(`/gateway/${urlName}`);
	}

	// Status Icon Components
	const StatusIcons = {
		Healthy: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47692 6.47692 2 12 2C17.5231 2 22 6.47692 22 12C22 17.5231 17.5231 22 12 22C6.47692 22 2 17.5231 2 12ZM15.7026 10.1395C15.7641 10.0575 15.8086 9.96402 15.8335 9.86456C15.8584 9.76511 15.8632 9.66168 15.8475 9.56036C15.8319 9.45904 15.7962 9.36187 15.7424 9.27456C15.6887 9.18725 15.618 9.11157 15.5346 9.05195C15.4512 8.99233 15.3567 8.94999 15.2567 8.92741C15.1567 8.90484 15.0532 8.90248 14.9523 8.92047C14.8514 8.93847 14.755 8.97646 14.669 9.03222C14.583 9.08797 14.5089 9.16036 14.4513 9.24513L11.1323 13.8913L9.46667 12.2256C9.32085 12.0898 9.12798 12.0158 8.9287 12.0193C8.72941 12.0228 8.53927 12.1036 8.39834 12.2445C8.2574 12.3854 8.17667 12.5756 8.17315 12.7748C8.16964 12.9741 8.24361 13.167 8.37949 13.3128L10.6872 15.6205C10.7661 15.6994 10.8613 15.7602 10.9661 15.7986C11.071 15.837 11.1829 15.8522 11.2941 15.843C11.4054 15.8338 11.5133 15.8006 11.6104 15.7455C11.7075 15.6904 11.7914 15.6149 11.8564 15.5241L15.7026 10.1395Z" fill="#059669"/>
    </svg>`,
		Unhealthy: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47692 6.47692 2 12 2C17.5231 2 22 6.47692 22 12C22 17.5231 17.5231 22 12 22C6.47692 22 2 17.5231 2 12ZM12 8.15385C12.204 8.15385 12.3997 8.23489 12.5439 8.37915C12.6882 8.52341 12.7692 8.71906 12.7692 8.92308V12.7692C12.7692 12.9732 12.6882 13.1689 12.5439 13.3132C12.3997 13.4574 12.204 13.5385 12 13.5385C11.796 13.5385 11.6003 13.4574 11.4561 13.3132C11.3118 13.1689 11.2308 12.9732 11.2308 12.7692V8.92308C11.2308 8.71906 11.3118 8.52341 11.4561 8.37915C11.6003 8.23489 11.796 8.15385 12 8.15385ZM12 16.6154C12.204 16.6154 12.3997 16.5343 12.5439 16.3901C12.6882 16.2458 12.7692 16.0502 12.7692 15.8462C12.7692 15.6421 12.6882 15.4465 12.5439 15.3022C12.3997 15.158 12.204 15.0769 12 15.0769C11.796 15.0769 11.6003 15.158 11.4561 15.3022C11.3118 15.4465 11.2308 15.6421 11.2308 15.8462C11.2308 16.0502 11.3118 16.2458 11.4561 16.3901C11.6003 16.5343 11.796 16.6154 12 16.6154Z" fill="#EA580C"/>
    </svg>`,
		Down: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.47692 4.47692 0 10 0C15.5231 0 20 4.47692 20 10C20 15.5231 15.5231 20 10 20C4.47692 20 0 15.5231 0 10ZM6.15385 7.49949C6.15385 6.75692 6.75692 6.15385 7.50051 6.15385H12.4995C13.2431 6.15385 13.8462 6.75692 13.8462 7.50051V12.4995C13.8462 13.2431 13.2431 13.8462 12.4995 13.8462H7.50154C7.32465 13.8463 7.14948 13.8115 6.98603 13.7439C6.82259 13.6763 6.67408 13.5771 6.549 13.452C6.42392 13.3269 6.32474 13.1784 6.25711 13.015C6.18948 12.8515 6.15474 12.6764 6.15487 12.4995V7.50154L6.15385 7.49949Z" fill="#DC2626"/>
    </svg>`
	};
</script>

<div class="opacity/8 relative bg-[#2E2E2E]">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between py-4">
			<h1 class="text-2xl font-normal text-white">Gateways</h1>
			<!-- <div class="flex items-center gap-4">
				<div class="relative">
					<Input
						type="search"
						placeholder="Search"
						class="w-[400px] border-0 bg-[#1E1E1E] pl-10 text-white placeholder:text-gray-400"
						bind:value={searchQuery}
					/>
					<Search
						class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400"
					/>
				</div>
				<Button
					size="icon"
					class="h-10 w-10 rounded-full bg-white text-black hover:bg-white/90"
					on:click={() => (sheetOpen = true)}
				>
					<Plus class="h-5 w-5" />
				</Button>
			</div> -->
			<div class="flex items-center gap-6">
				<div class="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white">
					<input type="text" class="bg-transparent outline-none" placeholder="Search" />
					<Search class="w-5 text-background/40" />
				</div>
				<Button
					size="icon"
					class="h-10 w-10 rounded-full bg-white text-black hover:bg-white/90"
					on:click={() => (sheetOpen = true)}
				>
					<Plus class="h-5 w-5" />
				</Button>
			</div>
		</div>
	</div>
</div>

<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
	<div class="rounded-lg bg-white shadow-sm">
		<table class="w-full">
			<thead>
				<tr class="border-b border-gray-200">
					<th class="text-sm px-4 py-3 text-left font-medium text-gray-500">NAME</th>
					<th class="text-sm px-4 py-3 text-left font-medium text-gray-500">DOMAINS</th>
					<th class="w-10"></th>
				</tr>
			</thead>
			<tbody>
				{#each filteredGateways as gateway}
					<tr class="border-b border-gray-100 hover:bg-gray-50">
						<td class="px-4 py-3">
							<button
								type="button"
								class="flex cursor-pointer items-center gap-2"
								onclick={() => navigateToGateway(gateway.location)}
								aria-label="Navigate to {gateway.location}"
							>
								{@html StatusIcons[gateway.status]}
								<span class="hover:text-blue-600">{gateway.location}</span>
							</button>
						</td>
						<td class="px-4 py-3">
							<div class="flex flex-wrap gap-2">
								{#each gateway.domains as domain}
									<span class="text-sm rounded bg-gray-50 px-2 py-1 text-gray-900">
										{domain}
									</span>
								{/each}
							</div>
						</td>
						<td class="px-4 py-3">
							<Button variant="ghost" size="icon" class="h-8 w-8">
								<MoreVertical class="h-4 w-4" />
							</Button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<AddGatewaySidebar bind:open={sheetOpen} />
