---
title: 从零实现Vue3响应式系统-01
description: Vue3 Reactivity
date: 2023/11/14 19:05:00
tags:
  - Vue
---

[[toc]]

在面试中, 我们经常会被问到: `小伙子, Vue3的响应式系统是如何实现的?`. 大部分人都会回答`Object.defineProperty / Proxy + 发布订阅者模式`.

人人都会这么回答, 那么我们作为一个资深前端(~~CV工程师~~), 肯定要深入的去解释一下, 下面我们就开始手写一个简易的响应式系统, 看看Vue3中是如何处理这些数据变化的. 面试的时候让面试官直呼NB.

<div align="center">
  <img src="https://i.postimg.cc/Ss7VJ6sS/yellow-smile.webp" style="width: 100px; height: 100px;"/>
</div>

## 搭建环境

首先创建一个空文件夹, 并在终端中打开.

这里直接用我的模板就好, 推荐使用[degit](https://github.com/Rich-Harris/degit), 没有的话可以安装一下.

```bash
pnpm i -g degit
```

```bash
degit cuiyiming1998/ts-starter
```

克隆好之后安装一下依赖, 推荐使用[ni](https://github.com/antfu/ni), `ni` 或 `pnpm i`.

安装好后运行`pnpm test`, 显示test passed就说明我们环境搭建成功了.

<div align="center">
  <img src='https://i.postimg.cc/J7bSZ857/image.png' border='0' alt='image' />
</div>

## 最终要实现的效果

最终实现的效果, 转化成到`vitest`中, 是这么个效果

在``__tests__``文件夹下的`index.test.ts`中, 输入下面代码

```typescript
import { describe, expect, it, vi } from 'vitest'
import { effect, reactive } from '../src/index'

describe('effect', () => {
  it('happy path', () => {
    const user = reactive({
      age: 10,
    })

    let nextAge

    effect(() => {
      nextAge = user.age + 1
    })
    expect(nextAge).toBe(11)

    user.age++
    expect(nextAge).toBe(12)
  })
})
```

大致意思就是, `nextAge`依赖了响应式对象`user`的`age`属性, 然后`user`的`age`属性变化了, 依赖的`nextAge`也会跟着变化.

接下来, 我们只要设法实现`reactive`和`effect`方法, 让测试通过就OK了.

## 了解下响应式系统工作的原理

> 这里借用下掘金上大佬的Reactivity工作流程图

<div align="center">
  <img src='https://i.postimg.cc/133qBSn1/5cb72cb1cae6403cbe531770a110c8d7-tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.webp' border='0' alt='image' />
</div>

## 从Proxy看起

背过八股文的我们都知道, 响应式的触发需要通过`收集依赖(track)`, 数据更新后`触发依赖 通知更新(trigger)`, 这一系列的过程都是通过`Proxy`代理对象来实现的.可以说`Proxy`是响应式系统的核心之一.

> 如果不知道`Proxy`是什么东西的话, 只能说你太Out了🤪, [文档在此](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

这里我们在`src`目录下创建一个`reactive.ts`, 准备创建一个`Proxy`来接收响应式对象. 也就是开始写`reactive`部分的代码.

```typescript
export function reactive(target: any) {
  return new Proxy(target, {
    get(target, key) {
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      Reflect.set(target, key, value)
      return true
    },
  })
}
```

> 这里为什么使用`Reflect`, [推荐阅读这篇文章](https://juejin.cn/post/7287420810318659638?searchId=202311141136407A467A7FE42092B30261).

## 收集依赖

沿着`Proxy`的`handler`属性, 我们可以找到`get`和`set`方法, 分别对应着`收集依赖`和`触发依赖`.

这里有个问题, 在数据更新的时候我们`触发依赖`, 如何知道有哪些数据依赖了我们的`reactive`对象呢? 这里我们需要一个数据结构来存储响应式对象和依赖它的对象, 确定他们的依赖关系. 也就`收集依赖`后的存储.

既然是对应关系, 那么使用`WeakMap`来存储是最好的.

从图里面看, 我们需要一个外层的`targetMap`来存储所有的响应式对象, 在`targetMap`内部有一个`depsMap`来对应响应式对象的`key`值与他的`deps`的映射关系, `deps`是一个`Set`结构, 存储所有依赖当前`key`的回调函数(也就是测试代码中`effect`包裹的部分).这是一个**一对多对多**的关系.

那依赖又是怎样收集的呢? 这就要回到之前的`Proxy`中, 在数据进行`get`操作的时候, 也就是响应式数据被读取的时候, 这个时候就是执行依赖收集的时机.

```typescript

import { track } from './effect'

export function reactive(target: any) {
  return new Proxy(target, {
    get(target, key) {
      // 在这里进行依赖收集
      track(target, key)
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      Reflect.set(target, key, value)
      return true
    },
  })
}
```

<div align="center">reactive.ts</div>

```typescript

export function effect(fn: any) {

}

export function track(target: Record<string, any>, key: string) {

}

```

<div align="center">effect.ts</div>

### effect的功能

由测试代码可知, `effect`在被创建的时候会执行一次, 执行的时候会触发`reactive`的`get`, 也就是收集依赖, 这里我们声明一个`ReactiveEffect`类来方便后面统一存入`deps`中进行维护. 还需要一个`activeEffect`来存储当前正在访问的`effect`

```typescript

let activeEffect: any

class ReactiveEffect {
  _fn: any
  constructor(fn: any) {
    this._fn = fn
  }

  run() {
    activeEffect = this
    const result = this._fn()
    return result
  }
}

// effect使用ReactiveEffect类
export function effect(fn: any) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}

```

<div align="center">effect.ts</div>

### track的功能

这时已经完成了`effect`调用时的执行, 下面来处理`track`方法. 在`track`时, 根据获取到的`target`和`key`来获取`depsMap`和`deps`, 如果没有则创建, 然后将当前的`effect`加入到`deps`中.

```typescript

const targetMap = new WeakMap()

export function track(target: Record<string, any>, key: string | symbol) {
  let depsMap = targetMap.get(target)
  if (!depsMap)
    targetMap.set(target, (depsMap = new Map()))

  let deps = depsMap.get(key)
  if (!deps)
    depsMap.set(key, (deps = new Set()))
  deps.add(activeEffect)
}

```

<div align="center">effect.ts</div>

至此, 我们依赖的映射关系就已经构建完成了, 也就代表着`依赖收集`的完成.

## 触发依赖

依赖的触发其实就比较简单了, 思考一下, 我们前面已经构建完了依赖关系, 那么在数据更新的时候(也就是触发`set`的时候), 找到对应的`depsMap`和`deps`, 把`deps`中的`effect`拿出来依次执行就可以了.

### trigger的功能

在`reactive`的`set`中, 添加拦截方法`trigger`

```typescript

set(target, key) {
  // 这里顺序不要错, 先set
  Reflect.set(target, key, value)
  // 触发依赖
  trigger(target, key)
  return true
}

```

接下来, 我们在`effect.ts`中去实现`trigger`

```typescript

export function trigger(target: Record<string, any>, key: string | symbol) {
  // 获取deps
  const depsMap = targetMap.get(target)

  if (!depsMap)
    return
  const deps = depsMap.get(key)
  if (!deps)
    return

  // 拿出来依次执行
  for (const effect of deps)
    effect.run()
}

```

## 完成

`trigger`实现完成了, 回头看看我们的测试吧.

<div align="center">
  <img src='https://i.postimg.cc/5tW98VDb/image.png' border='0' alt='image' />
</div>

<div align="center">已经通过了🤩</div>

`reactivity`模块可以说是Vue源码中比较好阅读的部分, `reactive`只是一部分, 后面还有`ref`, `computed`, `watch`等等常用API的实现. 这里开个坑, 希望后面能够一直坚持输出文章. 也当作是复习(~~主要是为了升职涨薪~~) 🫢.
