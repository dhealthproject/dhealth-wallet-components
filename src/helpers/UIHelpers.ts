/**
 * This file is part of dHealth Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
/**
 * Helpers class with DOM management functions.
 * @export
 * @class {UIHelpers}
 */
export class UIHelpers {
  /**
   * Helper method to copy text to clipboard
   * @param {string} text
   * @return {boolean}
   */
  public static copyToClipboard(text: string): boolean {
    try {
      // create ghost element
      const input = document.createElement('input');
      input.setAttribute('readonly', 'readonly');
      input.setAttribute('value', text);
      document.body.appendChild(input);

      // use DOM commands
      input.select();
      document.execCommand('copy');

      // flush
      document.body.removeChild(input);
      return true;
    }
    catch (e) {
      return false;
    }
  }

  /**
   * Helper method to download byte array as a file
   *
   * @param {Uint8Array | string} bytes Byte array to be downloaded as a file
   * @param {string} fileName
   * @param {string} fileMimeType
   * @return {Observable<boolean>}
   */
  public static downloadBytesAsFile(bytes: Uint8Array | string, fileName: string, fileMimeType: string): Promise<boolean> {
    return new Promise((resolve) => {
      const blob = new Blob([bytes], {
        type: fileMimeType,
      });
      const url = window.URL.createObjectURL(blob);

      // - create link (<a>)
      const a = document.createElement('a');
      const event = new MouseEvent('click');
      a.download = fileName;
      a.href = url;
      // - start download
      a.dispatchEvent(event);
      resolve(true);
    });
  }
};
