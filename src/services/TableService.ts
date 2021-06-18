/**
 * This file is part of YourDLT Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import { TableField } from '../types/TableField'
import { TableFilteringOptions } from '../types/TableFilteringOptions'
import { TableSortingOptions } from '../types/TableSortingOptions'

/**
 * Table actions
 * @export
 * @type {TableAction}
 */
export type TableAction = {
  id: string;
  label: string;
  icon: string;
};

/**
 * Table service to handle tabled data
 * @export
 * @class {TableService}
 */
export class TableService {
  constructor(
    protected readonly rows: any[],
    protected readonly fields: TableField[]
  ) {}

  /**
   * Return table fields to be displayed in a table header
   * @returns {TableField[]}
   */
  public getTableFields(): TableField[] {
    return this.fields;
  }

  /**
   * Return table values to be displayed in a table rows
   * @returns {any}
   */
  public getTableRows(): any[] {
    // - get reactive rows data from the store
    // - filter out rows that are not yet available
    return this.rows.map((currentRow) => ({ ...currentRow })).filter((x) => x);
  }

  /**
   * Filter table rows according to filtering options
   * @param {TableRowValues[]} values
   * @param {TableFilteringOptions} filterBy
   * @returns {TableRowValues[]}
   */
  public filter(values: any[], filter: TableFilteringOptions): any[] {
    if (filter.filteringType === "show") {
      return values;
    }

    if (filter.fieldName === "expiration") {
      return values.filter(({ expiration }) => expiration !== "expired");
    }

    if (filter.fieldName === "expired") {
      return values.filter((value) => "expired" in value && value.expired);
    }

    throw new Error(
      `TableService: Sorting by '${filter.fieldName}' field is not yet implemented`
    );
  }

  /**
   * Sorts array values according to sorting options
   * @param {TableRowValues[]} valuesToSort
   * @param {TableSortingOptions} sortBy
   * @returns {TableRowValues[]}
   */
  public sort(valuesToSort: any[], options: TableSortingOptions): any[] {
    const values = [...valuesToSort];

    function sortingMethodChooser(sortedValues) {
      if (options.direction === "desc") {
        return sortedValues.reverse();
      }
      return sortedValues;
    }

    if (!values.length) {
      return values;
    }

    // - use sample to identify fields type
    const sampleValue = [...values][0][options.fieldName];

    if (sampleValue === undefined) {
      return values;
    }

    // - sorting method depends on type
    if ("string" === typeof sampleValue) {
      return sortingMethodChooser(
        [...values].sort((a, b) => {
          return a[options.fieldName]
            .toLowerCase()
            .localeCompare(
              b[options.fieldName].toLowerCase(),
              navigator.languages[0] || navigator.language,
              {
                numeric: true,
                ignorePunctuation: true,
              }
            );
        })
      );
    } else if ("boolean" === typeof sampleValue) {
      return sortingMethodChooser(
        [...values].sort((a, b) => {
          return a[options.fieldName] === b[options.fieldName]
            ? 0
            : a[options.fieldName]
            ? -1
            : 1;
        })
      );
    } else if ("number" === typeof sampleValue) {
      return sortingMethodChooser(
        values.sort((a, b) => {
          if (!b[options.fieldName] || !a[options.fieldName]) {
            return 1;
          }
          return b[options.fieldName] - a[options.fieldName];
        })
      );
    }

    throw new Error(
      `TableService: Sorting the data type ${typeof sampleValue} is not supported`
    );
  }
}
