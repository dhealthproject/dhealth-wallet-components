/**
 * This file is part of dHealth Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// internal dependencies
import { NodeType, getNodeTypesFromRoles } from '../types/NodeType';
import { NetworkIdentifier } from '../types/NetworkIdentifier';

/**
 * Model for network node information.
 * @type {NodeModel}
 */
export class NodeModel {
  constructor(
    public readonly host: string,
    public readonly friendlyName: string,
    public readonly networkIdentifier: NetworkIdentifier,
    public publicKey?: string,
    public nodePublicKey?: string,
    public version?: number,
    public roles?: NodeType[],
    public networkGenerationHashSeed?: string,
  ) {}

  /**
   * Factory to create a NodeModel instance from
   * its DTO representation.
   *
   * @see {NodeService.getNodePeers()}
   * @param     {any}   dto   The parsed JSON representation.
   * @returns   {NodeModel}
   */
  public static fromDTO(dto: any): NodeModel {
    return new NodeModel(
      'host' in dto ? dto['host'] : '',
      'friendlyName' in dto ? dto['friendlyName'] : '',
      'networkIdentifier' in dto ? dto['networkIdentifier'] : NetworkIdentifier.MAIN_NET,
      'publicKey' in dto ? dto['publicKey'] : undefined,
      'nodePublicKey' in dto ? dto['nodePublicKey'] : undefined,
      'version' in dto ? dto['version'] : undefined,
      'roles' in dto ? getNodeTypesFromRoles(dto['roles']) : undefined,
      'networkGenerationHashSeed' in dto ? dto['networkGenerationHashSeed'] : undefined,
    )
  }
};
