<script setup lang="ts">
import { getAllMarkdowns } from '~/utils/file'
import type { MarkDown } from '~/utils/file/types.d'

const route = useRoute()
const router = useRouter()

const markdowns = ref<MarkDown[]>([])

onMounted(async () => {
  markdowns.value = await getAllMarkdowns()
})

const isRoot = computed(() => {
  return route.fullPath === '/posts'
})

const routerLinkTo = (article: MarkDown) => {
  const { route } = article
  router.push(`/posts/${route}`)
}
</script>

<template>
  <div
    class="article"
  >
    <div
      v-if="isRoot"
    >
      <h1
        text-center
        mb-4
        underline
      >
        Posts
      </h1>
      <div
        v-for="(article, idx) in markdowns"
        :key="idx"
        h-o
        m="t-2 b-6"
        cursor-pointer
        @click="routerLinkTo(article)"
      >
        <div
          font-bold
          text="2xl center sm:left"
          mb-2
        >
          {{ article.title }}
        </div>
        <div
          v-if="!!article.description"
          text="gray/80 center sm:left"
        >
          {{ article.description }}
        </div>
        <div
          text="gray/60 center sm:left"
          mt-2
        >
          {{ article.time }}
        </div>
      </div>
    </div>

    <Suspense
      v-else
      flex="~ col"
      justify-center
      items-center
    >
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
