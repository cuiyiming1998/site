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
      px-400px
    >
      <div
        v-for="(article, idx) in markdowns"
        :key="idx"
        h-o
        cursor-pointer
        @click="routerLinkTo(article)"
      >
        <div
          font-bold
          text-2xl
        >
          {{ article.title }}
        </div>
        <div text="gray/80" my-4>
          {{ article.description }}
        </div>
        <div text="gray/60">
          {{ article.time }}
        </div>
      </div>
    </div>

    <div
      v-else
      flex="~ col"
      justify-center
      items-center
      px-300px
    >
      <Suspense>
        <RouterView />
      </Suspense>
    </div>
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
