<script setup lang="ts">
import config from '~/config'

const { github, name } = config
</script>

<template>
  <div>
    <p>
      <a rel="noreferrer" :href="github" target="_blank">
        {{ name }}
      </a>
    </p>

    <div py-4 />

    <div>
      <button
        class="m-3 text-sm btn"
      >
        Go
      </button>
    </div>
  </div>
</template>
