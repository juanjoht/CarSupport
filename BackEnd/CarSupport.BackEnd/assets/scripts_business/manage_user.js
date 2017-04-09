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
                     parameterMap: function(data, operation) {
                         var userParameter = {
                             IdentificationNumber: data.IdentificationNumber,
                             FullName: data.FullName,
                             Email: data.Email,
                             Phone: data.Phone,
                             cellPhone: data.cellPhone,
                             Username: data.Username,
                             Password: data.Password
                         }
                         if (operation == 'create') {
                             return JSON.stringify(userParameter);
                         }
                     }
                 },
                 batch: true,
                 pageSize: 30,
                 schema: {
                     model: {
                         id: "Id",
                         fields: {
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
                             cellPhone: {
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
                     mode: "popup"
                 }
             });
         }
     }

 }