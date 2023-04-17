---
title: Test2
route: test2
description: Nothing
time: 2023/04/17
tags:
  - Test
---
# Test2

- I am also a test

```js
import { promises as fs } from 'node:fs'
import glob from 'fast-glob'

// 通常这个是可以配置的
const include = ['src/**/*.{jsx,tsx,vue,html}']

async function scan() {
  const files = await glob(include)

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8')
    // 将文件内容传递给生成器并配对 class 的使用情况
  }
}

await scan()
// 扫描会在构建/服务器启动前完成
await buildOrStartDevServer()
```

我是行内的`const a = 2`
