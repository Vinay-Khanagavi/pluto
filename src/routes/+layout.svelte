<script lang="ts">
	import Header from '$lib/components/common/Header.svelte';
	import '../app.css';
	let { children } = $props();
</script>
<!-- src/routes/+page.svelte -->

<Header />
<main>
	{@render children()}
</main>
