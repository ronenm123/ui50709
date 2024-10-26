sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
function (Controller,MessageToast) {
    "use strict";

    return Controller.extend("project2.controller.View1", {
        onInit: function () {

        },
        onPress : function() {
            var msg = "You are so beutifull!!"
            MessageToast.show(msg , { 
                duration : 100,
                width : '5em'
            });
            
          }
    });
});
