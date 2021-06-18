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

@Component({})
export class AmountDisplayMixin extends Vue {
  @Prop({ default: 0 }) value: number;

  @Prop({ default: undefined }) decimals: number | undefined;

  @Prop({ default: false }) showTicker: false;

  @Prop({ default: "" }) ticker: string;

  /// region computed properties getter/setter
  get integerPart(): string {
    return this.value >= 0
      ? Math.floor(this.value).toLocaleString()
      : "-" + Math.floor(this.value * -1).toLocaleString();
  }

  get fractionalPart(): string {
    const absoluteValue = Math.abs(this.value);
    const rest = absoluteValue - Math.floor(absoluteValue);
    const decimals = this.decimals === undefined ? 6 : this.decimals;
    const formatOptions = {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    };
    // remove leftmost 0 and rightmost 0s
    return rest.toLocaleString(undefined, formatOptions).replace(/^0/, "");
  }

  /**
   * Ticker displayed in the view
   * @readonly
   * @type {string}
   */
  get displayedTicker(): string {
    return (this.showTicker && this.ticker) || "";
  }

  /// end-region computed properties getter/setter
}
