<script setup lang="ts">
import config from '~/config'
import { toggleDark } from '~/logics'

const { github } = config

interface NavItem {
  label: string
  href: string
}
const hrefList: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Posts',
    href: '/posts',
  },
  {
    label: 'Tags',
    href: '/tags',
  },
  // {
  //   label: 'Projects',
  //   href: '/',
  // },
  {
    label: 'About Me',
    // href: 'https://about-young.info/',
    href: '/about',
  },
]

const routerLink = (location: string, e?: MouseEvent) => {
  if (location.startsWith('https')) {
    e?.preventDefault()
    window.open(location, '_blank')
  }
}
</script>

<template>
  <nav p="x-8 y-6" flex justify-end>
    <div w-90 flex="~" justify-around>
      <a
        v-for="(i, idx) in hrefList"
        :key="idx"
        class="text-lg text-gray-600 dark:text-gray-400"
        text-hover
        :href="i.href"
        @click="(e) => routerLink(i.href, e)"
      >
        {{ i.label }}
      </a>

      <div f-c-c>
        <div
          w-6
          h-6
          i-carbon-logo-github
          f-c-c
          text-hover
          @click="routerLink(github)"
        />
      </div>

      <div f-c-c>
        <div
          h-6
          w-6
          i-carbon-sun
          dark:i-carbon-moon
          dark="h-6 w-6"
          text-hover
          @click="toggleDark"
        />
      </div>
    </div>
  </nav>
</template>
