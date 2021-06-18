<template>
  <span class="amount-display-container">
    <span :class="['integer-part']">{{ integerPart }}</span>
    <span :class="['fractional-part']">{{ fractionalPart }}</span>
    <span v-if="showTicker" :class="['ticker']"
      >&nbsp;({{ displayedTicker }})</span
    >
  </span>
</template>

<script lang="ts">
import { AmountDisplayMixin } from "./AmountDisplayMixin";

export default class AmountDisplay extends AmountDisplayMixin {}
</script>

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
