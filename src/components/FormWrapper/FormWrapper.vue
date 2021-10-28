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
  <div ref="form" class="form-wrapper">
    <slot />
  </div>
</template>

<script lang="ts">
// external dependencies
import { Component, Vue } from "vue-property-decorator";

@Component
export default class FormWrapper extends Vue {
  public $refs!: {
    form: HTMLElement;
  };
}
</script>
