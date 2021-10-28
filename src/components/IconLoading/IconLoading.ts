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
export default class IconLoading extends Vue {
  @Prop({ default: '18' }) size: string;
}
