// vite.config.ts
import { resolve } from "node:path";
import Vue from "file:///Users/young/o/site/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vite@4.5.14_@types+node@18.19.127_sass@1.93.2__vue@3.5.22_typescript@4.9.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import fs from "file:///Users/young/o/site/node_modules/.pnpm/fs-extra@11.3.2/node_modules/fs-extra/lib/index.js";
import matter from "file:///Users/young/o/site/node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/index.js";
import anchor from "file:///Users/young/o/site/node_modules/.pnpm/markdown-it-anchor@8.6.7_@types+markdown-it@13.0.9_markdown-it@13.0.2/node_modules/markdown-it-anchor/dist/markdownItAnchor.js";
import LinkAttributes from "file:///Users/young/o/site/node_modules/.pnpm/markdown-it-link-attributes@4.0.1/node_modules/markdown-it-link-attributes/index.js";
import TOC from "file:///Users/young/o/site/node_modules/.pnpm/markdown-it-table-of-contents@0.6.0/node_modules/markdown-it-table-of-contents/index.js";
import { bundledLanguages, createHighlighter } from "file:///Users/young/o/site/node_modules/.pnpm/shiki@3.13.0/node_modules/shiki/dist/index.mjs";
import UnoCSS from "file:///Users/young/o/site/node_modules/.pnpm/unocss@0.51.13_postcss@8.5.6_rollup@3.29.5_vite@4.5.14_@types+node@18.19.127_sass@1.93.2_/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///Users/young/o/site/node_modules/.pnpm/unplugin-auto-import@0.15.3_@vueuse+core@9.13.0_vue@3.5.22_typescript@4.9.5___rollup@3.29.5/node_modules/unplugin-auto-import/dist/vite.js";
import IconsResolver from "file:///Users/young/o/site/node_modules/.pnpm/unplugin-icons@0.17.4_@vue+compiler-sfc@3.5.22_vue-template-compiler@2.7.16/node_modules/unplugin-icons/dist/resolver.mjs";
import Components from "file:///Users/young/o/site/node_modules/.pnpm/unplugin-vue-components@0.24.1_@babel+parser@7.28.4_rollup@3.29.5_vue@3.5.22_typescript@4.9.5_/node_modules/unplugin-vue-components/dist/vite.mjs";
import VueMacros from "file:///Users/young/o/site/node_modules/.pnpm/unplugin-vue-macros@2.14.5_@vueuse+core@9.13.0_vue@3.5.22_typescript@4.9.5___esbuild@0._d9792e1793b291529d805d4e9d8b28b8/node_modules/unplugin-vue-macros/dist/index.js";
import Markdown from "file:///Users/young/o/site/node_modules/.pnpm/unplugin-vue-markdown@0.25.2_rollup@3.29.5_vite@4.5.14_@types+node@18.19.127_sass@1.93.2_/node_modules/unplugin-vue-markdown/dist/vite.js";
import { defineConfig } from "file:///Users/young/o/site/node_modules/.pnpm/vite@4.5.14_@types+node@18.19.127_sass@1.93.2/node_modules/vite/dist/node/index.js";
import Pages from "file:///Users/young/o/site/node_modules/.pnpm/vite-plugin-pages@0.29.1_@vue+compiler-sfc@3.5.22_vite@4.5.14_@types+node@18.19.127_sass@1.93.2_/node_modules/vite-plugin-pages/dist/index.mjs";

// scripts/slugify.ts
import { remove } from "file:///Users/young/o/site/node_modules/.pnpm/diacritics@1.3.0/node_modules/diacritics/index.js";
var rControl = /[\u0000-\u001F]/g;
var rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g;
function slugify(str) {
  return remove(str).replace(rControl, "").replace(rSpecial, "-").replace(/-{2,}/g, "-").replace(/^-+|-+$/g, "").replace(/^(\d)/, "_$1").toLowerCase();
}

