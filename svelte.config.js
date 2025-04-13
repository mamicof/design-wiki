import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit';

const config = {
  kit: {
    adapter: adapter()
  },
  preprocess: vitePreprocess()
};

export default config;
