/**
 * This file is part of dHealth Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import { Vue, Component, Prop } from "vue-property-decorator";
import { Icon, Tooltip } from "view-design";

// internal dependencies
import { UIHelpers } from "@/helpers/UIHelpers";

@Component({
  components: {
    Icon,
    Tooltip,
  },
})
export default class ButtonCopy extends Vue {
  /**
   * The tooltip of the button.
   * @type {boolean}
   */
  @Prop({ default: "Copy" }) public tooltip: string;

  /**
   * The text that will be copied.
   * @type {boolean}
   */
  @Prop({ default: null }) value: string;

  /// region component methods
  /**
   * Handler function to copy text to clipboard.
   *
   * @returns {void}
   */
  protected copy() {
    if (!this.value) {
      return ;
    }

    try {
      UIHelpers.copyToClipboard(this.value);
      this.$emit('click');
    }
    catch(e) {
      console.log("Error copyToClipboard: ", e);
    }
  }
  /// end-region component methods
}
