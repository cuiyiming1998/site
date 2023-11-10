<script setup lang="ts">
import config from '~/config'

const { name } = config
</script>

<template>
  <div m-auto>
    <Plum />
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

    <div text="section lg" slide-enter-50>
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
      mt-10
      font-bold
      font-mono
      text="#d6a01d xl"
    >
      Any application that can be written in JavaScript, will eventually be written in JavaScript.
    </section>

    <section
      mt-10
      text="lg section"
    >
      Welcome to my site. I will write some coding articles and my diaries here.
    </section>
    <section
      mt-6
      text="lg section"
    >
      I'm Young, a fanatical coder. Recently living in Beijing. Focusing on frontend.
    </section>
    <section
      mt-6
      text="lg section"
    >
      Outside of programming, in my spare time, I enjoy basketball and video games.
      I frequently watch NBA and my favorite team is GSW.
      Hope that we can be good friends!
    </section>
  </div>
</template>

<style lang="scss" scoped>
code {
  font-family: 'Fira Code', 'DM Mono', 'Input Mono', monospace;
}
</style>
