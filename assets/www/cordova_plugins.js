cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/plugin.google.maps/www/googlemaps-cdv-plugin.js",
        "id": "plugin.google.maps.googlemaps-cdv-plugin",
        "clobbers": [
            "plugin.google.maps"
        ]
    },
    {
        "file": "plugins/plugin.http.request/www/http-request.js",
        "id": "plugin.http.request.http-request",
        "clobbers": [
            "cordova.plugins.http-request"
        ]
    }
]});

module.exports.metadata = {
    "plugin.google.maps": "1.2.4",
    "plugin.http.request": "1.0.3"
}