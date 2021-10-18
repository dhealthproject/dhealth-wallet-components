/**
 * This file is part of dHealth Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
/**
* Network service to handle network distinctions.
* @export
* @class {NetworkService}
*/
export class NetworkService {
  /**
   * A list of trusted network.
   * @var {{[networkSpec: string]: string}}
   */
  public static readonly TRUSTED_NETWORK: {[networkSpec: string]: string} = {
    'mainnet:symbol.xym': '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6',
    'mainnet:dhealth.dhp': 'ED5761EA890A096C50D3F50B7C2F0CCB4B84AFC9EA870F381E84DDE36D04EF16',
    'testnet:dhealth.dhp': 'F1DE7701FF17DA20904565FA9753690A9990D3B00730A241FFFB7F60C2B5D638',
  }
}
