---
title: 从零学习Rust 02
route: Study-Rust-02
description: Study Rust
time: 2023/06/27 14:12:00
tags:
  - Rust
---


# 从零学习Rust 02 变量和数据交互的方式

[视频地址](https://www.bilibili.com/video/BV1hp4y1k7SV?p=16&spm_id_from=pageDriver&vd_source=888e5b3129deb84d49dd800b76a6e557)

## 移动(Move)

多个变量可以与同一个数据使用一种独特的方式来交互

```rust
fn main() {
    let x = 5;
    let y = x;
}
```

因为都是已知且固定大小的简单值, 所以都在`Stack`中.

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;
}
```

一个`String`在`Stack`中由三部分组成

* 一个指向存放内容的内存的`ptr`.
* 一个长度`len`(字符串长度).
* 一个容量`capacity`(`String`从操作系统中总共获得的内存的总字节数).

内容在`Heap`上.

`Rust`不会复制被`s2`分配的内存.它会让`s1`失效.给`s2`赋值后, 再次访问`s1`就会报错(所有权Move了).

隐含的设计原则: `Rust`不会自动创建数据的深拷贝.

## 克隆(Clone)

如果真想对`Heap`上面的`String`数据进行深度拷贝, 而不仅仅是`Stack`上的数据, 可以使用`clone`.

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();
}
```

## Stack上的内容 (Copy)

`Copy` trait, 可以用于像整数这样完全存放在`Stack`上的类型.

如果一个类型实现了`Copy`, 那么旧的变量在赋值后仍然可用.

如果一个类型或者该类型的一部分实现了`Drop`, 那么就不允许再去实现`Copy`了.

### 一些拥有Copy trait的类型

* 任何简单标量类型.
* 需要分配内存或者资源的都没有.
* 拥有的: `整数类型, 例如u32`, `bool`, `char`, `浮点类型, 例如f64`, `Tuple`(如果其所有的字段都是可以Copy的).
