
<p align="center"><img src="https://dhealth.network/wp-content/uploads/2021/01/dHealth-Network-Logo-color-change.png"></p>

# dHealth Wallet Components

[![npm-badge][npm-badge]][npm-url]
[![dl-badge][dl-badge]][npm-url]
[![License](https://img.shields.io/badge/License-LGPL%203.0%20only-blue.svg)](https://opensource.org/licenses/LGPL-3.0)

dHealth Wallet Components is a Vue components library to permit the development of *plugins* for [dHealth Wallet][parent-url]. This library exports important components such as `IconButton` or `GenericTableDisplay` that are customizable through a LESS `theme.css`.

- [Components found here](#components-found-here)
- [Licensing](#license)

## Components found here

Following components are defined and exported with this library:

| Class | Description |
| --- | --- |
| `AmountDisplay` | Mixin that displays a customizable mosaic amount. |
| `ButtonAdd` | Mixin that displays an add button using a font-awesome icon. |
| `ButtonCopy` | Mixin that displays a copy to clipboard button using a font-awesome icon. |
| `ButtonRefresh` | Mixin that displays a refresh button using a font-awesome icon. |
| `ButtonRemove` | Mixin that displays a remove button using a font-awesome icon. |
| `ErrorTooltip` | Mixin that displays a moveable tooltip. |
| `FormLabel` | Mixin that displays a label container. |
| `FormRow` | Mixin that wraps a form row with label (if necessary). |
| `FormTitle` | Mixin that displays a bordered form title (legend). |
| `FormWrapper` | Mixin that wraps a complete form. |
| `GenericTableDisplay` | Mixin that formalizes the display of lists and tabled data. |
| `GenericTableRow` | Mixin that formalizes the display of rows in generic tables. |
| `IconButton` | Mixin that displays a button with a font-awesome icon. |
| `IconLoading` | Mixin that displays a spinning loading icon. |
| `NavigationLinks` | Mixin that displays list of navigation links horizontally or vertically. |
| `NetworkNodeSelector` | Mixin that permits to input a node URL and checks for its information. |
| `QRCode` | Mixin that displays a QR Code that contains custom content (AccountQR, ContactQR, TransactionQR). |

## License

Copyright 2021-present [Grégory Saive for dHealth Network][ref-ltd], All rights reserved.

Licensed under the [LGPL v3.0](LICENSE)

This project is sponsored by [UBC Digital Magazine][mag-url].

[ref-ltd]: https://dhealth.network
[mag-url]: https://ubc.digital
[parent-url]: https://github.com/dhealthproject/dhealth-wallet
[npm-url]: https://www.npmjs.com/package/@dhealth/wallet-components
[npm-badge]: https://img.shields.io/npm/v/@dhealth/wallet-components
[dl-badge]: https://img.shields.io/npm/dt/@dhealth/wallet-components
