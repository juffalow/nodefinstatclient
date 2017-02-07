# Node.js FinStat client

## Example

```
var finstatclient = require('./index.js')('<api key>', '<private key>');

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
