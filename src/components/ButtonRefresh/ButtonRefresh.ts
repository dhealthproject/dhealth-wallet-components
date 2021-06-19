/**
 * This file is part of YourDLT Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ButtonRefresh extends Vue {
  /**
   * Whether data is still loading
   * @type {boolean}
   */
  @Prop({ default: "Refresh" }) public tooltip: string;
}
