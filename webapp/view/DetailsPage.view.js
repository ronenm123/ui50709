sap.ui.jsview("target.namespace.view.DetailsPage", {


	getControllerName: function() {
		'use strict'
		return "target.namespace.controller.DetailsPage";
	},

	createContent: function(oController) {  
            var oPage = new sap.m.Page({
                title: "Details Page"
            });
            return oPage; 
	    }

});