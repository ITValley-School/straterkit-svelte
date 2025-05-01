import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    plugins: [sveltekit()],
    ssr: {
      noExternal: ['@skeletonlabs/skeleton']
    },
    build: {
      chunkSizeWarningLimit: 50000,
    },
    define: {
      __BASE_PATH__: JSON.stringify('') // Set base URL here : "/svelte/ynex/preview"
    },
  };
});
