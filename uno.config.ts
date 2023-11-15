import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,

} from 'unocss'

import config from './src/config'

const createSafeListIcons = (): string[] => {
  const { projects } = config
  const safelistIcons = projects.map(project => project.iconName)
  return safelistIcons
}
const safelistIcons = createSafeListIcons()
const safelist = [...safelistIcons, 'i-ri-menu-2-fill']

export default defineConfig({
  rules: [
    [/^slide-enter-(\d+)$/, ([_, n]) => ({
      '--enter-stage': n,
    })],
  ],
  shortcuts: [
    {
      'bg-base': 'bg-white dark:bg-black',
      'border-base': 'border-[#8884]',
    },
    [/^btn-(\w+)$/, ([_, color]) => `op50 px2.5 py1 transition-all duration-200 ease-out no-underline! hover:(op100 text-${color} bg-${color}/10) border border-base! rounded`],
    [
      'btn',
      'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    ],
    [
      'icon-btn',
      'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none',
    ],
    [
      'f-c-c',
      'flex justify-center items-center',
    ],
    [
      'h-o',
      'transition-all transition-300 opacity-75 hover:opacity-110',
    ],
    [
      'text-hover-scale',
      'transition-all transition-300 cursor-pointer text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:transform-scale-120',
    ],
    [
      'text-hover',
      'transition-all transition-300 cursor-pointer text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200',
    ],
    [
      'text-section',
      'text-#555 dark:text-#bbb',
    ],
    [
      'p-rs',
      'px-7 md:px-30 lg:px-50 xl:px-400px',
    ],
    [
      'center-rs',
      'text-center md:text-left',
    ],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
  safelist,
})