// vite.config.ts
var __vite_injected_original_dirname = "/Users/young/o/site";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~/": `${resolve(__vite_injected_original_dirname, "src")}/`
    }
  },
  plugins: [
    VueMacros.vite({
      plugins: {
        vue: Vue({
          include: [/\.vue$/, /\.md$/],
          reactivityTransform: true
        })
      }
    }),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ["vue", "md"],
      extendRoute(route) {
        const path = resolve(__vite_injected_original_dirname, route.component.slice(1));
        if (!path.includes("projects.md") && path.endsWith(".md")) {
          const md = fs.readFileSync(path, "utf-8");
          const { data } = matter(md);
          route.meta = Object.assign(route.meta || {}, { frontmatter: data });
        }
        return route;
      }
    }),
    Markdown({
      wrapperComponent: "WrapperPost",
      wrapperClasses: (id, code) => code.includes("@layout-full-width") ? "" : "prose m-auto slide-enter-content",
      headEnabled: true,
      exportFrontmatter: false,
      exposeFrontmatter: false,
      exposeExcerpt: false,
      markdownItOptions: {
        quotes: `""''`
      },
      async markdownItSetup(md) {
        const shiki = await createHighlighter({
          themes: ["vitesse-light", "vitesse-dark"],
          langs: Object.keys(bundledLanguages)
        });
        md.use((markdown) => {
          markdown.options.highlight = (code, lang) => {
            return shiki.codeToHtml(code, {
              lang,
              themes: {
                light: "vitesse-light",
                dark: "vitesse-dark"
              },
              cssVariablePrefix: "--s-"
            });
          };
        });
        md.use(anchor, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: "#",
            renderAttrs: () => ({ "aria-hidden": "true" })
          })
        });
        md.use(LinkAttributes, {
          matcher: (link) => /^https?:\/\//.test(link),
          attrs: {
            target: "_blank",
            rel: "noopener"
          }
        });
        md.use(TOC, {
          includeLevel: [1, 2, 3, 4],
          slugify,
          containerHeaderHtml: '<div class="table-of-contents-anchor"><div class="i-ri-menu-2-fill" /></div>'
        });
      },
      frontmatterPreprocess(frontmatter, options, id, defaults) {
        /* @__PURE__ */ (() => {
        })();
        const head = defaults(frontmatter, options);
        return { head, frontmatter };
      }
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        "vue",
        "vue/macros",
        "vue-router",
        "@vueuse/core"
      ],
      dts: true,
      dirs: [
        "./src/composables"
      ],
      vueTemplate: true
    }),
    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: ""
        })
      ]
    }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    UnoCSS()
  ],
  // https://github.com/vitest-dev/vitest
  test: {
    environment: "jsdom"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic2NyaXB0cy9zbHVnaWZ5LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3lvdW5nL28vc2l0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3lvdW5nL28vc2l0ZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMveW91bmcvby9zaXRlL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IFZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnXG5pbXBvcnQgbWF0dGVyIGZyb20gJ2dyYXktbWF0dGVyJ1xuaW1wb3J0IGFuY2hvciBmcm9tICdtYXJrZG93bi1pdC1hbmNob3InXG5pbXBvcnQgTGlua0F0dHJpYnV0ZXMgZnJvbSAnbWFya2Rvd24taXQtbGluay1hdHRyaWJ1dGVzJ1xuLy8gQHRzLWV4cGVjdC1lcnJvciBtaXNzaW5nIHR5cGVzXG5pbXBvcnQgVE9DIGZyb20gJ21hcmtkb3duLWl0LXRhYmxlLW9mLWNvbnRlbnRzJ1xuaW1wb3J0IHsgYnVuZGxlZExhbmd1YWdlcywgY3JlYXRlSGlnaGxpZ2h0ZXIgfSBmcm9tICdzaGlraSdcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IFZ1ZU1hY3JvcyBmcm9tICd1bnBsdWdpbi12dWUtbWFjcm9zJ1xuaW1wb3J0IE1hcmtkb3duIGZyb20gJ3VucGx1Z2luLXZ1ZS1tYXJrZG93bi92aXRlJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcblxuaW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJ1xuaW1wb3J0IHsgc2x1Z2lmeSB9IGZyb20gJy4vc2NyaXB0cy9zbHVnaWZ5J1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICd+Lyc6IGAke3Jlc29sdmUoX19kaXJuYW1lLCAnc3JjJyl9L2AsXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIFZ1ZU1hY3Jvcy52aXRlKHtcbiAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgdnVlOiBWdWUoe1xuICAgICAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC5tZCQvXSxcbiAgICAgICAgICByZWFjdGl2aXR5VHJhbnNmb3JtOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgfSksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vaGFubm9lcnUvdml0ZS1wbHVnaW4tcGFnZXNcbiAgICBQYWdlcyh7XG4gICAgICBleHRlbnNpb25zOiBbJ3Z1ZScsICdtZCddLFxuICAgICAgZXh0ZW5kUm91dGUocm91dGUpIHtcbiAgICAgICAgY29uc3QgcGF0aCA9IHJlc29sdmUoX19kaXJuYW1lLCByb3V0ZS5jb21wb25lbnQuc2xpY2UoMSkpXG5cbiAgICAgICAgaWYgKCFwYXRoLmluY2x1ZGVzKCdwcm9qZWN0cy5tZCcpICYmIHBhdGguZW5kc1dpdGgoJy5tZCcpKSB7XG4gICAgICAgICAgY29uc3QgbWQgPSBmcy5yZWFkRmlsZVN5bmMocGF0aCwgJ3V0Zi04JylcbiAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IG1hdHRlcihtZClcbiAgICAgICAgICByb3V0ZS5tZXRhID0gT2JqZWN0LmFzc2lnbihyb3V0ZS5tZXRhIHx8IHt9LCB7IGZyb250bWF0dGVyOiBkYXRhIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcm91dGVcbiAgICAgIH0sXG4gICAgfSksXG5cbiAgICBNYXJrZG93bih7XG4gICAgICB3cmFwcGVyQ29tcG9uZW50OiAnV3JhcHBlclBvc3QnLFxuICAgICAgd3JhcHBlckNsYXNzZXM6IChpZCwgY29kZSkgPT4gY29kZS5pbmNsdWRlcygnQGxheW91dC1mdWxsLXdpZHRoJylcbiAgICAgICAgPyAnJ1xuICAgICAgICA6ICdwcm9zZSBtLWF1dG8gc2xpZGUtZW50ZXItY29udGVudCcsXG4gICAgICBoZWFkRW5hYmxlZDogdHJ1ZSxcbiAgICAgIGV4cG9ydEZyb250bWF0dGVyOiBmYWxzZSxcbiAgICAgIGV4cG9zZUZyb250bWF0dGVyOiBmYWxzZSxcbiAgICAgIGV4cG9zZUV4Y2VycHQ6IGZhbHNlLFxuICAgICAgbWFya2Rvd25JdE9wdGlvbnM6IHtcbiAgICAgICAgcXVvdGVzOiAnXCJcIlxcJ1xcJycsXG4gICAgICB9LFxuICAgICAgYXN5bmMgbWFya2Rvd25JdFNldHVwKG1kKSB7XG4gICAgICAgIGNvbnN0IHNoaWtpID0gYXdhaXQgY3JlYXRlSGlnaGxpZ2h0ZXIoe1xuICAgICAgICAgIHRoZW1lczogWyd2aXRlc3NlLWxpZ2h0JywgJ3ZpdGVzc2UtZGFyayddLFxuICAgICAgICAgIGxhbmdzOiBPYmplY3Qua2V5cyhidW5kbGVkTGFuZ3VhZ2VzKSBhcyBhbnksXG4gICAgICAgIH0pXG5cbiAgICAgICAgbWQudXNlKChtYXJrZG93bikgPT4ge1xuICAgICAgICAgIG1hcmtkb3duLm9wdGlvbnMuaGlnaGxpZ2h0ID0gKGNvZGUsIGxhbmcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzaGlraS5jb2RlVG9IdG1sKGNvZGUsIHtcbiAgICAgICAgICAgICAgbGFuZyxcbiAgICAgICAgICAgICAgdGhlbWVzOiB7XG4gICAgICAgICAgICAgICAgbGlnaHQ6ICd2aXRlc3NlLWxpZ2h0JyxcbiAgICAgICAgICAgICAgICBkYXJrOiAndml0ZXNzZS1kYXJrJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgY3NzVmFyaWFibGVQcmVmaXg6ICctLXMtJyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIG1kLnVzZShhbmNob3IsIHtcbiAgICAgICAgICBzbHVnaWZ5LFxuICAgICAgICAgIHBlcm1hbGluazogYW5jaG9yLnBlcm1hbGluay5saW5rSW5zaWRlSGVhZGVyKHtcbiAgICAgICAgICAgIHN5bWJvbDogJyMnLFxuICAgICAgICAgICAgcmVuZGVyQXR0cnM6ICgpID0+ICh7ICdhcmlhLWhpZGRlbic6ICd0cnVlJyB9KSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSlcblxuICAgICAgICBtZC51c2UoTGlua0F0dHJpYnV0ZXMsIHtcbiAgICAgICAgICBtYXRjaGVyOiAobGluazogc3RyaW5nKSA9PiAvXmh0dHBzPzpcXC9cXC8vLnRlc3QobGluayksXG4gICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgIHRhcmdldDogJ19ibGFuaycsXG4gICAgICAgICAgICByZWw6ICdub29wZW5lcicsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcblxuICAgICAgICBtZC51c2UoVE9DLCB7XG4gICAgICAgICAgaW5jbHVkZUxldmVsOiBbMSwgMiwgMywgNF0sXG4gICAgICAgICAgc2x1Z2lmeSxcbiAgICAgICAgICBjb250YWluZXJIZWFkZXJIdG1sOiAnPGRpdiBjbGFzcz1cInRhYmxlLW9mLWNvbnRlbnRzLWFuY2hvclwiPjxkaXYgY2xhc3M9XCJpLXJpLW1lbnUtMi1maWxsXCIgLz48L2Rpdj4nLFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGZyb250bWF0dGVyUHJlcHJvY2Vzcyhmcm9udG1hdHRlciwgb3B0aW9ucywgaWQsIGRlZmF1bHRzKSB7XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgLy8gaWYgKCFpZC5lbmRzV2l0aCgnLm1kJykpXG4gICAgICAgICAgLy8gcmV0dXJuXG4gICAgICAgICAgLy8gY29uc3QgX3JvdXRlID0gYmFzZW5hbWUoaWQsICcubWQnKVxuICAgICAgICAgIC8vIGlmIChyb3V0ZSA9PT0gJ2luZGV4JyB8fCBmcm9udG1hdHRlci5pbWFnZSB8fCAhZnJvbnRtYXR0ZXIudGl0bGUpXG4gICAgICAgICAgLy8gICByZXR1cm5cbiAgICAgICAgICAvLyBjb25zdCBwYXRoID0gYG9nLyR7cm91dGV9LnBuZ2BcbiAgICAgICAgICAvLyBwcm9taXNlcy5wdXNoKFxuICAgICAgICAgIC8vICAgZnMuZXhpc3RzU3luYyhgJHtpZC5zbGljZSgwLCAtMyl9LnBuZ2ApXG4gICAgICAgICAgLy8gICAgID8gZnMuY29weShgJHtpZC5zbGljZSgwLCAtMyl9LnBuZ2AsIGBwdWJsaWMvJHtwYXRofWApXG4gICAgICAgICAgLy8gICAgIDogZ2VuZXJhdGVPZyhmcm9udG1hdHRlci50aXRsZSEucmVwbGFjZSgvXFxzLVxccy4qJC8sICcnKS50cmltKCksIGBwdWJsaWMvJHtwYXRofWApLFxuICAgICAgICAgIC8vIClcbiAgICAgICAgICAvLyBmcm9udG1hdHRlci5pbWFnZSA9IGBodHRwczovL2FudGZ1Lm1lLyR7cGF0aH1gXG4gICAgICAgIH0pKClcbiAgICAgICAgY29uc3QgaGVhZCA9IGRlZmF1bHRzKGZyb250bWF0dGVyLCBvcHRpb25zKVxuICAgICAgICByZXR1cm4geyBoZWFkLCBmcm9udG1hdHRlciB9XG4gICAgICB9LFxuICAgIH0pLFxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLWF1dG8taW1wb3J0XG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICBpbXBvcnRzOiBbXG4gICAgICAgICd2dWUnLFxuICAgICAgICAndnVlL21hY3JvcycsXG4gICAgICAgICd2dWUtcm91dGVyJyxcbiAgICAgICAgJ0B2dWV1c2UvY29yZScsXG4gICAgICBdLFxuICAgICAgZHRzOiB0cnVlLFxuICAgICAgZGlyczogW1xuICAgICAgICAnLi9zcmMvY29tcG9zYWJsZXMnLFxuICAgICAgXSxcbiAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxuICAgIH0pLFxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3ZpdGUtcGx1Z2luLWNvbXBvbmVudHNcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIGR0czogdHJ1ZSxcbiAgICAgIGV4dGVuc2lvbnM6IFsndnVlJywgJ21kJ10sXG4gICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlLywgL1xcLm1kJC9dLFxuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIEljb25zUmVzb2x2ZXIoe1xuICAgICAgICAgIGNvbXBvbmVudFByZWZpeDogJycsXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICB9KSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bm9jc3NcbiAgICAvLyBzZWUgdW5vY3NzLmNvbmZpZy50cyBmb3IgY29uZmlnXG4gICAgVW5vQ1NTKCksXG4gIF0sXG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVzdC1kZXYvdml0ZXN0XG4gIHRlc3Q6IHtcbiAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcbiAgfSxcbn0pXG5cbi8vIGNvbnN0IG9nU1ZnID0gZnMucmVhZEZpbGVTeW5jKCcuL3NjcmlwdHMvb2ctdGVtcGxhdGUuc3ZnJywgJ3V0Zi04Jylcbi8vIGFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlT2codGl0bGU6IHN0cmluZywgb3V0cHV0OiBzdHJpbmcpIHtcbi8vICAgaWYgKGZzLmV4aXN0c1N5bmMob3V0cHV0KSlcbi8vICAgICByZXR1cm5cblxuLy8gICBhd2FpdCBmcy5ta2RpcihkaXJuYW1lKG91dHB1dCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pXG4vLyAgIC8vIGJyZWFrbGluZSBldmVyeSAyNSBjaGFyc1xuLy8gICBjb25zdCBsaW5lcyA9IHRpdGxlLnRyaW0oKS5zcGxpdCgvKC57MCwyNX0pKD86XFxzfCQpL2cpLmZpbHRlcihCb29sZWFuKVxuXG4vLyAgIGNvbnN0IGRhdGE6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4vLyAgICAgbGluZTE6IGxpbmVzWzBdLFxuLy8gICAgIGxpbmUyOiBsaW5lc1sxXSxcbi8vICAgICBsaW5lMzogbGluZXNbMl0sXG4vLyAgIH1cbi8vICAgY29uc3Qgc3ZnID0gb2dTVmcucmVwbGFjZSgvXFx7XFx7KFtefV0rKX19L2csIChfLCBuYW1lKSA9PiBkYXRhW25hbWVdIHx8ICcnKVxuXG4vLyAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4vLyAgIGNvbnNvbGUubG9nKGBHZW5lcmF0aW5nICR7b3V0cHV0fWApXG4vLyAgIHRyeSB7XG4vLyAgICAgYXdhaXQgc2hhcnAoQnVmZmVyLmZyb20oc3ZnKSlcbi8vICAgICAgIC5yZXNpemUoMTIwMCAqIDEuMSwgNjMwICogMS4xKVxuLy8gICAgICAgLnBuZygpXG4vLyAgICAgICAudG9GaWxlKG91dHB1dClcbi8vICAgfVxuLy8gICBjYXRjaCAoZSkge1xuLy8gICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBnZW5lcmF0ZSBvZyBpbWFnZScsIGUpXG4vLyAgIH1cbi8vIH1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3lvdW5nL28vc2l0ZS9zY3JpcHRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMveW91bmcvby9zaXRlL3NjcmlwdHMvc2x1Z2lmeS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMveW91bmcvby9zaXRlL3NjcmlwdHMvc2x1Z2lmeS50c1wiOy8vIHN0cmluZy5qcyBzbHVnaWZ5IGRyb3BzIG5vbiBhc2NpaSBjaGFycyBzbyB3ZSBoYXZlIHRvXG4vLyB1c2UgYSBjdXN0b20gaW1wbGVtZW50YXRpb24gaGVyZVxuaW1wb3J0IHsgcmVtb3ZlIH0gZnJvbSAnZGlhY3JpdGljcydcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRyb2wtcmVnZXhcbmNvbnN0IHJDb250cm9sID0gL1tcXHUwMDAwLVxcdTAwMUZdL2dcbmNvbnN0IHJTcGVjaWFsID0gL1tcXHN+YCFAIyQlXiYqKClcXC1fKz1bXFxde318XFxcXDs6XCInPD4sLj8vXSsvZ1xuXG5leHBvcnQgZnVuY3Rpb24gc2x1Z2lmeShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiAoXG4gICAgcmVtb3ZlKHN0cilcbiAgICAgIC8vIFJlbW92ZSBjb250cm9sIGNoYXJhY3RlcnNcbiAgICAgIC5yZXBsYWNlKHJDb250cm9sLCAnJylcbiAgICAgIC8vIFJlcGxhY2Ugc3BlY2lhbCBjaGFyYWN0ZXJzXG4gICAgICAucmVwbGFjZShyU3BlY2lhbCwgJy0nKVxuICAgICAgLy8gUmVtb3ZlIGNvbnRpbnVvcyBzZXBhcmF0b3JzXG4gICAgICAucmVwbGFjZSgvLXsyLH0vZywgJy0nKVxuICAgICAgLy8gUmVtb3ZlIHByZWZpeGluZyBhbmQgdHJhaWxpbmcgc2VwYXJ0b3JzXG4gICAgICAucmVwbGFjZSgvXi0rfC0rJC9nLCAnJylcbiAgICAgIC8vIGVuc3VyZSBpdCBkb2Vzbid0IHN0YXJ0IHdpdGggYSBudW1iZXIgKCMxMjEpXG4gICAgICAucmVwbGFjZSgvXihcXGQpLywgJ18kMScpXG4gICAgICAvLyBsb3dlcmNhc2VcbiAgICAgIC50b0xvd2VyQ2FzZSgpXG4gIClcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxTQUFTLGVBQWU7QUFDeEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sUUFBUTtBQUNmLE9BQU8sWUFBWTtBQUNuQixPQUFPLFlBQVk7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
