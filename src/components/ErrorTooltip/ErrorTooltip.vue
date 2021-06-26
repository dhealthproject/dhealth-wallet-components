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
  <Tooltip
    :content="displayedError"
    :placement="placementOverride"
    :always="errored"
    :disabled="!errored"
  >
    <slot />
  </Tooltip>
</template>
<script lang="ts" src="./ErrorTooltip.ts"></script>
