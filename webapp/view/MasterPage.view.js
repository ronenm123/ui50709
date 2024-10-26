sap.ui.jsview("target.namespace.view.MasterPage", {


	getControllerName: function() {
		'use strict'
		return "target.namespace.controller.MasterPage";
	},

	createContent: function(oController) {  
            var oPage = new sap.m.Page({
				title: "Master Page"
            });
            return oPage; 
	    }

});