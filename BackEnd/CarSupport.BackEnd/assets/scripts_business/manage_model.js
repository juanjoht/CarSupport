manageModel = {
     abount: {
         author: 'Jhovany Gallego',
         description: 'logica encargada de la administración de las sugerencias',
         date: '13 de abril del 2017'
     },
     global: {
         crudServiceBaseUrl: "/model",
         urlGetBrand:"/brand/index",
         dataSource: '',
         dataSourceBrand:''
     },
     fn: {
         init: function() {
             manageModel.fn.getDataSource();
             manageModel.fn.setGrid();
         },
         getDataSource: function() {
             manageModel.global.dataSource = new kendo.data.DataSource({
                 transport: {
                     read: {
                         url: manageModel.global.crudServiceBaseUrl + "/index",
                         dataType: "json"
                     },
                     create: {
                         url: manageModel.global.crudServiceBaseUrl + "/add",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     update: {
                         url: manageModel.global.crudServiceBaseUrl + "/edit",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     destroy: {
                         url: manageModel.global.crudServiceBaseUrl + "/delete",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     parameterMap: function(data, operation) {
                         var modelParameter = {
                             Id: 0,
                             Description: data.Description,
                             Brand: data.Brand
                         }
                         if (operation == 'create') {
                             return JSON.stringify(modelParameter);
                         }
                         if (operation == 'update') {
                             modelParameter.Id = data.Id;
                             modelParameter.Description = data.Description;
                             modelParameter.Brand = data.Brand;
                             return JSON.stringify(modelParameter);
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
                             Brand: {
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
                 dataSource: manageModel.global.dataSource,
                 pageable: true,
                 height: 400,
                 toolbar: [{
                     name: "create",
                     text: "Crear Modelo de carro"
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
                     field: "Brand",
                     title: "id marca",
                     width: "150px"
                 }, {
                     command: [{ name: "edit", text: "Editar" }, { name: "destroy", text: "Eliminar" }],
                     title: "&nbsp;",
                     width: "210px"
                 }],
                 editable: {
                     template: kendo.template($("#template").html()),
                     mode: "popup",
                     confirmation: "¿Está seguro que desea eliminar el modelo?"
                 },
                 edit: function(e) {
                     e.container.data("kendoWindow").title('Editar modelo');
                     var editWindow = e.container.data("kendoWindow");
                     editWindow.center();
                     manageModel.fn.setDdlBrand();
                     if (e.model.isNew()) {
                         editWindow.title('Crear modelo');
                     }
                 }
             }).data("kendoGrid");
         },
         setDdlBrand: function() {
             $("#brand").kendoComboBox({
                 placeholder: "Seleccione...",
                 dataTextField: "Description",
                 dataValueField: "Id",
                 dataSource: {
                     transport: {
                         read: {
                             dataType: "json",
                             url: manageModel.global.urlGetBrand,
                         }
                     }
                 }
             });
         }
     }

 }