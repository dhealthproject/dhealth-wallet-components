/**
 * This file is part of YourDLT Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// external dependencies
import { Component, Prop, Vue } from "vue-property-decorator";

// child components
// @ts-ignore
import AmountDisplay from "@/components/AmountDisplay/AmountDisplay.vue";

@Component({
  components: {
    AmountDisplay,
  },
})
export class GenericTableRow extends Vue {
  /**
   * Type of assets shown in the table
   * @type {any}
   */
  @Prop({ default: {} }) rowValues: any;

  /**
   * Whether to show the "remove" button
   * @type {boolean}
   */
  @Prop({ default: false }) showRemove: boolean;

  /** Returns only visible values of a row */
  protected get visibleRowValues() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hiddenData, ...visible } = this.rowValues;
    return visible;
  }

  public isAmountField(field: string) {
    return ["amount", "balance"].includes(field);
  }

  public isLinkField(field: string) {
    return ["homepage", "repository"].includes(field);
  }
}
