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
  <Tooltip :content="tooltip" placement="top" :transfer="true">
    <Icon type="md-copy" class="button-copy" @click="copy()" />
  </Tooltip>
</template>

<script lang="ts" src="./ButtonCopy.ts"></script>

<style lang="less" scoped>
@import "./ButtonCopy.less";
</style>
