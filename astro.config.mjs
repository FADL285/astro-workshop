import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";

import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-vue-shop.netlify.app/',
  output: 'hybrid',
  integrations: [vue()],
  adapter: netlify()
});