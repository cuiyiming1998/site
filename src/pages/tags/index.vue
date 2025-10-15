<script setup lang="ts" generic="T extends any, O extends any">
import type { MarkDown } from '../../utils/file/types.d'
import { formatDate, isDark } from '~/logics'
import { getAllMarkdowns, getAllTags } from '../../utils/file'

defineOptions({
  name: 'TagsPage',
})

const markdowns = ref<MarkDown[]>([])
const tags = ref<string[]>([])
const expandedTags = ref<Set<string>>(new Set())

onMounted(async () => {
  markdowns.value = await getAllMarkdowns()
  tags.value = await getAllTags()
})

// 计算每个标签的文章数量
const getTagCount = (tag: string) => {
  return markdowns.value.filter(markdown =>
    markdown.tags?.includes(tag),
  ).length
}

// 获取某个标签的所有文章
const getPostsByTag = (tag: string) => {
  return markdowns.value.filter(markdown =>
    markdown.tags?.includes(tag),
  ).sort((a, b) => +new Date(b.date) - +new Date(a.date))
}

// 切换标签展开/折叠状态
const toggleTag = (tag: string) => {
  if (expandedTags.value.has(tag)) {
    expandedTags.value.delete(tag)
  }
  else {
    expandedTags.value.add(tag)
  }
}

// 检查标签是否展开
const isTagExpanded = (tag: string) => {
  return expandedTags.value.has(tag)
}
</script>

<template>
  <div>
    <Galaxy v-if="isDark" />
    <Plum v-else />
    <ul v-if="tags.length">
      <div
        select-none relative h20 pointer-events-none slide-enter
        :style="{
          '--enter-stage': 0,
          '--enter-step': '60ms',
        }"
      >
        <span text-8em color-transparent absolute left--3rem top--2rem font-bold text-stroke-2 text-stroke-hex-aaa op10>Tags</span>
      </div>

      <template v-if="!tags.length">
        <div py2 op50>
          { no tags yet }
        </div>
      </template>

      <template v-for="(tag, idx) in tags" :key="tag">
        <div
          class="slide-enter"
          :style="{
            '--enter-stage': idx + 1,
            '--enter-step': '60ms',
          }"
        >
          <!-- 标签头部 -->
          <div class="item block font-normal mb-3 mt-4 no-underline cursor-pointer" @click="toggleTag(tag)">
            <li class="no-underline" flex="~ col md:row gap-3 md:items-center">
              <div class="title text-xl leading-1.2em" flex="~ gap-3 wrap items-center">
                <span
                  :class="isTagExpanded(tag) ? 'i-ri:arrow-down-s-line' : 'i-ri:arrow-right-s-line'"
                  align-middle op50 flex-none transition-transform duration-200 text-lg
                />
                <span align-middle class="tag-name font-medium">{{ tag }}</span>
              </div>

              <div flex="~ gap-2 items-center">
                <span
                  align-middle op50 flex-none
                  i-ri:price-tag-3-line
                  title="Tag"
                />
                <span text-sm op50 ws-nowrap>
                  {{ getTagCount(tag) }} {{ getTagCount(tag) === 1 ? 'post' : 'posts' }}
                </span>
              </div>
            </li>
          </div>

          <!-- 文章列表 -->
          <Transition name="posts-list">
            <div
              v-if="isTagExpanded(tag)"
              class="ml-8 mb-6 border-l-2 border-gray-200 dark:border-gray-700 pl-6"
            >
              <div
                v-for="(post, postIdx) in getPostsByTag(tag)"
                :key="post.route"
                class="mb-4 slide-enter"
                :style="{
                  '--enter-stage': postIdx + 1,
                  '--enter-step': '40ms',
                }"
              >
                <RouterLink
                  :to="post.path"
                  class="block no-underline hover:opacity-80 transition-opacity"
                >
                  <div class="text-base font-medium mb-2">
                    {{ post.title }}
                  </div>
                  <div class="text-sm opacity-60 flex items-center gap-2 mb-1">
                    <span>{{ formatDate(post.date, true) }}</span>
                    <span v-if="post.duration">· {{ post.duration }}</span>
                  </div>
                  <div v-if="post.description" class="text-sm opacity-50">
                    {{ post.description }}
                  </div>
                </RouterLink>
              </div>
            </div>
          </Transition>
        </div>
      </template>
    </ul>

    <div v-else py2 op50>
      { loading tags... }
    </div>
  </div>
</template>

<style scoped>
.slide-enter {
  --enter-stage: 0;
  --enter-step: 120ms;
  --enter-initial: 0ms;
  animation: slide-enter 0.6s both 1;
  animation-delay: calc(var(--enter-initial) + var(--enter-stage) * var(--enter-step));
}

@keyframes slide-enter {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.item {
  transition: all 0.3s ease;
}

.item:hover {
  opacity: 0.8;
}

.tag-name {
  transition: color 0.2s ease;
}

.item:hover .tag-name {
  color: var(--c-text);
}

/* 文章列表展开动画 */
.posts-list-enter-active,
.posts-list-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.posts-list-enter-from,
.posts-list-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.posts-list-enter-to,
.posts-list-leave-from {
  opacity: 1;
  max-height: 1000px;
  transform: translateY(0);
}

/* 箭头旋转动画 */
.arrow-icon {
  transition: transform 0.2s ease;
}

.arrow-icon.expanded {
  transform: rotate(90deg);
}
</style>
