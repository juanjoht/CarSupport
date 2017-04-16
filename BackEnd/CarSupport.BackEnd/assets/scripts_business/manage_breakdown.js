 manageBreakdown = {
     abount: {
         author: 'Jhovany Gallego',
         description: 'logica encargada de la administración de las fallas',
         date: '11 de abril del 2017'
     },
     global: {
         crudServiceBaseUrl: "/breakdown",
         dataSource: ''
     },
     fn: {
         init: function() {
             manageBreakdown.fn.getDataSource();
             manageBreakdown.fn.setGrid();
         },
         getDataSource: function() {
             manageBreakdown.global.dataSource = new kendo.data.DataSource({
                 transport: {
                     read: {
                         url: manageBreakdown.global.crudServiceBaseUrl + "/index",
                         dataType: "json"
                     },
                     create: {
                         url: manageBreakdown.global.crudServiceBaseUrl + "/add",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     update: {
                         url: manageBreakdown.global.crudServiceBaseUrl + "/edit",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     destroy: {
                         url: manageBreakdown.global.crudServiceBaseUrl + "/delete",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     parameterMap: function(data, operation) {
                         var breakdownParameter = {
                             Id: 0,
                             Description: data.Description,
                             Causes: data.Causes,
                             Consequences: data.Consequences,
                             Solutions: data.Solutions,
                             Rating: data.Rating,
                             Part: data.Part
                         }
                         if (operation == 'create') {
                             return JSON.stringify(breakdownParameter);
                         }
                         if (operation == 'update') {
                             breakdownParameter.Id = data.Id;
                             breakdownParameter.Description = data.Description;
                             breakdownParameter.Causes = data.Causes;
                             breakdownParameter.Consequences = data.Consequences;
                             breakdownParameter.Solutions = data.Solutions;
                             breakdownParameter.Rating = data.Rating;
                             breakdownParameter.Part = data.Part;
                             return JSON.stringify(breakdownParameter);
                         }
                         if (operation == 'destroy') {
                             return JSON.stringify({ Id: data.Id });
                         }
                         return null;
                     }
                 },
                 pageSize: 30,
                 schema: {
                     model: {
                         id: "Id",
                         fields: {
                             Id: {
                                 type: "number"
                             },
                             Description: {
                                 type: "string"
                             },
                             Causes: {
                                 type: "string"
                             },
                             Consequences: {
                                 type: "string"
                             },
                             Solutions: {
                                 type: "string"
                             },
                             Rating: {
                                 type: "float"
                             },
                             Part: {
                                 type: "number"
                             }
                         }
                     }
                 },
                 requestEnd: function(e) {
                     var response = e.response;
                     var type = e.type;
                     if (type === "create" || type === "update") {
                         if (e.response.Id != 0) {
                             //se pone mensaje de exito
                         } else {
                             // se pone mensaje de error
                         }

                         $("#grid").data("kendoGrid").dataSource.read();
                         this.cancelChanges();

                     } else if (type === "destroy") {
                         //mensaje de exito
                         this.cancelChanges();
                     }
                 }
             });
         },
         setGrid: function() {
             $("#grid").kendoGrid({
                 dataSource: manageBreakdown.global.dataSource,
                 pageable: true,
                 height: 400,
                 toolbar: [{
                     name: "create",
                     text: "Crear falla"
                 }],
                 columns: [{
                     field: "Id",
                     title: "Id"
                 }, {
                     field: "Description",
                     title: "Descripción",
                     width: "150px"
                 }, {
                     field: "Causes",
                     title: "Causas",
                     width: "150px"
                 }, {
                     field: "Consequences",
                     title: "Consecuencias",
                     width: "100px"
                 }, {
                     field: "Solutions",
                     title: "Soluciones",
                     width: "100px"
                 }, {
                     field: "Rating",
                     title: "Clasificación",
                     width: "100px"
                 }, {
                     field: "Part",
                     title: "Parte",
                     width: "100px"
                 }, {
                     command: ["edit", "destroy"],
                     title: "&nbsp;",
                     width: "210px"
                 }],
                 editable: {
                     template: kendo.template($("#template").html()),
                     mode: "popup",
                     confirmation: "¿Está seguro que desea eliminar la falla?"
                 },
                 edit: function(e) {
                     e.container.data("kendoWindow").title('Editar Falla');
                     var editWindow = e.container.data("kendoWindow");
                     editWindow.center();
                     if (e.model.isNew()) {
                         editWindow.title('Crear Falla');
                     }
                 }
             }).data("kendoGrid");
         }
     }

 }