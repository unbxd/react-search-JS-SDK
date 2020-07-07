# react-search-JS-SDK
React SDK for building search experience with Unbxd.

## Getting started

Install `react-search-sdk` using npm.

```shell
npm i @unbxd-ui/react-search-sdk --save
```

or using yarn 

```shell
yarn add @unbxd-ui/react-search-sdk
```

Following is the example of usage:
```js

// The wrapper search component
import UnbxdSearchWrapper from '@unbxd-ui/react-search-sdk';

// Search components ship with basic presentational styles as well. 
// They are optional, but if you want them you will need to also import the CSS file.
// This only needs to be done once; probably during your application's bootstrapping process.
import '@unbxd-ui/react-search-sdk/public/dist/css/core.css';

// You can import any component you want as a named export from 'react-search-sdk'
import {Products, Pagination, Sort} from '@unbxd-ui/react-search-sdk';

// Now you can use 
<UnbxdSearchWrapper {...props} >
    <Products {...props} />
    <Pagination {...props} />
    <Sort {...props} />
</UnbxdSearchWrapper>

```

Now you're ready to start using the components.
You can learn more about which components react-search-sdk has to offer [below](#documentation).

## Dependencies

react-search-sdk has very few dependencies and most are managed by NPM automatically.
However the following peer dependencies must be specified by your project in order to avoid version conflicts:
[`react`](https://www.npmjs.com/package/react),
[`react-dom`](https://www.npmjs.com/package/react-dom).
NPM will not automatically install these for you but it will show you a warning message with instructions on how to install them.


## Documentation
API documentation available [here](https://unbxd.github.io/react-search-JS-SDK/).


## Contributions

Use [GitHub issues](https://github.com/unbxd/react-search-JS-SDK/issues) for requests.

We actively welcome pull requests; learn how to [contribute](https://github.com/unbxd/react-search-JS-SDK/blob/master/CONTRIBUTING.md).

## Changelog

Changes are tracked in the [changelog](https://github.com/unbxd/react-search-JS-SDK/blob/master/CHANGELOG.md).
