---
title: 从零实现Vue3响应式系统-01
description: Vue3 Reactivity
date: 2023/11/10 10:07:00
draft: true
tags:
  - Vue
---

在面试中, 我们经常会被问到: `小伙子, Vue3的响应式系统是如何实现的?`. 大部分人都会回答`Object.defineProperty / Proxy + 发布订阅者模式`.

人人都会这么回答, 那么我们作为一个资深前端(~~CV工程师~~), 肯定要深入的去解释一下, 下面我们就开始手写一个简易的响应式系统, 看看Vue3中是如何处理这些数据变化的. 面试的时候让面试官直呼NB.

<div align="center">
  <img src="https://i.postimg.cc/Ss7VJ6sS/yellow-smile.webp" style="width: 100px; height: 100px;"/>
</div>


## 1. 搭建环境

首先创建一个空文件夹, 并在终端中打开

这里直接用我的模板就好, 推荐使用[degit](https://github.com/Rich-Harris/degit), 没有的话可以安装一下

```bash
pnpm i -g degit
```

```bash
degit cuiyiming1998/ts-starter
```

克隆好之后安装一下依赖, 推荐使用[ni](https://github.com/antfu/ni), `ni` 或 `pnpm i`
