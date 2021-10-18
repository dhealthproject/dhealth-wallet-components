/**
 * This file is part of dHealth Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// external dependencies
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

// internal dependencies
import { NodeType } from '@/types/NodeType';
import { NetworkIdentifier } from '@/types/NetworkIdentifier';
import { NodeService } from '@/services/NodeService';
import { NodeModel } from '@/models/NodeModel';

// child components
import { AutoComplete } from 'view-design';

// @ts-ignore
import FormWrapper from '@/components/FormWrapper/FormWrapper.vue';
// @ts-ignore
import FormRow from '@/components/FormRow/FormRow.vue';

@Component({
    components: {
        AutoComplete,
        FormWrapper,
        FormRow,
    },
})
export default class NetworkNodeSelectorTs extends Vue {
  /**
   * Which node types should be included in results.
   * @var {NodeType}
   */
  @Prop({ default: () => [NodeType.ApiNode] }) includeRoles: number[];

  /**
   * The currently selected node information.
   * @var {NodeModel}
   */
  @Prop() value: NodeModel;

  /**
   * Whether the selector should be disabled.
   * @var {boolean}
   */
  @Prop({ default: false }) disabled: boolean;

  /**
   * Whether the selector should display the node public key.
   * @var {boolean}
   */
  @Prop({ default: false }) withPublicKey: boolean;

  /**
   * The service for remote calls.
   * @var {NodeService}
   */
  protected nodeService: NodeService;

  /**
   * The list of known peers.
   * @var {NodeModel[]}
   */
  protected peerNodes: NodeModel[];

  /**
   * The regular expression used to match domain names / IPs.
   * @var {RegExp}
   */
  protected urlRegexp = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;

  /**
   * Form item values
   * @var {Object}
   */
  protected formItems = {
      nodeUrl: '',
      nodePublicKey: undefined,
      networkIdentifier: NetworkIdentifier.MAIN_NET,
      generationHash: 'ED5761EA890A096C50D3F50B7C2F0CCB4B84AFC9EA870F381E84DDE36D04EF16',
      networkInfo: 'mainnet:dhealth.dhp',
  };

  /**
   * Contains the last error message if any.
   * @var {string|undefined}
   */
  protected lastError: string = undefined;

  /**
   * Whether the selector is currently fetching details.
   * @var {boolean}
   */
  protected isFetchingNodeInfo: boolean = false;

  /**
   * Whether the selector should display the list of nodes.
   * @var {boolean}
   */
  protected showPeersList: boolean = false;

  /// region getters and setters
  /**
   * Get the list of nodes.
   * @returns {NodeModel[]}
   */
  protected get filteredNodes(): NodeModel[] {
    return !!this.peerNodes ? this.peerNodes : [];
  }

  /**
   * Whether the selector should display the public key.
   * @returns {boolean}
   */
  protected get shouldDisplayPublicKey(): boolean {
    return this.withPublicKey;
  }

  /**
   * Whether the current input exists in the peers list
   * @returns {boolean}
   */
  protected get nodeExistsInList(): boolean {
    return !!this.peerNodes && undefined !== this.peerNodes.find(
      (p: NodeModel) => p.host === this.formItems.nodeUrl
    )
  }
  /// end-region getters and setters

  /// region components methods
  /**
   * Hook called on creation of the Component (render).
   * @async
   */
  async created() {
    // shortcut
    this.nodeService = new NodeService();
    const nodeUrl = 'dual-01.dhealth.cloud';

    try {
      // fetches basic details
      await this.fetchNodeInformation(nodeUrl);

      // fetch peers neighborhood
      this.peerNodes = await this.nodeService.getNodePeers(nodeUrl);
    }
    catch (e) {
      this.lastError = `Could not connect to node ${nodeUrl}. Reason: ${e.toString()}`;
    }
  }

  /**
   * Fetches information about the selected node.
   * @async
   * @returns {Promise<void>}
   */
  async fetchNodeInformation(value) {
    if (!value) {
      return '';
    }

    // updates component state
    this.isFetchingNodeInfo = true;
    this.showPeersList = false;

    try {
      // does the actual request
      const nodeInfo: any = await this.nodeService.getNodeInfo(value);

      // fills in necessary form items
      this.formItems.nodeUrl = value;
      this.formItems.nodePublicKey = nodeInfo.nodePublicKey;
      this.formItems.generationHash = nodeInfo.networkGenerationHashSeed;
      this.formItems.networkIdentifier = parseInt(nodeInfo.networkIdentifier);
    }
    catch (e) {}

    // updates component state
    this.isFetchingNodeInfo = false;
  }

  /**
   * Event handler for the selection of nodes (after input).
   * @param   {string}    value 
   * @returns {void}
   */
  protected async onSelect(value) {
    // validates host format
    if (!this.urlValidator(value)) {
      this.showPeersList = true;

      // no HTTP request until we have a valid hostname
      return ;
    }

    // requests node information using REST
    try {
      await this.fetchNodeInformation(value);
      this.$emit('input', this.formItems);
    }
    catch (e) {
      // input may be a custom node
      this.showPeersList = true;
    }
  }

  /**
   * Event handler for clearing the input field.
   * @returns {void}
   */
  protected onClear() {
    this.$emit('input', { nodePublicKey: '' });
  }

  /**
   * Validator for URL input field.
   * @param   {string}    url
   * @returns {boolean} 
   */
  protected urlValidator(url: string): boolean {
    const reg = new RegExp(this.urlRegexp);
    return !!url && url.length && reg.test(url);
  }
  /// end-region components methods
}
