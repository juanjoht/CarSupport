 manageCar = {
     abount: {
         author: 'Jhovany Gallego',
         description: 'logica encargada de la administración de los carros',
         date: '11 de abril del 2017'
     },
     global: {
         crudServiceBaseUrl: "/car",
         dataSource: ''
     },
     fn: {
         init: function() {
             manageCar.fn.getDataSource();
             manageCar.fn.setGrid();
         },
         getDataSource: function() {
             manageCar.global.dataSource = new kendo.data.DataSource({
                 transport: {
                     read: {
                         url: manageCar.global.crudServiceBaseUrl + "/index",
                         dataType: "json"
                     },
                     create: {
                         url: manageCar.global.crudServiceBaseUrl + "/add",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     update: {
                         url: manageCar.global.crudServiceBaseUrl + "/edit",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     destroy: {
                         url: manageCar.global.crudServiceBaseUrl + "/delete",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     parameterMap: function(data, operation) {
                         var carParameter = {
                             Id: 0,
                             LicensePlate: data.LicensePlate,
                             Year: data.Year,
                             CurrentMileage: data.CurrentMileage,
                             FuelType: data.FuelType,
                             Class: data.Class,
                             Model: data.Model,
                             User: data.User
                         }
                         if (operation == 'create') {
                             return JSON.stringify(carParameter);
                         }
                         if (operation == 'update') {
                             carParameter.Id = data.Id;
                             carParameter.LicensePlate = data.LicensePlate;
                             carParameter.Year = data.Year;
                             carParameter.CurrentMileage = data.CurrentMileage;
                             carParameter.FuelType = data.FuelType;
                             carParameter.Class = data.Class;
                             carParameter.Model = data.Model;
                             carParameter.User = data.User;
                             return JSON.stringify(carParameter);
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
                             LicensePlate: {
                                 type: "string"
                             },
                             Year: {
                                 type: "string"
                             },
                             CurrentMileage: {
                                 type: "string"
                             },
                             FuelType: {
                                 type: "string"
                             },
                             Class: {
                                 type: "string"
                             },
                             Model: {
                                 type: "number"
                             },
                             User: {
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
                 dataSource: manageCar.global.dataSource,
                 pageable: true,
                 height: 400,
                 toolbar: [{
                     name: "create",
                     text: "Crear carro"
                 }],
                 columns: [{
                     field: "Id",
                     title: "Id"
                 }, {
                     field: "LicensePlate",
                     title: "Placa",
                     width: "150px"
                 }, {
                     field: "Year",
                     title: "Año",
                     width: "150px"
                 }, {
                     field: "CurrentMileage",
                     title: "Kilometraje actual",
                     width: "100px"
                 }, {
                     field: "FuelType",
                     title: "Tipo de combustible",
                     width: "100px"
                 }, {
                     field: "Class",
                     title: "Clase",
                     width: "100px"
                 }, {
                     field: "Model",
                     title: "Modelo",
                     width: "100px"
                 }, {
                     field: "User",
                     title: "Usuario",
                     width: "100px"
                 }, {
                     command: ["edit", "destroy"],
                     title: "&nbsp;",
                     width: "210px"
                 }],
                 editable: {
                     template: kendo.template($("#template").html()),
                     mode: "popup",
                     confirmation: "¿Está seguro que desea eliminar el carro?"
                 },
                 edit: function(e) {
                     e.container.data("kendoWindow").title('Editar Carro');
                     var editWindow = e.container.data("kendoWindow");
                     editWindow.center();
                     if (e.model.isNew()) {
                         editWindow.title('Crear Carro');
                     }
                 }
             }).data("kendoGrid");
         }
     }

 }