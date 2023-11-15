<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'AboutPage',
})
</script>

<template>
  <div>
    <Plum />
    <div w="full">
      <Profile />
    </div>
    <div w="full" flex="~ col justify-center">
      <Skills />
      <Projects />
      <Works />
    </div>
  </div>
</template>
