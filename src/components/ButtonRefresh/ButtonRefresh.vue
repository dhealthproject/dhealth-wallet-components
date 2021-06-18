<template>
  <Tooltip :content="tooltip" placement="top" :transfer="true">
    <Icon type="md-refresh" class="button-refresh" @click="$emit('click')" />
  </Tooltip>
</template>
<script lang="ts">
import { ButtonRefresh } from "./ButtonRefresh";
export default class ButtonRefreshComponent extends ButtonRefresh {}
</script>
<style lang="less" scoped>
@import "./ButtonRefresh.less";
</style>
