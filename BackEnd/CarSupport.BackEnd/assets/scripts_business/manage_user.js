 manageUser = {
     abount: {
         author: 'Juan Hincapie',
         description: 'logica encargada de la administración de usuarios',
         date: '8 de abril del 2017'
     },
     global: {
         crudServiceBaseUrl: "/user",
         dataSource: ''
     },
     fn: {
         init: function() {
             manageUser.fn.getDataSource();
             manageUser.fn.setGrid();
         },
         getDataSource: function() {
             manageUser.global.dataSource = new kendo.data.DataSource({
                 transport: {
                     read: {
                         url: manageUser.global.crudServiceBaseUrl + "/index",
                         dataType: "json"
                     },
                     create: {
                         url: manageUser.global.crudServiceBaseUrl + "/add",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     update: {
                         url: manageUser.global.crudServiceBaseUrl + "/edit",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     destroy: {
                         url: manageUser.global.crudServiceBaseUrl + "/delete",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     parameterMap: function(data, operation) {
                         var userParameter = {
                             Id: 0,
                             IdentificationNumber: data.IdentificationNumber,
                             FullName: data.FullName,
                             Email: data.Email,
                             Phone: data.Phone,
                             CellPhone: data.CellPhone,
                             Username: data.Username,
                             Password: data.Password
                         }
                         if (operation == 'create') {
                             return JSON.stringify(userParameter);
                         }
                         if (operation == 'update') {
                             userParameter.Id = data.Id;
                             userParameter.IdentificationNumber = data.IdentificationNumber;
                             userParameter.FullName = data.FullName;
                             userParameter.Email = data.Email;
                             userParameter.Phone = data.Phone;
                             userParameter.CellPhone = data.CellPhone;
                             userParameter.Username = data.Username;
                             userParameter.Password = data.Password;
                             return JSON.stringify(userParameter);
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
                             IdentificationNumber: {
                                 type: "string"
                             },
                             FullName: {
                                 type: "string"
                             },
                             Email: {
                                 type: "string"
                             },
                             Phone: {
                                 type: "string"
                             },
                             CellPhone: {
                                 type: "string"
                             },
                             Username: {
                                 type: "string"
                             },
                             Password: {
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
                 dataSource: manageUser.global.dataSource,
                 pageable: true,
                 height: 400,
                 toolbar: [{
                     name: "create",
                     text: "Crear Usuario"
                 }],
                 columns: [{
                     field: "Id",
                     title: "Id"
                 }, {
                     field: "IdentificationNumber",
                     title: "Identificación",
                     width: "150px"
                 }, {
                     field: "FullName",
                     title: "Nombre Completo",
                     width: "150px"
                 }, {
                     field: "Email",
                     title: "Correo electronico",
                     width: "100px"
                 }, {
                     field: "Phone",
                     title: "Telefono",
                     width: "100px"
                 }, {
                     field: "CellPhone",
                     title: "Celular",
                     width: "100px"
                 }, {
                     field: "Username",
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
                     confirmation: "¿Está seguro que desea eliminar el usuario?"
                 },
                 edit: function(e) {
                     e.container.data("kendoWindow").title('Editar Usuario');
                     var editWindow = e.container.data("kendoWindow");
                     editWindow.center();
                     if (e.model.isNew()) {
                         editWindow.title('Crear Usuario');
                     }
                 }
             }).data("kendoGrid");
         }
     }

 }