<script setup lang="ts" generic="T extends any, O extends any">
import { isDark } from '~/logics'

defineOptions({
  name: 'AboutPage',
})
</script>

<template>
  <div>
    <Galaxy v-if="isDark" />
    <Plum v-else />
    <div w="full">
      <Profile />
    </div>
    <div w="full" flex="~ col justify-center">
      <Skills />
      <Projects />
      <!-- <Works /> -->
    </div>
  </div>
</template>
