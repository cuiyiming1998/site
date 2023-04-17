<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const goBack = () => {
  return router.back()
}

const showBackLink = computed(() => {
  return route.fullPath !== '/'
})
</script>

<template>
  <nav
    p-rs
    mt-6
    flex="~ col"
    gap-2
    text-base
  >
    <div
      v-if="showBackLink"
      mt-8
      text="center sm:left"
    >
      <span font-mono op50> > </span>
      <a
        font-mono
        op50
        border="b b-solid b-#7D7D7D/30"
        transition="300"
        hover="op80 border-b-#7D7D7D"
        cursor-pointer
        @click.prevent="goBack()"
      >
        cd ..
      </a>
    </div>
    <div
      mt-8
      mb-4
      text="sm #555/50 dark:#bbb/50 center sm:left"
    >
      2023 - PRESENT © Young
    </div>
  </nav>
</template>
