import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: { allowedHosts: ['nc.stovnerfrisbee.no'] },
	preview: { allowedHosts: ['nc.stovnerfrisbee.no'] },
	test: { include: ['src/**/*.test.ts'] }
});
