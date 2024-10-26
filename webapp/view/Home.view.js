sap.ui.jsview("target.namespace.view.Home", {

	getControllerName: function() {
		return "target.namespace.controller.Home";
	},

	createContent: function(oController) {

		var oPage = new sap.m.Page({
			title: "Home"
		});

		return oPage;
	}

});