var request = require('request');
var crypto = require('crypto');
var parseString = require('xml2js').parseString;

/**
 *
 * @param {String} apiKey
 * @param {String} privateKey
 */
module.exports = function(apiKey, privateKey) {
    var apiKey = apiKey;
    var privateKey = privateKey;

    return {
        /**
         *
         * @param {String} ICO
         * @param {function} callback
         * @param {function} errorCallback
         */
        getCompanyDetail: function(ICO, callback, errorCallback) {
            fetchCompanyDetail(ICO, 'detail', callback, errorCallback);
        },
        /**
         *
         * @param {String} ICO
         * @param {function} callback
         * @param {function} errorCallback
         */
        getCompanyExtendedDetail: function(ICO, callback, errorCallback) {
            fetchCompanyDetail(ICO, 'extended', callback, errorCallback);
        },
        /**
         *
         * @param {String} ICO
         * @param {function} callback
         * @param {function} errorCallback
         */
        getCompanyUltimateDetail: function(ICO, callback, errorCallback) {
            fetchCompanyDetail(ICO, 'ultimate', callback, errorCallback);
        },

        getSuggestions(query, callback, errorCallback) {
            fetchSuggestions(query, callback, errorCallback);
        }
    }

    function fetchCompanyDetail(ICO, type, callback, errorCallback) {
        var params = {
            Ico: ICO,
            apiKey: apiKey,
            Hash: getVerificationHash(ICO)
        };

        var options = {
            url: 'http://www.finstat.sk/api/' + type,
            method: 'POST',
            json: params
        };

        request(options, function(error, response, body) {
            if( !error && response.statusCode == 200 ) {
                parseString(body, {explicitArray: false, ignoreAttrs: true}, function(err, result) {
                    callback(result.DetailResult);
                });
            } else {
                errorCallback(response.statusCode);
            }
        });
    }

    function fetchSuggestions(query, callback, errorCallback) {
        var params = {
            query: query,
            apiKey: apiKey,
            Hash: getVerificationHash(query)
        };

        var options = {
            url: 'http://www.finstat.sk/api/autocomplete',
            method: 'POST',
            json: params
        };

        request(options, function(error, response, body) {
            if( !error && response.statusCode == 200 ) {
                parseString(body, {explicitArray: false, ignoreAttrs: true}, function(err, result) {
                    callback(result.ApiAutocomplete);
                });
            } else {
                errorCallback(response.statusCode);
            }
        });
    }

    /**
     *
     * @param {String} hashParam
     * @return {String}
     */
    function getVerificationHash(hashParam) {
        return crypto.createHash('sha256').update('SomeSalt+' + apiKey + '+' + privateKey + '++' + hashParam + '+ended').digest('hex');
    }
}
