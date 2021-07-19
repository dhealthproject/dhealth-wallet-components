/**
 * This file is part of YourDLT Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// external dependencies
import { Component, Prop, Vue } from "vue-property-decorator";

// internal dependencies
import { TableAction } from "../../types/TableAction";
import { TableField } from "../../types/TableField";
import { TableService } from "../../services/TableService";
import { TableSortingOptions } from "../../types/TableSortingOptions";
import { SortingDirections } from "../../types/SortingDirections";

// child components
// @ts-ignore
import GenericTableRow from "./GenericTableRow/GenericTableRow.vue";
// @ts-ignore
import IconButton from "../IconButton/IconButton";
// @ts-ignore
import ButtonRefresh from "../ButtonRefresh/ButtonRefresh";

@Component({
  components: {
    GenericTableRow,
    IconButton,
    ButtonRefresh,
  },
})
export default class GenericTableDisplay extends Vue {
  /**
   * Pagination page size
   * @type {number}
   */
  @Prop({ default: 20 }) public pageSize: number = 20; // no-use-before-init

  /**
   * Current table sorting state
   * @var {TableSortingOptions}
   */
  @Prop({
    default() { 
      return {
        fieldName: 'name',
        direction: 'asc',
      };
    }
  })
  public sortedBy: TableSortingOptions;

  /**
   * Table action buttons.
   * @var {TableAction[]}
   */
  @Prop({ default() { return []; } }) public actionButtons: TableAction[];

  /**
   * The *unfiltered* items that will be displayed (rows).
   * @type {string}
   */
  @Prop({ default: null }) public items: any[];

  /**
   * The table fields (columns)
   * @type {string}
   */
  @Prop({ default() { return []; } }) public fields: TableField[];

  /**
   * Whether data is still loading
   * @type {boolean}
   */
  @Prop({ default: false }) public isLoading: boolean;

  /**
   * Whether data is still loading
   * @type {boolean}
   */
  @Prop({ default: undefined }) public refreshGetter: string;

  /**
   * Whether headers are disabled
   * @type {boolean}
   */
  @Prop({ default: false }) public disableHeaders: boolean;

  /**
   * Whether pagination is disabled if it has only one page.
   * @type {boolean}
   */
  @Prop({ default: false }) public disableSinglePageLinks: boolean;

  /**
   * Whether the auto-rows grid is disabled.
   * @type {boolean}
   */
  @Prop({ default: false }) public disableRowsGrid: boolean;

  /**
   * Whether the auto-rows grid is disabled for the placeholder.
   * @type {boolean}
   */
  @Prop({ default: false }) public disablePlaceholderGrid: boolean;

  /**
   * Pagination page number
   * @type {number}
   */
  public currentPage: number = 1;

  /**
   * And empty columns list with dynamic columns count. This
   * is used to display placeholder rows in the table.
   * @type {number[]}
   */
  public emptyColumns = [...new Array(this.pageSize).keys()];

  /**
   * allow custom sorting options
   * @protected
   * @type {TableSortingOptions}
   */
  protected customSortedBy: TableSortingOptions;

  /**
   * avoid multiple clicks
   * @protected
   * @param {string}
   * @return {void}
   */
  protected isRefreshing: boolean = false;

  /**
   * The current blockchain height
   * @private
   * @type {number}
   */
  private currentHeight: number;

  /// region getters and setters
  public get canRefresh(): boolean {
    return !!this.refreshGetter && !!this.refreshGetter.length;
  }

  /**
   * Non-filtered table data
   * @var {TableRowValues[]}
   */
  private get tableRows(): any[] {
    // first, check if we have direct "items"
    if (null !== this.items && this.items.length) {
      return this.items;
    }
    // second, check if we have an "items getter"
    // else if (!!this.itemsGetter && this.itemsGetter.length) {
    //     return this.$store.getters[this.itemsGetter];
    // }

    // Could not determine data source
    return [];
  }

  /**
   * Values displayed in the table
   * @readonly
   * @return {TableRowValues[]}
   */
  public get displayedValues(): any[] {
    return this.getService().sort(this.tableRows, this.sortingOptions);
  }

  /**
   * Header fields displayed in the table
   * @readonly
   * @return {TableField[]}
   */
  public get tableFields(): TableField[] {
    return this.getService().getTableFields();
  }

  /**
   * Get current page rows
   * @readonly
   * @return {TableRowValues[]}
   */
  public get currentPageRows(): any[] {
    return this.displayedValues.length
      ? this.displayedValues.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        )
      : [];
  }

  public get isPageable(): boolean {
    return (
      !this.disableSinglePageLinks ||
      this.displayedValues.length / this.pageSize > 1
    );
  }

  public get sortingOptions(): TableSortingOptions {
    return !!this.customSortedBy ? this.customSortedBy : this.sortedBy;
  }

  public set sortingOptions(opt: TableSortingOptions) {
    this.customSortedBy = opt;
  }
  /// end-region getters and setters

  /**
   * Hook called when the component is created
   * @return {void}
   */
  public async created(): Promise<void> {
    // refresh owned assets
    this.refresh();
  }

  /**
   * Instantiate the table service around {assetType}
   * @return {TableService}
   */
  protected getService(): TableService {
    return new TableService(this.items, this.fields);
  }

  /**
   * Refreshes the displayed data by calling the
   * store getter.
   * @returns {void}
   */
  private async refresh(): Promise<void> {
    if (!!this.refreshGetter) {
      //await this.$store.dispatch(this.refreshGetter);
      //XXX $pluginBus?
    }
  }

  /**
   * Sorts the table data
   * @param {TableFieldNames} fieldName
   */
  public setSortedBy(fieldName: string): void {
    const sortedBy = { ...this.sortingOptions };
    const direction: SortingDirections =
      sortedBy.fieldName === fieldName && sortedBy.direction === "asc"
        ? "desc"
        : "asc";

    Vue.set(this, "sortingOptions", { fieldName, direction });
  }

  /**
   * Handle pagination page change
   * @param {number} page
   */
  public handlePageChange(page: number): void {
    this.currentPage = page;
  }

  protected async onRefresh() {
    if (this.isRefreshing || !this.canRefresh) {
      return;
    }

    this.isRefreshing = true;
    try {
      await this.refresh();
    } catch (e) {
      console.log("Cannot refresh", e);
    }
    this.isRefreshing = false;
  }
}
