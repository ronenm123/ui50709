sap.ui.jsview("target.namespace.view.App", {

	getControllerName: function() {
		'use strict'
		return "target.namespace.controller.App";
	},

	createContent: function(oController) {
		'use strict'
		var app = new sap.m.SplitApp(this.createId("appId"), {});

		return app;
	}

});