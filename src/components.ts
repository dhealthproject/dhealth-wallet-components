/**
 * This file is part of YourDLT Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import Vue, { VueConstructor } from "vue";

/// region setup Vue
import infiniteScroll from "vue-infinite-scroll";
import iView from "view-design";
import locale from "view-design/dist/locale/en-US";
import "view-design/dist/styles/iview.css";
Vue.use(iView, { locale });
Vue.use(infiniteScroll);
/// end-region setup Vue

/// region services
export { FilteringTypes } from "./types/FilteringTypes";
export { SortingDirections } from "./types/SortingDirections";
export { TableAction } from "./types/TableAction";
export { TableField } from "./types/TableField";
export { TableFilteringOptions } from "./types/TableFilteringOptions";
export { TableSortingOptions } from "./types/TableSortingOptions";
export { TableService } from "./services/TableService";
/// end-region services

/// region components
// @ts-ignore
import ButtonRefresh from "./components/ButtonRefresh/ButtonRefresh.vue";
// @ts-ignore
import IconButton from "./components/IconButton/IconButton.vue";
// @ts-ignore
import AmountDisplay from "./components/AmountDisplay/AmountDisplay.vue";
// @ts-ignore
import NavigationLinks from "./components/NavigationLinks/NavigationLinks.vue";
// @ts-ignore
import GenericTableDisplay from "./components/GenericTableDisplay/GenericTableDisplay.vue";
// @ts-ignore
import GenericTableRow from "./components/GenericTableDisplay/GenericTableRow/GenericTableRow.vue";
// @ts-ignore
import FormLabel from "./components/FormLabel/FormLabel.vue";
// @ts-ignore
import FormRow from "./components/FormRow/FormRow.vue";
// @ts-ignore
import FormTitle from "./components/FormTitle/FormTitle.vue";
// @ts-ignore
import FormWrapper from "./components/FormWrapper/FormWrapper.vue";
// @ts-ignore
import ErrorTooltip from "./components/ErrorTooltip/ErrorTooltip.vue";
// @ts-ignore
import QRCode from "./components/QRCode/QRCode.vue";

const components: { [s: string]: VueConstructor } = {
  AmountDisplay,
  ButtonRefresh,
  ErrorTooltip,
  FormLabel,
  FormRow,
  FormTitle,
  FormWrapper,
  GenericTableDisplay,
  GenericTableRow,
  IconButton,
  NavigationLinks,
  QRCode,
};

export const registerComponents = (): { [s: string]: VueConstructor } => {
  Object.keys(components).forEach((k) => Vue.component(k, components[k]));
  return components;
};

export {
  AmountDisplay,
  ButtonRefresh,
  ErrorTooltip,
  FormLabel,
  FormRow,
  FormTitle,
  FormWrapper,
  GenericTableDisplay,
  GenericTableRow,
  IconButton,
  NavigationLinks,
  QRCode,
};
/// end-region components
