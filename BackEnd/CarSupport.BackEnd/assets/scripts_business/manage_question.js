 manageQuestion = {
     abount: {
         author: 'Jhovany Gallego',
         description: 'logica encargada de la administración de las preguntas',
         date: '12 de abril del 2017'
     },
     global: {
         crudServiceBaseUrl: "/question",
         dataSource: ''
     },
     fn: {
         init: function() {
             manageQuestion.fn.getDataSource();
             manageQuestion.fn.setGrid();
         },
         getDataSource: function() {
             manageQuestion.global.dataSource = new kendo.data.DataSource({
                 transport: {
                     read: {
                         url: manageQuestion.global.crudServiceBaseUrl + "/index",
                         dataType: "json"
                     },
                     create: {
                         url: manageQuestion.global.crudServiceBaseUrl + "/add",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     update: {
                         url: manageQuestion.global.crudServiceBaseUrl + "/edit",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     destroy: {
                         url: manageQuestion.global.crudServiceBaseUrl + "/delete",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     parameterMap: function(data, operation) {
                         var questionParameter = {
                             Id: 0,
                             Description: data.Description,
                             Part: data.Part
                         }
                         if (operation == 'create') {
                             return JSON.stringify(questionParameter);
                         }
                         if (operation == 'update') {
                             questionParameter.Id = data.Id;
                             questionParameter.Description = data.Description;
                             questionParameter.Part = data.Part;
                             
                             return JSON.stringify(questionParameter);
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
                 dataSource: manageQuestion.global.dataSource,
                 pageable: true,
                 height: 400,
                 toolbar: [{
                     name: "create",
                     text: "Crear Pregunta"
                 }],
                 columns: [{
                     field: "Id",
                     title: "Id"
                 }, {
                     field: "Description",
                     title: "Descripción",
                     width: "150px"
                 }, {
                     field: "Part",
                     title: "Parte",
                     width: "150px"
                 }, {
                     command: [{ name: "edit", text: "Editar" }, { name: "destroy", text: "Eliminar" }],
                     title: "&nbsp;",
                     width: "210px"
                 }],
                 editable: {
                     template: kendo.template($("#template").html()),
                     mode: "popup",
                     confirmation: "¿Está seguro que desea eliminar la pregunta?"
                 },
                 edit: function(e) {
                     e.container.data("kendoWindow").title('Editar Pregunta');
                     var editWindow = e.container.data("kendoWindow");
                     editWindow.center();
                     if (e.model.isNew()) {
                         editWindow.title('Crear Pregunta');
                     }
                 }
             }).data("kendoGrid");
         }
     }

 }