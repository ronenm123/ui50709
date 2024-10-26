sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
],
    function (Controller, Filter, FilterOperator, FilterType, MessageToast, Fragment) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            onInit: function () {

                //this is a common btn click handler
                var oFlexBox2 = this.getView().byId("flex");
                var oInput = new sap.m.Input({
                    id: "inp1",
                    enabled: false,
                    value: "7000",


                });
                var oLbale = new sap.m.Label({

                    id: "lb1",

                    text: "Ronen maman",

                    labelFor: oInput





                });
                oLbale.addStyleClass("sapUiMediumMarginEnd")
                oFlexBox2.addItem(oLbale);
                oFlexBox2.addItem(oInput);





                var btnHandler = function (evt) {
                    var obtn = evt.getSource();
                    //now you have access to the respective button
                    var customData = obtn.getCustomData()[0].getValue();
                    MessageToast.show("button Clicked:" + customData)
                };

                var oFlexBox = new sap.m.FlexBox();

                for (var i = 0; i < 5; i++) {
                    var btn = new sap.m.Button({
                        text: "Button" + i,
                        press: btnHandler,
                        //add your custom data here.. this is an aggregation which means you can add as many customDatas as required.
                        customData: new sap.ui.core.CustomData({
                            key: "key",
                            value: i
                        })
                    });
                    oFlexBox2.addItem(btn);
                }

            },
            onDelete: function (oEvent) {
                var oDataModel = this.getOwnerComponent().getModel();
                debugger;
                var oContent = oEvent.getSource().getBindingContext().getObject();
                //var rowobject = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
                //var oItem = oEvent.getSource();
                //var oBindingContext = oItem.getBindingContext();

                oDataModel.remove("/zaufkSet(Aufnr='" + oContent.Aufnr + "')", {

                    success: function (oResponse) {
                        console.log("success1");
                        debugger;
                    }.bind(this),
                    error: function (oError) {
                        debugger;

                        console.log("error1");
                    }.bind(this)
                });
            },
            onItemPress: function (oEvent) {
                var networkID = oEvent.getParameter("listItem").getBindingContext().getProperty("Aufnr");
                var oFilter = new Filter("Aufnr", FilterOperator.EQ, networkID);
                this.getView().byId("ordertable").getBinding("items").filter(oFilter, FilterType.Application);


            },


            onEdit:  function (oEvent) {

                var oContent = oEvent.getSource().getBindingContext().getObject();
                var oView = this.getView();
               

                this.getView().setModel(new sap.ui.model.json.JSONModel({
                    "oPayload": oContent
                }), "oPayModel")
                if(!this.oDialog)  {
                  Fragment.load({
                   
                     name : "project1.fragments.EditNet" ,
                     controller : this
                    
                  
                    }).then(function(oDialog){
                        this.oDialog = oDialog;
                        oView.addDependent(oDialog);
                        this.oDialog.open();
                    }.bind(this));
                }else {
                    this.oDialog.open();
                }

                //var oView = this.getView();
                // if (!this.showDialog) {

                //     sap.ui.core.Fragment.load({
                //         name: "project1.fragments.EditNet",
                //          controller: this,
                //          id : this.getView().getId()

                //     }).then(function(oDialog){

                //         this.showDialog =  oDialog
                //         this.showDialog.getView().setModel(new sap.ui.model.json.JSONModel({
                //             "oPayload": oContent
                //         }), "oPayModel")
                //         this.showDialog.open();
                        

                //     }.bind(this))
                   

                //     // //this.showDialog = sap.ui.xmlfragment("project1.fragments.EditNet", this);
                //     // this.showDialog.setModel(new sap.ui.model.json.JSONModel({
                //     //     "oPayload": oContent
                //     // }), "oPayModel")

                //     // this.showDialog.open();


                // } else {
                //     // this.getView().setModel(new sap.ui.model.json.JSONModel({
                //     //     "oPayload": oContent
                //     // }), "oPayModel")
                //     this.showDialog.open();
                // }


            },
            onCancel: function () {
                this.oDialog.close();

            },
            onSave: function () {
                var oDataModel = this.getOwnerComponent().getModel();
                var oContent = this.getView().getModel("oPayModel").getProperty("/oPayload");
                oDataModel.update("/zaufkSet(Aufnr='" + oContent.Aufnr + "')", oContent, {

                    success: function (oResponse) {
                        console.log("success1 save");
                        oDataModel.read("/zaufkSet", {});
                        this.oDialog.close();

                    }.bind(this),
                    error: function (oError) {
                        debugger;

                        console.log("error1 save");
                    }.bind(this)
                });

            }

        });
    });
