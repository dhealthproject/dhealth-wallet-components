/**
 * This file is part of dHealth Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import { SortingDirections } from "./SortingDirections";

/**
 * Sorting options
 * @export
 * @type {TableSortingOptions}
 */
export type TableSortingOptions = {
  fieldName: string;
  direction: SortingDirections;
};
