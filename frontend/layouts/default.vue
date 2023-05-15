<template>
  <div :class="$style.default">
    <AppHeader />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import AppHeader from '~/components/layouts/AppHeader.vue'
</script>;

<style lang="scss" module>
  .default {
    height: 100vh;
  }
</style>
