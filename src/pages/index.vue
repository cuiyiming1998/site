<script setup lang="ts">
import config from '~/config'

const { name } = config
</script>

<template>
  <div>
    <h1
      text-4xl
      font-900
      mb-8
      center-rs
      underline
      cursor-default
    >
      {{ name }}
    </h1>

    <div text="lg #555 dark:#bbb">
      <p center-rs mb-4>
        A frontend engineer.
      </p>
      <p center-rs mb-4>
        Graduated from HEBNU.
      </p>
      <p center-rs mb-4>
        A Vimer.
      </p>
      <p center-rs mb-4>
        I use daily:
        <code inline-block ml-4>TypeScript</code>
        <code inline-block ml-4>JavaScript</code>
        <code inline-block ml-4>Vue.js</code>
        (Most ❤️)
        <code inline-block ml-4>React.js</code>
        .
      </p>
    </div>

    <section
      mt-6
      font-bold
      font-mono
      text="#d6a01d xl"
    >
      Any application that can be written in JavaScript, will eventually be written in JavaScript.
    </section>
  </div>
</template>

<style lang="scss" scoped>
code {
  font-family: DM Mono,Input Mono,Fira Code, monospace;
}
</style>
