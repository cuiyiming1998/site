<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import config from '~/config'
import { toggleDark } from '~/logics'

const { github } = config

// 控制导航栏显示/隐藏的状态
const isNavVisible = ref(true)
let lastScrollY = 0
let ticking = false

// 滚动处理函数
const processScroll = () => {
  const currentScrollY = window.scrollY

  // 如果滚动距离小于100px，始终显示导航栏
  if (currentScrollY < 100) {
    isNavVisible.value = true
  }
  else {
    // 向下滚动时隐藏，向上滚动时显示
    if (currentScrollY > lastScrollY && currentScrollY > 500) {
      isNavVisible.value = false
    }
    else if (currentScrollY < lastScrollY) {
      isNavVisible.value = true
    }
  }

  lastScrollY = currentScrollY
  ticking = false
}

// 节流处理滚动事件
const onScroll = () => {
  if (!ticking) {
    requestAnimationFrame(processScroll)
    ticking = true
  }
}

// 组件挂载时添加滚动监听
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

// 组件卸载时移除滚动监听
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

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
  <nav
    p="x-8 y-6"
    flex
    justify-end
    class="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20 transition-all duration-300 ease-in-out"
    :class="{
      'transform -translate-y-full opacity-0': !isNavVisible,
      'transform translate-y-0 opacity-100': isNavVisible,
    }"
  >
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
