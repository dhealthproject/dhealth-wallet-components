<!--
/**
 * This file is part of dHealth Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
-->
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
