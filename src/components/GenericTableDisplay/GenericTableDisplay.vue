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
  <div
    :class="{
      'table-container': true,
      'without-header': disableHeaders,
    }"
  >
    <!-- PRE-HEADER (ACTIONS) -->
    <div
      v-if="canRefresh || (!!actionButtons && actionButtons.length)"
      class="upper-section-container"
    >
      <div class="table-title-container section-title">
        <div class="user-operation">
          <!-- ACTION BUTTONS -->
          <div
            v-for="({ id, label, icon }, index) in actionButtons"
            :key="index"
            :class="['table-action-button-wrapper', `${name}-action-button`]"
          >
            <IconButton
              class="align-right"
              size="18"
              :icon="icon"
              :title="label"
              @click="$emit('on-clicked-action', id)"
            />
          </div>

          <!-- REFRESH BUTTON -->
          <ButtonRefresh v-if="canRefresh" @click="onRefresh" />
        </div>
      </div>
    </div>
    <!-- TABLE HEADER (COLUMN TITLES) -->
    <div v-if="!disableHeaders" class="table-header-container table-columns">
      <div
        v-for="({ name, label }, index) in tableFields"
        :key="index"
        :class="['table-header-item', `${name}-header`]"
        @click="setSortedBy(name)"
      >
        <span>{{ label }}</span>
        <Icon
          v-if="sortingOptions.fieldName === name"
          class="sort-icon"
          :type="
            sortingOptions.direction === 'asc'
              ? 'md-arrow-dropup'
              : 'md-arrow-dropdown'
          "
        />
      </div>
      <!-- Empty header for the action button column -->
      <div>&nbsp;</div>
    </div>
    <!-- TABLE BODY (COLUMN TITLES) -->
    <div class="table-body-container">
      <Spin v-if="isLoading" size="large" fix class="absolute" />
      <div
        v-show="displayedValues.length"
        v-infinite-scroll="false"
        infinite-scroll-disabled="true"
        infinite-scroll-distance="5"
        class="table-rows-outer-container"
      >
        <div
          class="table-rows-container"
          :class="{
            'without-grid': !!this.disableRowsGrid,
          }"
        >
          <slot name="rows" :items="currentPageRows">
            <GenericTableRow
              v-for="(rowValues, index) in items"
              :key="index"
              :row-values="rowValues"
              @on-remove="$emit('on-remove', rowValues)"
              @click="$emit('on-clicked-row', index)"
            />
          </slot>
        </div>
      </div>
      <div
        v-if="!isLoading && (!displayedValues || displayedValues.length === 0)"
        class="no-data-outer-container"
      >
        <div
          class="no-data-inner-container"
          :class="{
            'without-grid': !!this.disablePlaceholderGrid,
          }"
        >
          <slot name="empty" :items="emptyColumns">
            <div v-for="item in items" :key="item">
              &nbsp;
            </div>
          </slot>
        </div>
      </div>
    </div>

    <div v-if="isPageable" class="table-footer-container">
      <Page
        class="page"
        :total="displayedValues.length"
        :page-size="pageSize"
        @on-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./GenericTableDisplay.ts"></script>

<style lang="less" scoped>
@import "./GenericTableDisplay.less";
</style>
