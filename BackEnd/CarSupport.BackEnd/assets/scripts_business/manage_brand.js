manageBrand = {
     abount: {
         author: 'Jhovany Gallego',
         description: 'logica encargada de la administración de las sugerencias',
         date: '13 de abril del 2017'
     },
     global: {
         crudServiceBaseUrl: "/brand",
         dataSource: ''
     },
     fn: {
         init: function() {
             manageBrand.fn.getDataSource();
             manageBrand.fn.setGrid();
         },
         getDataSource: function() {
             manageBrand.global.dataSource = new kendo.data.DataSource({
                 transport: {
                     read: {
                         url: manageBrand.global.crudServiceBaseUrl + "/index",
                         dataType: "json"
                     },
                     create: {
                         url: manageBrand.global.crudServiceBaseUrl + "/add",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     update: {
                         url: manageBrand.global.crudServiceBaseUrl + "/edit",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     destroy: {
                         url: manageBrand.global.crudServiceBaseUrl + "/delete",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     parameterMap: function(data, operation) {
                         var brandParameter = {
                             Id: 0,
                             Description: data.Description
                         }
                         if (operation == 'create') {
                             return JSON.stringify(brandParameter);
                         }
                         if (operation == 'update') {
                             brandParameter.Id = data.Id;
                             brandParameter.Description = data.Description;
                             return JSON.stringify(brandParameter);
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
                 dataSource: manageBrand.global.dataSource,
                 pageable: true,
                 height: 400,
                 toolbar: [{
                     name: "create",
                     text: "Crear Marca de carro"
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
                     command: ["edit", "destroy"],
                     title: "&nbsp;",
                     width: "210px"
                 }],
                 editable: {
                     template: kendo.template($("#template").html()),
                     mode: "popup",
                     confirmation: "¿Está seguro que desea eliminar la marca?"
                 },
                 edit: function(e) {
                     e.container.data("kendoWindow").title('Editar marca');
                     var editWindow = e.container.data("kendoWindow");
                     editWindow.center();
                     if (e.model.isNew()) {
                         editWindow.title('Crear marca');
                     }
                 }
             }).data("kendoGrid");
         }
     }

 }