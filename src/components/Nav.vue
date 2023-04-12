<script setup lang="ts">
import config from '~/config'

const { github } = config

interface NavItem {
  label: string
  href: string
}
const hrefList: NavItem[] = [
  {
    label: 'Blog',
    href: '/',
  },
  {
    label: 'Projects',
    href: '/',
  },
  {
    label: 'Resume',
    href: 'https://youngs-resume.vercel.app/',
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
    <div w-100 flex="~" justify-around>
      <a
        v-for="(i, idx) in hrefList"
        :key="idx"
        class="text-lg text-gray-600 dark:text-gray-400"
        text-hover-scale
        :href="i.href"
        @click="(e) => routerLink(i.href, e)"
      >
        {{ i.label }}
      </a>

      <div f-c-c>
        <dih-6
          w-6
          h-6
          i-carbon-logo-github
          f-c-c
          text-hover-scale
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
          text-hover-scale
          @click="toggleDark()"
        />
      </div>
    </div>
  </nav>
</template>
