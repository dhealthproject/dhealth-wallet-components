/**
 * This file is part of dHealth Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// external dependencies
const axios = require('axios').default;

// internal dependencies
import { HttpService } from './HttpService';
import { NodeModel } from '../models/NodeModel';

/**
 * Node service to handle remote calls 
 * @export
 * @class {NodeService}
 */
export class NodeService extends HttpService {
  constructor() {
    super();
  }

  /**
   * Connects to a node by \a nodeUrl and requests
   * node information using endpoint `/node/info`.
   *
   * @param   {string}  nodeUrl     The URL of the node.
   * @returns {Promise<NodeModel>}  Parsed JSON response as an object.
   */
  public getNodeInfo(
    nodeUrl: string,
  ): Promise<NodeModel> {
    return new Promise((resolve) => {
      this.__callAPI('get', nodeUrl, '/node/info').then(
        (rawPeer: any) => {
          return resolve(NodeModel.fromDTO(rawPeer));
        });
    });
  }

  /**
   * Connects to a node by \a nodeUrl and requests
   * node neighborhood using endpoint `/node/peers`.
   *
   * @param   {string}  nodeUrl       The URL of the node.
   * @returns {Promise<NodeModel[]>}  Parsed JSON response as an object.
   */
  public getNodePeers(
    nodeUrl: string,
  ): Promise<NodeModel[]> {
    return new Promise((resolve) => {
      this.__callAPI('get', nodeUrl, '/node/peers').then(
        (rawPeers: any) => {
          return resolve(rawPeers.map((p) => NodeModel.fromDTO(p)));
        });
    });
  }
}
