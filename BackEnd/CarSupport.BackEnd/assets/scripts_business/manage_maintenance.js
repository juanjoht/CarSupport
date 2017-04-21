 manageMaintenance = {
     abount: {
         author: 'Jhovany Gallego',
         description: 'logica encargada de la administración de mantenimientos',
         date: '10 de abril del 2017'
     },
     global: {
         crudServiceBaseUrl: "/maintenance",
         dataSource: ''
     },
     fn: {
         init: function() {
             manageMaintenance.fn.getDataSource();
             manageMaintenance.fn.setGrid();
         },
         getDataSource: function() {
             manageMaintenance.global.dataSource = new kendo.data.DataSource({
                 transport: {
                     read: {
                         url: manageMaintenance.global.crudServiceBaseUrl + "/index",
                         dataType: "json"
                     },
                     create: {
                         url: manageMaintenance.global.crudServiceBaseUrl + "/add",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     update: {
                         url: manageMaintenance.global.crudServiceBaseUrl + "/edit",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     destroy: {
                         url: manageMaintenance.global.crudServiceBaseUrl + "/delete",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     parameterMap: function(data, operation) {
                         var maintenanceParameter = {
                             Id: 0,
                             Description: data.Description
                            
                         }
                         if (operation == 'create') {
                             return JSON.stringify(maintenanceParameter);
                         }
                         if (operation == 'update') {
                             maintenanceParameter.Id = data.Id;
                             maintenanceParameter.Description = data.Description;
                             return JSON.stringify(maintenanceParameter);
                         }
                         if (operation == 'destroy') {
                             return JSON.stringify({ Id: data.Id });
                         }
                         return null;
                     }
                 },
                 pageSize: 7,
                 schema: {
                     model: {
                         id: "Id",
                         fields: {
                             Id: {
                                 editable: false,
                                 type: "number"
                             },
                             Description: {
                                 validation: { required: true },
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
                 dataSource: manageMaintenance.global.dataSource,
                 pageable: true,
                 height: 400,
                 toolbar: [{
                     name: "create",
                     text: "Crear mantenimiento"
                 }],
                 columns: [{
                     field: "Id",
                     title: "Id",
                     width: "50px"
                 }, {
                     field: "Description",
                     title: "Descripcion",
                     width: "500px"
                 }, {
                     command: [{ name: "edit", text: "Editar" }, { name: "destroy", text: "Eliminar" }],
                     title: "&nbsp;",
                     width: "210px"
                 }],
                 editable: {
                     template: kendo.template($("#template").html()),
                     mode: "popup",
                     confirmation: "¿Está seguro que desea eliminar el mantenimiento?"
                 },
                 edit: function(e) {
                     e.container.data("kendoWindow").title('Editar Mantenimiento');
                     var editWindow = e.container.data("kendoWindow");
                     editWindow.center();
                     if (e.model.isNew()) {
                         editWindow.title('Crear Mantenimiento');
                     }
                 }
             }).data("kendoGrid");
         }
     }

 }