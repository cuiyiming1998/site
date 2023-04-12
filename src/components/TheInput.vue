<script setup lang="ts">
const props = defineProps<{
  value: any
}>()
const emits = defineEmits<{
  (e: 'update:value', value: any): void
}>()

const value = computed({
  get() {
    return props.value
  },
  set(v) {
    emits('update:value', v)
  },
})
</script>

<template>
  <input
    id="input"
    v-model="value"
    type="text"
    v-bind="$attrs"
    p="x-4 y-2"
    w="250px"
    text="center"
    bg="transparent"
    border="~ rounded gray-200 dark:gray-700"
    outline="none active:none"
  >
</template>
