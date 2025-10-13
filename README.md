# 个人网站与博客

本项目是一个使用 Vue 3 + Vite + Markdown 构建的个人网站与博客，集成文件路由、按需样式、代码高亮与内容前言（frontmatter），适合快速搭建并维护个人主页与文章内容。

> 项目在 `vitesse-lite` 的基础上进行定制与扩展。

## 技术栈

- `Vue 3`、`TypeScript`
- `Vite 4`
- `Vue Router` + `vite-plugin-pages` 文件系统路由
- `unplugin-vue-markdown` 将 Markdown 渲染为 Vue 组件
- `Shiki` 代码高亮（主题：`vitesse-light` / `vitesse-dark`）
- `UnoCSS` 原子化按需样式
- 自动导入：`unplugin-auto-import`、`unplugin-vue-components`
- 图标：`Iconify`、UnoCSS `preset-icons`
- 状态管理：`Pinia`（可选）
- 测试：`Vitest` + `@vue/test-utils`

## 快速开始

### 环境要求

- `Node.js >= 18`
- 包管理器：推荐使用 `pnpm`

### 安装与运行

```bash
pnpm i
pnpm dev # 默认端口 3333，并自动打开浏览器
```

### 其他常用命令

- 构建生产包：`pnpm build`
- 本地预览构建产物：`pnpm preview`
- 代码检查：`pnpm lint`
- 类型检查：`pnpm typecheck`
- 单元测试：`pnpm test`

## 项目结构

```
src/
  components/        # 站点组件（导航、页脚、卡片等）
  composables/       # 组合式函数与工具（如暗色模式）
  pages/             # 基于文件的路由与页面（含 Markdown）
  styles/            # 全局与 Markdown 样式、代码高亮样式
  route/             # 路由初始化
  config/            # 站点相关配置
  utils/             # 工具方法（文件、代码高亮等）
```

路由由 `vite-plugin-pages` 自动生成，`src/pages` 下的 `.vue` 与 `.md` 文件会被映射为页面。构建时会读取 Markdown 文件的 frontmatter 并注入到 `route.meta.frontmatter`。

## 内容与 Markdown

在 `src/pages/` 中新增文章与页面：

- 文章：`src/pages/posts/xxx.md`
- 标签页：`src/pages/tags/`
- 其它页面：直接在 `src/pages/` 下创建 `.md` 或 `.vue`

### Frontmatter 示例

在 Markdown 顶部添加 frontmatter 用于标题、日期、标签等：

```md
---
title: 我的第一篇文章
date: 2025-01-01
tags: [Vue, Vite]
description: 简短摘要说明
draft: false
---

正文内容从这里开始...
```

### 全宽布局

若希望某个 Markdown 页面使用全宽布局（不包裹 `prose` 样式），可在文档中添加特殊标记：

```
@layout-full-width
```

包含该标记时，页面将移除默认的 `prose m-auto slide-enter-content` 包裹类。

### 代码高亮

使用三引号代码块并指定语言，Shiki 会自动高亮：

```ts
export const hello = (name: string) => `Hello, ${name}`
```

## 样式与图标

- 全局与 Markdown 样式位于 `src/styles/`（`main.css`、`markdown.css`、`code.scss`、`prose.css`）。
- 图标既可以通过 UnoCSS 的纯 CSS 类使用（例如：`i-ri-menu-2-fill`），也可以通过 `unplugin-icons` 作为组件使用。

## 部署

项目内置 `netlify.toml`，可零配置部署到 Netlify：

- 构建命令：`pnpm build`
- 发布目录：`dist`

也可部署到任意静态托管服务（例如 Vercel、GitHub Pages 等）。

## 许可证

本项目基于 MIT 许可证开源，详见 `LICENSE` 文件。

## 致谢

- 基于并致敬：[`antfu/vitesse-lite`](https://github.com/antfu/vitesse-lite)
- 使用并感谢：Vue、Vite、UnoCSS、Shiki、Iconify 等优秀开源项目。
