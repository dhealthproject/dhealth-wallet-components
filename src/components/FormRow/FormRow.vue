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
  <div :class="['form-row', className]">
    <div
      :class="{
        'form-row-inner-container': !noLabel,
        'form-row-inner-container-value-only': noLabel,
        'form-row-vertical': vertical,
      }"
    >
      <div v-if="!noLabel" class="label-container">
        <FormLabel>
          <slot name="label" />
        </FormLabel>
      </div>
      <div class="inputs-container">
        <slot name="inputs" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

// child components
import FormLabel from "@/components/FormLabel/FormLabel.vue";

@Component({ components: { FormLabel } })
export default class FormRow extends Vue {
  @Prop({ default: "emphasis" }) className: string;
  @Prop({ default: false }) noLabel: boolean;
  @Prop({ default: false }) vertical: boolean;
}
</script>

<style lang="less" scoped>
@import "./FormRow.less";
</style>
