'use strict';
define(['jquery'],
    function ($) {
        function loadScript() {
            var url = "http://localhost:8080/dist/sitegroups-bundle.js"
            //var url = "Modules/SiteGroups/scripts/bundles/sitegroups-bundle.js";
            $.ajax({
                dataType: "script",
                cache: true,
                url: url
            });
        }

        return {
            init: function (wrapper, util, params, callback) {
                loadScript();
            },

            initMobile: function (wrapper, util, params, callback) {
                this.init(wrapper, util, params, callback);
            },

            load: function (params, callback) {
            },

            loadMobile: function (params, callback) {
            }
        };
    });


