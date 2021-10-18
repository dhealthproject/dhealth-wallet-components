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
  <FormRow class-name="emphasis">
    <template v-slot:label>Node URL: </template>
    <template v-slot:inputs>
      <div class="inputs-container">
        <AutoComplete
          ref="nodeUrlInput"
          v-model="formItems.nodeUrl"
          name="endpoint"
          class="auto-complete-size auto-complete-style"
          placeholder="Enter a node URL"
          placement="bottom"
          :clearable="true"
          :disabled="disabled"
          @on-select="onSelect"
          @on-clear="onClear"
          @on-change="onSelect"
        >
          <div v-if="showPeersList" class="auto-complete-sub-container scroll">
            <div v-if="!nodeExistsInList" class="custom-node-input-container">
              <button class="select-button" @click="onSelect(formItems.nodeUrl)">Select this node</button>
            </div>
            <div v-for="(node, index) in filteredNodes" :key="index">
              <Option :value="node.host" :label="node">
                <span>{{ node.host }} ({{ node.friendlyName }})</span>
              </Option>
            </div>
          </div>
        </AutoComplete>
        <Icon v-if="isFetchingNodeInfo" type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
      </div>
      <div v-if="shouldDisplayPublicKey" class="inputs-container publickey-input-container">
        <input
          v-model="formItems.nodePublicKey"
          class="input-size input-style"
          placeholder="Waiting for input of node URL"
          type="text"
          disabled="disabled"
        />
      </div>
      <div v-if="!!lastError && lastError.length > 0" class="inputs-container errormsg-container">
        <p>{{ lastError }}</p>
      </div>
    </template>
  </FormRow>
</template>
<script lang="ts" src="./NetworkNodeSelector.ts"></script>

<style lang="less" scoped>
@import "./NetworkNodeSelector.less";
</style>
