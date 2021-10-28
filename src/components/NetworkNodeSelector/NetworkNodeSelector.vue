<!--

 This file is part of dHealth Wallet Components shared under LGPL-3.0
 Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom

 @package     dHealth Wallet Components
 @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 @license     LGPL-3.0

-->
<template>
  <div class="network-node-selector-container">
    <FormRow class-name="node-url-container">
      <template v-slot:label>Node URL: </template>
      <template v-slot:inputs>
        <div class="inputs-container">
          <AutoComplete
            ref="nodeUrlInput"
            v-model="formItems.host"
            name="endpoint"
            class="auto-complete-size auto-complete-style"
            placeholder="Enter a node URL"
            placement="bottom"
            :clearable="true"
            :disabled="disabled"
            @on-select="onSelect"
            @on-clear="onClear"
            @on-change="onChange"
          >
            <div v-if="showPeersList" class="auto-complete-sub-container scroll">
              <div v-if="!nodeExistsInList" class="custom-node-input-container">
                <button class="select-button" @click="onSelect(formItems.host)">Select this node</button>
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
      </template>
    </FormRow>
    <FormRow v-if="shouldDisplayPublicKey" class-name="publickey-container">
      <template v-slot:label>Public Key: </template>
      <template v-slot:inputs>
        <div class="inputs-container publickey-input-container">
          <input
            v-model="formItems.nodePublicKey"
            class="input-size input-style"
            placeholder="Waiting for input of node URL"
            type="text"
            disabled="disabled"
          />
        </div>
      </template>
    </FormRow>
    <FormRow v-if="!!lastError && lastError.length > 0" class-name="error-container">
      <template v-slot:inputs>
        <div class="inputs-container errormsg-container">
          <p>{{ lastError }}</p>
        </div>
      </template>
    </FormRow>
  </div>
</template>
<script lang="ts" src="./NetworkNodeSelector.ts"></script>

<style lang="less" scoped>
@import "./NetworkNodeSelector.less";
</style>
