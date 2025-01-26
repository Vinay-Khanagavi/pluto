import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	define: {
		__PROJECT_PATH__: `"${process.cwd()}/"`,
	  },
	plugins: [sveltekit()]
});