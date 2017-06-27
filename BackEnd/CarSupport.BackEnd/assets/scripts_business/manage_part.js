 managePart = {
     abount: {
         author: 'Jhovany Gallego',
         description: 'logica encargada de la administración de las partes',
         date: '16 de abril del 2017'
     },
     global: {
         crudServiceBaseUrl: "/part",
         urlUploadImage1: "/part/uploadImage1",
         pathImages: '/images/',
         imageName1: '',
         dataSource: ''
     },
     fn: {
         init: function() {
             managePart.fn.getDataSource();
             managePart.fn.setGrid();
         },
         getDataSource: function() {
             managePart.global.dataSource = new kendo.data.DataSource({
                 transport: {
                     read: {
                         url: managePart.global.crudServiceBaseUrl + "/index",
                         dataType: "json"
                     },
                     create: {
                         url: managePart.global.crudServiceBaseUrl + "/add",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     update: {
                         url: managePart.global.crudServiceBaseUrl + "/edit",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     destroy: {
                         url: managePart.global.crudServiceBaseUrl + "/delete",
                         dataType: "json",
                         contentType: "application/json; charset=utf-8",
                         type: 'POST',
                         complete: function(e) { $("#grid").data("kendoGrid").dataSource.read(); }
                     },
                     parameterMap: function(data, operation) {
                         var partParameter = {
                             Id: 0,
                             Name: data.Name,
                             Description: data.Description,
                             Path: data.Path,
                             ShowScheme: data.ShowScheme
                         }
                         if (operation == 'create') {
                             partParameter.ShowScheme=data.showScheme.ShowScheme;
                             partParameter.Path = managePart.global.pathImages + managePart.global.imagenName1;
                             return JSON.stringify(partParameter);
                         }
                         if (operation == 'update') {
                             partParameter.Id = data.Id;
                             partParameter.Name = data.Name;
                             partParameter.Description = data.Description;
                             partParameter.Path = managePart.global.pathImages + managePart.global.imagenName1;
                             partParameter.ShowScheme = data.showScheme.ShowScheme;
                             
                             return JSON.stringify(partParameter);
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
                             Name: {
                                 type: "string"
                             },
                             Description: {
                                 type: "string"
                             },
                             Path: {
                                 type: "string"
                             },
                             ShowScheme: {
                                 type: "boolean"
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
                 dataSource: managePart.global.dataSource,
                 pageable: true,
                 height: 400,
                 toolbar: [{
                     name: "create",
                     text: "Crear Parte"
                 }],
                 columns: [{
                     field: "Id",
                     title: "Id",
                     width: "150px"
                 },{
                     field: "Name",
                     title: "Nombre parte",
                     width: "150px"
                 }, {
                     field: "Description",
                     title: "Descripción",
                     width: "150px"
                 },{
                     field: "Path",
                     title: "Paquete",
                     width: "150px"
                 }, {
                     field: "ShowScheme",
                     title: "Mostrar Esquema",
                     width: "150px"
                 },  {
                     command: [{ name: "edit", text: "Editar" }, { name: "destroy", text: "Eliminar" }],
                     title: "&nbsp;",
                     width: "210px"
                 }],
                 editable: {
                     template: kendo.template($("#template").html()),
                     mode: "popup",
                     confirmation: "¿Está seguro que desea eliminar la parte?"
                 },
                 edit: function(e) {
                     e.container.data("kendoWindow").title('Editar Parte');
                     var editWindow = e.container.data("kendoWindow");
                     editWindow.center();
                     managePart.fn.setDatMostrar();
                     managePart.fn.setKendoUploadImage1();
                     if (e.model.isNew()) {
                         editWindow.title('Crear Parte');
                     }
                 }
             }).data("kendoGrid");
         },
         setDatMostrar: function() {
             $("#showScheme").kendoComboBox({
                 placeholder: "Seleccione...",
                 dataTextField: "Desicioname",
                 dataValueField: "ShowScheme",
                 dataSource: [
                    { Desicioname: "NO", ShowScheme: 0 },
                    { Desicioname: "SI", ShowScheme: 1 }
                 ]
             });
         },
         setKendoUploadImage1: function() {
             $("#UploadImage1").kendoUpload({
                 async: {
                     saveUrl: managePart.global.urlUploadImage1,
                     removeUrl: '',
                     autoUpload: false
                 },
                 multiple: false,
                 localization: {
                     select: "Seleccione",
                     uploadSelectedFiles: "Cargar Archivo",
                     headerStatusUploaded: "Finalizado",
                     headerStatusUploading: "Cargando"
                 },
                 upload: managePart.fn.onUploadImage,
                 success: managePart.fn.onSuccessImage
             });
         },
         onSuccessImage: function(e) {
             if (e.operation == "upload") {
                // var valueOption = e.sender.element["0"].attributes[3].nodeValue
                 var splitname = e.response[0].fd.split("\\");
                 var filename = splitname[splitname.length - 1];
                // switch (valueOption) {
                   //  case "image1":
                         managePart.global.imagenName1 = filename;
                      //   break;
                    // default:
                         // window.radalert(revistaImagenExtension, 400, 200, 'Mensaje de Información', '');
                       //  e.preventDefault();
                        // break;
                 //}
             }
         },
         onUploadImage: function(e) {
             // Array with information about the uploaded files
             var files = e.files;
             switch (files[0].extension) {
                 case ".jpg":
                     break;
                 case ".png":
                     var t = "";
                     break;
                 default:
                     // window.radalert(revistaImagenExtension, 400, 200, 'Mensaje de Información', '');
                     e.preventDefault();
                     break;
             }
         }
     }

 }