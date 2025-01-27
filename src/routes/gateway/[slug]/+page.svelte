<script lang="ts">
	import { page } from '$app/stores';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Search, Plus, Globe, MoreVertical } from 'lucide-svelte';
	import type { Service, Domain } from '$lib/types/gateway';
	import StatusIcons from '$lib/components/common/StatusIcons.svelte';
	import AddDomainSidebar from '$lib/components/common/AddDomainSidebar.svelte';
	import AddServiceSidebar from '$lib/components/common/AddServiceSidebar.svelte';

	const tabs = [
		{
			name: 'Services',
			key: 'services',
			active: true
		},
		{
			name: 'Domains',
			key: 'domains',
			active: false
		}
	];

	let activeTab = $state(tabs[0].key);
	let searchQuery = $state('');
	let serviceSidebarOpen = $state(false);
	let domainSidebarOpen = $state(false);

	let services: Service[] = $state([
		{
			name: 'LLM-Generic-70B',
			type: 'Global',
			hits: '1.3k',
			latency: '10ms',
			status: 'Healthy'
		},
		{
			name: 'TTS English',
			type: 'Global',
			hits: '4564',
			latency: '10ms',
			status: 'Down'
		},
		{
			name: 'TTS Spanish',
			type: 'Local',
			hits: '2.6k',
			latency: '240ms',
			status: 'Healthy'
		}
	]);

	let domains: Domain[] = $state([
		{
			host: 'samespace.com',
			hits: '9.5k',
			expiresOn: 'Nov 20, 2024',
			certificate: 'View'
		},
		{
			host: 'ss.dev',
			hits: '5.5k',
			expiresOn: 'Aug 12, 2024',
			certificate: 'View'
		},
		{
			host: 'origon.dev',
			hits: '564',
			expiresOn: 'In 2 days',
			certificate: 'View'
		}
	]);

	const filteredServices = $derived(
		services.filter((service) => service.name.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	const filteredDomains = $derived(
		domains.filter((domain) => domain.host.toLowerCase().includes(searchQuery.toLowerCase()))
	);
</script>

<div class="relative bg-[#2E2E2E]">
	<div class="absolute bottom-0 left-0 right-0 h-px bg-white/10"></div>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h1 class="text-2xl py-4 font-normal uppercase text-white">
			{$page.params.slug.split('-').join(' ')}
		</h1>

		<div class="flex">
			{#each tabs as tab}
				<button
					class="relative px-4 py-4 text-[16px] transition-colors duration-200 {activeTab ===
					tab.key
						? 'text-white'
						: 'text-white/50'}"
					onclick={() => (activeTab = tab.key)}
				>
					<span>{tab.name}</span>
					{#if activeTab === tab.key}
						<div
							class="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded bg-white"
						></div>
					{/if}
				</button>
			{/each}
		</div>
	</div>
</div>

<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
	<div class="flex items-center justify-between rounded-t-lg border px-8 py-3">
		<div class="flex flex-1 items-center gap-2">
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M20 20L16.1265 16.1265M16.1265 16.1265C17.4385 14.8145 18.25 13.002 18.25 11C18.25 6.99594 15.0041 3.75 11 3.75C6.99594 3.75 3.75 6.99594 3.75 11C3.75 15.0041 6.99594 18.25 11 18.25C13.002 18.25 14.8145 17.4385 16.1265 16.1265Z"
					stroke="#737373"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<input type="text" placeholder="Search" class="flex-1 bg-transparent outline-none" />
		</div>
		<Button
			size="icon"
			class="h-8 w-8 rounded-full"
			on:click={() =>
				activeTab === 'services' ? (serviceSidebarOpen = true) : (domainSidebarOpen = true)}
		>
			<Plus class="text-gray h-5 w-5" />
		</Button>
	</div>

	<div class="bg-red rounded-lg bg-white shadow-sm">
		{#if activeTab === 'services'}
			<table class="w-full">
				<thead>
					<tr class="border-b border-gray-200">
						<th class="text-sm px-4 py-3 text-left font-medium text-gray-500">SERVICE</th>
						<th class="text-sm px-4 py-3 text-left font-medium text-gray-500">TYPE</th>
						<th class="text-sm px-4 py-3 text-left font-medium text-gray-500">HITS</th>
						<th class="text-sm px-4 py-3 text-left font-medium text-gray-500">LATENCY</th>
						<th class="w-10"></th>
					</tr>
				</thead>
				<tbody>
					{#each filteredServices as service}
						<tr class="border-b border-gray-100">
							<td class="px-4 py-3">
								<div class="flex items-center gap-2">
									{@html StatusIcons[service.status as keyof typeof StatusIcons]}
									{service.name}
								</div>
							</td>
							<td class="px-4 py-3">{service.type}</td>
							<td class="px-4 py-3">{service.hits}</td>
							<td class="px-4 py-3" class:text-red-500={service.latency !== '10ms'}>
								{service.latency}
							</td>
							<td class="bg-red px-4 py-3">
								<Button variant="ghost" size="icon" class="h-8 w-8">
									<MoreVertical class="h-4 w-4" />
								</Button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<table class="w-full">
				<thead>
					<tr class="border-b border-gray-200">
						<th class="text-sm px-4 py-3 text-left font-medium text-gray-500">HOST</th>
						<th class="text-sm px-4 py-3 text-left font-medium text-gray-500">HITS</th>
						<th class="text-sm px-4 py-3 text-left font-medium text-gray-500">EXPIRES ON</th>
						<th class="text-sm px-4 py-3 text-left font-medium text-gray-500">CERTIFICATE</th>
						<th class="w-10"></th>
					</tr>
				</thead>
				<tbody>
					{#each filteredDomains as domain}
						<tr class="border-b border-gray-100">
							<td class="px-4 py-3">
								<div class="flex items-center gap-2">
									<Globe class="h-4 w-4 text-orange-500" />
									{domain.host}
								</div>
							</td>
							<td class="px-4 py-3">{domain.hits}</td>
							<td class="px-4 py-3" class:text-red-500={domain.expiresOn === 'In 2 days'}>
								{domain.expiresOn}
							</td>
							<td class="px-4 py-3">
								<button class="text-blue-600 hover:text-blue-700">
									{domain.certificate}
								</button>
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
		{/if}
	</div>
</div>

<AddDomainSidebar bind:open={domainSidebarOpen} />
<AddServiceSidebar bind:open={serviceSidebarOpen} />
