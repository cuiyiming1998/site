/// <reference types="vitest" />

import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import fs from 'fs-extra'
import matter from 'gray-matter'
import anchor from 'markdown-it-anchor'
import LinkAttributes from 'markdown-it-link-attributes'
// @ts-expect-error missing types
import TOC from 'markdown-it-table-of-contents'
import { bundledLanguages, createHighlighter } from 'shiki'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros'
import Markdown from 'unplugin-vue-markdown/vite'
import { defineConfig } from 'vite'

import Pages from 'vite-plugin-pages'
import { slugify } from './scripts/slugify'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    VueMacros.vite({
      plugins: {
        vue: Vue({
          include: [/\.vue$/, /\.md$/],
          reactivityTransform: true,
        }),
      },
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md'],
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1))

        if (!path.includes('projects.md') && path.endsWith('.md')) {
          const md = fs.readFileSync(path, 'utf-8')
          const { data } = matter(md)
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })
        }

        return route
      },
    }),

    Markdown({
      wrapperComponent: 'WrapperPost',
      wrapperClasses: (id, code) => code.includes('@layout-full-width')
        ? ''
        : 'prose m-auto slide-enter-content',
      headEnabled: true,
      exportFrontmatter: true,
      exposeFrontmatter: true,
      exposeExcerpt: false,
      markdownItOptions: {
        quotes: '""\'\'',
      },
      async markdownItSetup(md) {
        const shiki = await createHighlighter({
          themes: ['vitesse-light', 'vitesse-dark'],
          langs: Object.keys(bundledLanguages) as any,
        })

        md.use((markdown) => {
          markdown.options.highlight = (code, lang) => {
            return shiki.codeToHtml(code, {
              lang,
              themes: {
                light: 'vitesse-light',
                dark: 'vitesse-dark',
              },
              cssVariablePrefix: '--s-',
            })
          }
        })

        md.use(anchor, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' }),
          }),
        })

        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })

        md.use(TOC, {
          includeLevel: [1, 2, 3, 4],
          slugify,
          containerHeaderHtml: '<div class="table-of-contents-anchor"><div class="i-ri-menu-2-fill" /></div>',
        })
      },
      frontmatterPreprocess(frontmatter, options, id, defaults) {
        (() => {
          // if (!id.endsWith('.md'))
          // return
          // const _route = basename(id, '.md')
          // if (route === 'index' || frontmatter.image || !frontmatter.title)
          //   return
          // const path = `og/${route}.png`
          // promises.push(
          //   fs.existsSync(`${id.slice(0, -3)}.png`)
          //     ? fs.copy(`${id.slice(0, -3)}.png`, `public/${path}`)
          //     : generateOg(frontmatter.title!.replace(/\s-\s.*$/, '').trim(), `public/${path}`),
          // )
          // frontmatter.image = `https://antfu.me/${path}`
        })()
        const head = defaults(frontmatter, options)
        return { head, frontmatter }
      },
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    UnoCSS(),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})

// const ogSVg = fs.readFileSync('./scripts/og-template.svg', 'utf-8')
// async function generateOg(title: string, output: string) {
//   if (fs.existsSync(output))
//     return

//   await fs.mkdir(dirname(output), { recursive: true })
//   // breakline every 25 chars
//   const lines = title.trim().split(/(.{0,25})(?:\s|$)/g).filter(Boolean)

//   const data: Record<string, string> = {
//     line1: lines[0],
//     line2: lines[1],
//     line3: lines[2],
//   }
//   const svg = ogSVg.replace(/\{\{([^}]+)}}/g, (_, name) => data[name] || '')

//   // eslint-disable-next-line no-console
//   console.log(`Generating ${output}`)
//   try {
//     await sharp(Buffer.from(svg))
//       .resize(1200 * 1.1, 630 * 1.1)
//       .png()
//       .toFile(output)
//   }
//   catch (e) {
//     console.error('Failed to generate og image', e)
//   }
// }
