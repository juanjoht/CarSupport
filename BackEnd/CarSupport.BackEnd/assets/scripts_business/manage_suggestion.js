 manageSuggestion = {
     abount: {
         author: 'Jhovany Gallego',
         description: 'logica encargada de la administración de las sugerencias',
         date: '12 de abril del 2017'
     },
     global: {
         crudServiceBaseUrl: "/suggestion",
         dataSource: ''
     },
     fn: {
         init: function() {
             manageSuggestion.fn.getDataSource();
             manageSuggestion.fn.setGrid();
         },
         getDataSource: function() {
             manageSuggestion.global.dataSource = new kendo.data.DataSource({
                 transport: {
                     read: {
                         url: manageSuggestion.global.crudServiceBaseUrl + "/index",
                         dataType: "json"
                     },
                     create: {
                         url: manageSuggestion.global.crudServiceBaseUrl + "/add",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     update: {
                         url: manageSuggestion.global.crudServiceBaseUrl + "/edit",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     destroy: {
                         url: manageSuggestion.global.crudServiceBaseUrl + "/delete",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     parameterMap: function(data, operation) {
                         var suggestionParameter = {
                             Id: 0,
                             Description: data.Description,
                             Url: data.Url,
                             Proccess: data.Proccess
                         }
                         if (operation == 'create') {
                             return JSON.stringify(suggestionParameter);
                         }
                         if (operation == 'update') {
                             suggestionParameter.Id = data.Id;
                             suggestionParameter.Description = data.Description;
                             suggestionParameter.Url = data.Url;
                             suggestionParameter.Proccess = data.Proccess;
                             return JSON.stringify(suggestionParameter);
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
                             Url: {
                                 type: "string"
                             },
                             Proccess: {
                                 type: "string"
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
                 dataSource: manageSuggestion.global.dataSource,
                 pageable: true,
                 height: 400,
                 toolbar: [{
                     name: "create",
                     text: "Crear Sugerencia"
                 }],
                 columns: [{
                     field: "Id",
                     title: "Id",
                     width:"150px"
                 }, {
                     field: "Description",
                     title: "Descripción",
                     width: "150px"
                 }, {
                     field: "Url",
                     title: "Url",
                     width: "150px"
                 }, {
                     field: "Proccess",
                     title: "Proceso",
                     width: "100px"
                 }, {
                     command: [{ name: "edit", text: "Editar" }, { name: "destroy", text: "Eliminar" }],
                     title: "&nbsp;",
                     width: "210px"
                 }],
                 editable: {
                     template: kendo.template($("#template").html()),
                     mode: "popup",
                     confirmation: "¿Está seguro que desea eliminar la sugerencia?"
                 },
                 edit: function(e) {
                     e.container.data("kendoWindow").title('Editar Sugerencia');
                     var editWindow = e.container.data("kendoWindow");
                     editWindow.center();
                     if (e.model.isNew()) {
                         editWindow.title('Crear Sugerencia');
                     }
                 }
             }).data("kendoGrid");
         }
     }

 }