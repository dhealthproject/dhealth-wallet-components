/**
 * This file is part of dHealth Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// external dependencies
import { Component, Vue, Prop } from "vue-property-decorator";
import { Icon } from "view-design";

@Component({
  components: {
    Icon,
  },
})
export default class IconButton extends Vue {
  @Prop({ default: false }) disabled: boolean;
  @Prop({ default: undefined }) title: string;
  /**
   * @link https://github.com/view-design/ViewUI/blob/master/examples/routers/icon.vue#L11
   **/
  @Prop({ default: "md-add-circle" }) icon: string;
  @Prop({ default: undefined }) size: string;
}
