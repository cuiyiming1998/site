import antfu from '@antfu/eslint-config'

export default antfu(
  {
    // 启用Vue支持
    vue: true,
    // 启用TypeScript支持
    typescript: true,
    // 启用UnoCSS支持
    unocss: true,
    // 禁用Markdown支持，避免检查markdown文件
    markdown: false,
  },
  {
    // 自定义规则
    rules: {
      'antfu/top-level-function': 'off',
      'MD025': 'off',
    },
  },
  {
    // 忽略文件
    ignores: [
      '*.css',
      '*.scss',
      '*.sass',
      '*.md',
      'dist/**',
      'node_modules/**',
    ],
  },
)
