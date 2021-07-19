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
  <div class="table-row-container table-columns" @click="$emit('click')">
    <div
      v-for="(value, name, index) in visibleRowValues"
      :key="index"
      :class="['table-cell', `${name}-cell`]"
    >
      <div v-if="isAmountField(name)">
        <AmountDisplay :value="value" />
      </div>
      <div v-else-if="isLinkField(name)">
        <a class="trigger-link pointer" :href="value" target="_blank">
          <span>{{ name }}</span>
        </a>
      </div>
      <div v-else-if="isIconField(name)">
        <Icon :type="value" size="22" />
      </div>
      <div v-else>{{ value }}</div>
    </div>
    <div class="edit-icon-cell">
      <div v-if="showRemove" @click="$emit('on-remove', rowValues)">
        <Icon type="md-trash" class="edit-icon" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./GenericTableRow.ts"></script>

<style scoped lang="less">
/* @TODO GenericTableDisplay.less shouldn't be imported here*/
@import "../GenericTableDisplay.less";
@import "./GenericTableRow.less";
</style>
