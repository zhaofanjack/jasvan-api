import gApi from './gApi.js'
const DB_NAME = 'jsvan_api_client_cache_';
export default {
    clear: function() {
        var len = window.sessionStorage.length;
        for (var i = len - 1; i > -1; i--) {
            var key = window.sessionStorage.key(i);
            if (key.indexOf(DB_NAME) > -1) {
                window.sessionStorage.removeItem(key);
            }
        }
    },
    contain: function(key) {
        var cacheKey = DB_NAME + key;
        var value = window.sessionStorage.getItem(cacheKey);
        return gApi.isEmpty(value) ? false : true;
    },
    get: function(key) {
        var cacheKey = DB_NAME + key;
        var value = window.sessionStorage.getItem(cacheKey);
        return gApi.stringToJson(value);
    },
    getKeys: function() {
        var keys = [];
        for (var i = 0; i < window.sessionStorage.length; i++) {
            var key = window.sessionStorage.key(i);
            if (key.indexOf(DB_NAME) > -1) {
                key = key.substring(DB_NAME.length);
                keys.push(key);
            }
        }
        return keys;
    },
    getLength: function() {
        var len = 0;
        for (var i = 0; i < window.sessionStorage.length; i++) {
            var key = window.sessionStorage.key(i);
            if (key.indexOf(DB_NAME) > -1) {
                len++;
            }
        }
        return len;
    },
    pop: function(key) {
        var value = gApi.clone(this.get(key));
        this.remove(key);
        return value;
    },
    remove: function(key) {
        var cacheKey = DB_NAME + key;
        window.sessionStorage.removeItem(cacheKey);
    },
    set: function(key, value) {
        var cacheKey = DB_NAME + key;
        value = gApi.jsonToString(value, true);
        window.sessionStorage.setItem(cacheKey, value);
    }
}