/**
 * This file is part of YourDLT Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class ErrorTooltip extends Vue {
  /**
   * Tooltip placement
   * @type {string}
   */
  @Prop({ default: "top-end" }) placementOverride!: string;

  /**
   * Errors returned by the Validation Provider
   * @type {string[]}
   */
  @Prop() errors!: string[];

  /**
   * Error message shown in the tooltip
   * @var {string}
   */
  displayedError = "";

  /**
   * The string of the first error message
   * @readonly
   * @type {string}
   */
  get fieldError(): string | null {
    if (!this.errors) {
      return null;
    }
    if (!this.errors.length) {
      return null;
    }
    return this.errors.shift() || null;
  }

  /**
   * Errored state
   * @readonly
   * @type {boolean}
   */
  get errored(): boolean {
    return this.fieldError !== null;
  }

  /**
   * Sets the string shown in the tooltip
   * (To avoid an ugly-looking behaviour,
   * it must not switch to a falsy value or an empty string)
   * @param {string} newValue
   */
  @Watch("fieldError", { immediate: true })
  onFieldErrorChanged(newValue: string) {
    if (newValue && newValue !== "") {
      this.displayedError = newValue;
    }
  }
}
