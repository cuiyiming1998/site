<script setup lang="ts">
</script>

<template>
  <div
    class="article"
    flex="~ col"
    justify-center
    items-center
    px-300px
  >
    <Suspense>
      <RouterView />
    </Suspense>
  </div>
</template>

<style lang="scss">
@import url(../styles/code.scss);

html:not(.dark) {
  .hljs {
    background-color: #f8f8f8;
  }
}
.article {
  h1 {
    font-size: 2.3rem;
    font-weight: bold;
  }
}
</style>
