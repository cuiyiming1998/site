<script setup lang="ts">
const props = defineProps<{ name: string }>()

const { h } = await useMarkdown(props.name)
</script>

<template>
  <article id="article" w-full v-html="h" />
</template>
