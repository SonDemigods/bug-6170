import each from 'lodash/each';
var Storage = require('store');

var StorageService = {};

var Params = {
    SIGNATURE: null,
    communityId: null,
    OrganizationId: null,
    tagIds: null,
    ContentServer: null,
    LoginToken: null,
};

each(Params, function (value, key) {
    StorageService[key] = {
        set: function (value) {
            Storage.set(key, value);
        },
        get: function () {
            return Storage.get(key);
        },
        remove: function () {
            Storage.remove(key);
        },
        reset: function () {
            Storage.clear();
        },
        has: function () {
            return Storage.has(key);
        }
    };
});

export default StorageService;
