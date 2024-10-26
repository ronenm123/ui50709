sap.ui.define([
    "sap/ui/core/util/MockServer",
    "target/namespace/localService/MockRequests"
], function(MockServer, MockRequests) {
    "use strict";

    return {
        /**
         * Initializes the mock server. You can configure the delay with the URL parameter "serverDelay"
         * The local mock data in this folder is returned instead of the real data for testing.
         *
         * @public
         */
        init: function() {
            var oUriParameters = jQuery.sap.getUriParameters(),
                oMockServer = new MockServer({
                    rootUri: "/ui50709.srv"
                }),
                oRequests = new MockRequests(oMockServer),
                sPath = jQuery.sap.getModulePath("target.namespace.localService"),
                aRequests;

            // configure mock server with a delay of 1s
            MockServer.config({
                autoRespond: true,
                autoRespondAfter: (oUriParameters.get("serverDelay") || 0)
            });

            // load local mock data
            oMockServer.simulate(sPath + "/metadata.xml", {
                sMockdataBaseUrl: sPath + "/mockdata"
            });
            aRequests = oMockServer.getRequests();
            oMockServer.setRequests(aRequests.concat(oRequests.getRequests()));
            oMockServer.start();

            jQuery.sap.log.info("Running the app with mock data");
        }
    };
});