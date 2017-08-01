# Node.js FinStat client

[![npm version](https://img.shields.io/npm/v/finstatclient.svg?style=flat)](https://www.npmjs.com/package/finstatclient) [![npm downloads](https://img.shields.io/npm/dm/finstatclient.svg?style=flat)](https://www.npmjs.com/package/finstatclient)

## Installation

With [npm](https://www.npmjs.com/) :

```
npm install finstatclient
```

With [yarn](https://yarnpkg.com/) :

```
yarn add finstatclient
```

## Example

```
var finstatclient = require('finstatclient')('<api key>', '<private key>');

finstatclient.getCompanyDetail("35757442", function(data) {
    console.log(data);
}, function(statusCode) {
    switch(statusCode) {
        case 28:
            // timeout
            break;
        case 402:
            // exceeding the daily limit
            break;
        case 403:
            // unauthorized ( bad API key / private key, ... )
            break;
        case 404:
            // ICO not found in database
            break;
    }
});
```
