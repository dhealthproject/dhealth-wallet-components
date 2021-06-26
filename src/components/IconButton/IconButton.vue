<template>
  <button
    type="button"
    :class="{
      'icon-button button-style entered-button inverted-button normal': true,
      'submit-button': !!title,
    }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <Icon :type="icon" :size="size" />
    <span v-if="title" class="button-title">{{ title }}</span>
  </button>
</template>

<script lang="ts" src="./IconButton.ts"></script>

<style lang="less" scoped>
@import "./IconButton.less";
</style>
