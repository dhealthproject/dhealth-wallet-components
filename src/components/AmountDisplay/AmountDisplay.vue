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
import { AmountDisplay } from "./AmountDisplay";

export default class AmountDisplayComponent extends AmountDisplay {}
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
