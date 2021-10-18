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
  <span class="amount-display-container">
    <span :class="['integer-part']">{{ integerPart }}</span>
    <span :class="['fractional-part']">{{ fractionalPart }}</span>
    <span v-if="showTicker" :class="['ticker']"
      >&nbsp;({{ displayedTicker }})</span
    >
  </span>
</template>

<script lang="ts" src="./AmountDisplay.ts"></script>

<style lang="less" scoped>
.amount-display-container {
  .integer-part {
    opacity: 1;
  }
  .fractional-part {
    opacity: 0.4;
  }
}
</style>
