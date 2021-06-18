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
import { TableAction } from "@/types/TableAction";
import { TableField } from "@/types/TableField";
import { TableService } from "@/services/TableService";
import { TableSortingOptions } from "@/types/TableSortingOptions";
import { SortingDirections } from "@/types/SortingDirections";

// child components
// @ts-ignore
import GenericTableRow from "@/components/GenericTableDisplay/GenericTableRow/GenericTableRow.vue";
// @ts-ignore
import IconButton from "@/components/IconButton/IconButton";
// @ts-ignore
import ButtonRefresh from "@/components/ButtonRefresh/ButtonRefresh";

@Component({
  components: {
    GenericTableRow,
    IconButton,
    ButtonRefresh,
  },
})
export class GenericTableDisplay extends Vue {
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
    default: {
      fieldName: undefined,
      direction: undefined,
    },
  })
  public sortedBy: TableSortingOptions;

  /**
   * Table action buttons.
   * @var {TableAction[]}
   */
  @Prop({ default: [] }) public actionButtons: TableAction[];

  /**
   * The *unfiltered* items that will be displayed (rows).
   * @type {string}
   */
  @Prop({ default: null }) public items: any[];

  /**
   * The table fields (columns)
   * @type {string}
   */
  @Prop({ default: [] }) public fields: TableField[];

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
  get displayedValues(): any[] {
    return this.getService().sort(this.tableRows, this.sortedBy);
  }

  /**
   * Header fields displayed in the table
   * @readonly
   * @return {TableField[]}
   */
  get tableFields(): TableField[] {
    return this.getService().getTableFields();
  }

  /**
   * Get current page rows
   * @readonly
   * @return {TableRowValues[]}
   */
  get currentPageRows(): any[] {
    return this.displayedValues.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }
  /// end-region getters and setters

  /**
   * Hook called when the component is created
   * @return {void}
   */
  public async created(): Promise<void> {
    // refresh owned assets
    this.refresh();
    // await this.refresh()
    this.setDefaultSorting();
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
   * Sets the default sorting state and trigger it
   */
  public setDefaultSorting(): void {
    const defaultSort = "asc";
    const defaultField = "name";

    Vue.set(this, "sortedBy", {
      fieldName: defaultField,
      direction: defaultSort,
    });

    this.setSortedBy(defaultField);
  }

  /**
   * Sorts the table data
   * @param {TableFieldNames} fieldName
   */
  public setSortedBy(fieldName: string): void {
    const sortedBy = { ...this.sortedBy };
    const direction: SortingDirections =
      sortedBy.fieldName === fieldName && sortedBy.direction === "asc"
        ? "desc"
        : "asc";

    Vue.set(this, "sortedBy", { fieldName, direction });
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
