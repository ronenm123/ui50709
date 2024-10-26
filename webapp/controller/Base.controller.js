sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"target/namespace/model/formatter"
], function(Controller, formatter) {
	"use strict";

	return Controller.extend("target.namespace.controller.Base", {
	    formatter: formatter,
	    getRouter : function () {
				return sap.ui.core.UIComponent.getRouterFor(this);
	    }
	});

});