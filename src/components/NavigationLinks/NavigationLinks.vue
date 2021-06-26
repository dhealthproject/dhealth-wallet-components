<!--
/**
 * This file is part of YourDLT Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
-->
<template>
  <div
    :class="[
      'symbol-tab-container',
      direction === 'horizontal' ? 'horizontal' : 'vertical',
    ]"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="
        direction === 'horizontal'
          ? ['empty']
          : [
              'symbol-tab-nav',
              index === currentItemIndex ? 'active-item' : 'inactive-item',
            ]
      "
    >
      <span
        :class="[
          'nav-item',
          index === currentItemIndex ? 'active-item' : 'inactive-item',
          index === 0 ? '' : 'border',
        ]"
        @click="$emit('selected', index)"
      >
        {{ item }}
      </span>
    </div>
  </div>
</template>
<script lang="ts" src="./NavigationLinks.ts"></script>

<style lang="less" scoped>
@import "./NavigationLinks.less";
</style>
