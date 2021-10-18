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
  <div class="qr-code">
    <img
      :src="qrCodeBase64$"
      alt="Your digital contract QR Code"
      style="height: 200px; margin: auto;"
      @click="dumpJSON"
    />

    <span v-if="showDownload" class="qr-code-footer">
      <a :href="qrCodeBase64$" :download="downloadName">{{ "Download" }}</a>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { QRCode as BaseQR } from "symbol-qr-library";
import _ from "lodash";

@Component({
  watch: {
    qrCode(observable, oldValue) {
      this.debouncedToBase64();
    },
  },
})
export default class QRCode extends Vue {
  @Prop({ default: "digital_contract_qrcode.png" }) downloadName: string;
  @Prop({ default: true }) showDownload: boolean;
  @Prop({ default: null }) qrCode: BaseQR;

  protected qrCodeBase64$: string = "Unknown";
  protected debouncedToBase64: any = undefined;

  /// region component methods
  public created() {
    this.debouncedToBase64 = _.debounce(this.getBase64, 200);
  }

  public dumpJSON() {
    console.log(this.qrCode?.toJSON());
  }

  public getBase64() {
    const vm = this;
    this.qrCode
      .toBase64()
      .toPromise()
      .then((base64) => (vm.qrCodeBase64$ = base64))
      .catch((err) => console.log("Error in getBase64: ", err));
  }
  /// endregion component methods
}
</script>
