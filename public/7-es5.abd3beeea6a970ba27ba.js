!function(){function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function t(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"Vkq/":function(n,o,a){"use strict";a.r(o),a.d(o,"AdapterModule",function(){return D});var i,r=a("ofXK"),c=a("tyNb"),s=a("tk/3"),d=a("3Pt+"),l=a("fXoL"),p=a("7zfz"),u=a("t3rE"),b=a("/RsI"),g=((i=function(){function n(){e(this,n)}return t(n,[{key:"ngOnInit",value:function(){}}]),n}()).\u0275fac=function(e){return new(e||i)},i.\u0275cmp=l.Cb({type:i,selectors:[["app-file-upload"]],decls:24,vars:0,consts:[[1,"main-content"],[1,"info-type"],[1,"p-grid","text-title"],[1,"p-col-12","p-md-6","p-lg-6"],[1,"p-grid"],[1,"p-col-12","p-md-4","p-lg-4","description"]],template:function(e,n){1&e&&(l.Ob(0,"div",0),l.Ob(1,"div",1),l.Ob(2,"div",2),l.Ob(3,"div",3),l.Ob(4,"h4"),l.Ob(5,"span"),l.Ec(6,"Adaptadapta un objeto de aprendizaje"),l.Nb(),l.Ec(7," para una educaci\xf3n mejor"),l.Nb(),l.Nb(),l.Nb(),l.Ob(8,"div",4),l.Ob(9,"div",5),l.Ob(10,"p"),l.Ec(11,"Manual"),l.Nb(),l.Ob(12,"p"),l.Ec(13," Si desea modificar uno a uno cada elemento del objeto de aprendizaje seg\xfan su criterio. "),l.Nb(),l.Nb(),l.Ob(14,"div",5),l.Ob(15,"p"),l.Ec(16,"Autom\xe1tico"),l.Nb(),l.Ob(17,"p"),l.Ec(18," Si desea que nuestro algoritmo modifique el objeto de aprendizaje; puede seleccionar los elementos que desea adaptar. "),l.Nb(),l.Nb(),l.Ob(19,"div",5),l.Ob(20,"p"),l.Ec(21,"Mixto"),l.Nb(),l.Ob(22,"p"),l.Ec(23," Una combinaci\xf3n de los dos m\xe9todos anteriores. Seleccione qu\xe9 elementos desea que el algoritmo adapte y cu\xe1les no; podr\xe1 modificar los elementos si el resultado no es el esperado. "),l.Nb(),l.Nb(),l.Nb(),l.Nb(),l.Nb())},styles:[".main-content[_ngcontent-%COMP%]{margin-top:50px}.main-content[_ngcontent-%COMP%]   .info-type[_ngcontent-%COMP%]{background-color:rgba(5,108,226,.04);border-radius:25px;padding:25px}.main-content[_ngcontent-%COMP%]   .text-title[_ngcontent-%COMP%]{display:flex;justify-content:center}.main-content[_ngcontent-%COMP%]   .text-title[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{text-align:center}.main-content[_ngcontent-%COMP%]   .text-title[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--primary-color)}.main-content[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:first-child{font-weight:700;font-size:1.1em}"]}),i),f=a("kvL/"),v=a("jIHw"),h=a("LuMj"),m=a("Ji6n"),O=a("+DzE"),C=a("vKg+");function y(e,n){if(1&e){var t=l.Pb();l.Ob(0,"ngx-dropzone-preview",13),l.Vb("removed",function(){return l.tc(t),l.Zb(2).onRemove()}),l.Ob(1,"ngx-dropzone-label"),l.Ec(2),l.Nb(),l.Nb()}if(2&e){var o=l.Zb(2);l.fc("removable",!0)("file",o.file),l.xb(2),l.Fc(o.file.name)}}function N(e,n){if(1&e){var t=l.Pb();l.Ob(0,"ngx-dropzone",10),l.Vb("change",function(e){return l.tc(t),l.Zb().onSelect(e)}),l.Ob(1,"ngx-dropzone-label"),l.Ob(2,"h4"),l.Ec(3,"Arrastre o seleccione un archivo."),l.Nb(),l.Jb(4,"p-button",11),l.Nb(),l.Cc(5,y,3,3,"ngx-dropzone-preview",12),l.Nb()}if(2&e){var o=l.Zb();l.xb(5),l.fc("ngIf",o.file)}}function x(e,n){if(1&e){var t=l.Pb();l.Ob(0,"div",27),l.Ob(1,"div",28),l.Ob(2,"p-checkbox",29),l.Vb("onChange",function(e){l.tc(t);var o=n.$implicit;return l.Zb(2).onCheckChange(o.value,e)}),l.Nb(),l.Ob(3,"label",30),l.Ec(4),l.Nb(),l.Nb(),l.Nb()}if(2&e){var o=n.$implicit;l.xb(2),l.fc("value",o.value)("inputId",o),l.xb(1),l.fc("for",o.value),l.xb(1),l.Fc(o.description)}}function j(e,n){if(1&e){var t=l.Pb();l.Ob(0,"div",14),l.Ob(1,"form",15),l.Vb("ngSubmit",function(){return l.tc(t),l.Zb().showConditionModal()}),l.Ob(2,"h6"),l.Ec(3,"M\xe9todo de adaptaci\xf3n"),l.Nb(),l.Ob(4,"div",16),l.Ob(5,"div",17),l.Jb(6,"p-radioButton",18),l.Ob(7,"label",19),l.Ec(8,"Manual"),l.Nb(),l.Nb(),l.Ob(9,"div",17),l.Jb(10,"p-radioButton",20),l.Ob(11,"label",21),l.Ec(12,"Autom\xe1tico"),l.Nb(),l.Nb(),l.Ob(13,"div",17),l.Jb(14,"p-radioButton",22),l.Ob(15,"label",23),l.Ec(16,"Mixta"),l.Nb(),l.Nb(),l.Nb(),l.Ob(17,"h6"),l.Ec(18,"Seleccione las \xe1reas a automatizar."),l.Nb(),l.Ob(19,"div",6),l.Cc(20,x,5,4,"div",24),l.Nb(),l.Ob(21,"div",25),l.Jb(22,"p-button",26),l.Nb(),l.Nb(),l.Nb()}if(2&e){var o=l.Zb();l.xb(1),l.fc("formGroup",o.settingsForm),l.xb(19),l.fc("ngForOf",o.checkboxs)}}function k(e,n){1&e&&l.Jb(0,"p-progressSpinner")}function P(e,n){if(1&e&&(l.Mb(0),l.Ec(1),l.Lb()),2&e){var t=l.Zb(2);l.xb(1),l.Gc(" ",t.progress,"% ")}}function M(e,n){1&e&&(l.Ob(0,"span"),l.Ec(1,"Completo"),l.Nb())}function I(e,n){1&e&&(l.Ob(0,"p"),l.Ec(1,"Tu archivo esta listo para editar pulsa en continuar para editarlo"),l.Nb())}function E(e,n){if(1&e){var t=l.Pb();l.Ob(0,"p-button",38),l.Vb("click",function(){return l.tc(t),l.Zb(2).navigate()}),l.Nb()}}var z=function(){return{color:"#FFF"}};function _(e,n){if(1&e&&(l.Ob(0,"div",31),l.Cc(1,k,1,0,"p-progressSpinner",32),l.Ob(2,"p"),l.Ec(3," Cargando archivo por favor espere... "),l.Ob(4,"span"),l.Cc(5,P,2,1,"ng-container",33),l.Cc(6,M,2,0,"ng-template",null,34,l.Dc),l.Nb(),l.Nb(),l.Cc(8,I,2,0,"p",32),l.Jb(9,"p-progressBar",35),l.Ob(10,"div",36),l.Cc(11,E,1,0,"p-button",37),l.Nb(),l.Nb()),2&e){var t=l.rc(7),o=l.Zb();l.xb(1),l.fc("ngIf",!o.navigateId),l.xb(4),l.fc("ngIf",o.progress<100)("ngIfElse",t),l.xb(3),l.fc("ngIf",o.navigateId),l.xb(1),l.Ac(l.hc(8,z)),l.fc("value",o.progress),l.xb(2),l.fc("ngIf",o.navigateId)}}function w(e,n){if(1&e){var t=l.Pb();l.Ob(0,"p-button",39),l.Vb("click",function(){return l.tc(t),l.Zb().displayConditions=!1}),l.Nb(),l.Ob(1,"p-button",40),l.Vb("click",function(){return l.tc(t),l.Zb().onUpload()}),l.Nb()}}var A,F,S,q=function(){return{width:"50vw"}},J=[{path:"",component:(A=function(){function n(t,o,a,i){e(this,n),this.messageService=t,this.learningObjectService=o,this.fb=a,this.router=i,this.progress=0,this.upload=!1,this.loader=!1,this.areas=["all","image","video","audio","button","paragraph"],this.checkAll=!0,this.checkboxs=[{value:"all",description:"Todas",checked:!0},{value:"image",description:"Imagen (Descripci\xf3n de imagen)",checked:!0},{value:"video",description:"Video (Subtitulado de video)",checked:!0},{value:"audio",description:"Audio (Descripci\xf3n de audio)",checked:!0},{value:"button",description:"Bot\xf3n de Adaptabilidad",checked:!0},{value:"paragraph",description:"P\xe1rrafos de texto",checked:!0}],this.settingsForm=this.fb.group({method:["handbook",d.n.required],areas:[this.areas,d.n.required]})}return t(n,[{key:"ngOnInit",value:function(){}},{key:"onSelect",value:function(e){this.file=e.addedFiles[0]}},{key:"onRemove",value:function(){this.file=void 0}},{key:"onUpload",value:function(){var e=this;this.displayConditions=!1;var n=Object.assign({file:this.file},this.settingsForm.value);this.loader=!0,this.learningObjectService.uploadObject(n).subscribe(function(n){var t;(null===(t=n.body)||void 0===t?void 0:t.id)&&(e.navigateId=n.body.id),n.type===s.c.UploadProgress?e.progress=Math.round(100*n.loaded/n.total):n instanceof s.d&&(e.upload=!0)},function(n){console.log(n),e.upload=!1,e.loader=!1,e.progress=0})}},{key:"onCheckChange",value:function(e,n){"all"===e&&n.checked?this.areas=["all","image","video","audio","button","paragraph"]:"all"!==e||n.checked?(this.areas.includes("all")&&this.areas.splice(this.areas.indexOf("all"),1),this.areas.includes(e)?this.areas=this.areas.filter(function(n){return n!=e}):this.areas.push(e),this.areas.length>=5&&!this.areas.includes("all")&&this.areas.unshift("all")):this.areas=[],this.settingsForm.patchValue({areas:this.areas})}},{key:"showConditionModal",value:function(){this.displayConditions=!0}},{key:"navigate",value:function(){this.router.navigate(["/adapter",this.navigateId])}}]),n}(),A.\u0275fac=function(e){return new(e||A)(l.Ib(p.h),l.Ib(u.a),l.Ib(d.b),l.Ib(c.d))},A.\u0275cmp=l.Cb({type:A,selectors:[["app-adapter"]],decls:26,vars:7,consts:[[1,"main-content"],[1,"dop-zone","p-grid"],[1,"p-col-1","p-md-3","p-lg-3"],[1,"p-col-10","p-md-6","p-lg-6"],["accept",".zip,.rar",3,"change",4,"ngIf"],["class","p-col-12 p-md-12 p-lg-12 p-grid",4,"ngIf"],[1,"p-grid"],["class","spiner",4,"ngIf"],["header","T\xe9rminos y condiciones de uso",3,"visible","visibleChange"],["pTemplate","footer"],["accept",".zip,.rar",3,"change"],["label","Seleccionar archivo","icon","pi pi-cloud-upload","styleClass","p-button-lg"],["ngProjectAs","ngx-dropzone-preview",5,["ngx-dropzone-preview"],3,"removable","file","removed",4,"ngIf"],["ngProjectAs","ngx-dropzone-preview",5,["ngx-dropzone-preview"],3,"removable","file","removed"],[1,"p-col-12","p-md-12","p-lg-12","p-grid"],[1,"p-col-12","p-md-6","p-lg-5",3,"formGroup","ngSubmit"],[1,"methods"],[1,"p-field-radiobutton"],["name","method","value","handbook","inputId","handbook","formControlName","method"],["for","handbook"],["name","method","value","automatic","inputId","automatic","formControlName","method"],["for","automatic"],["name","method","value","mixed","inputId","mixed","formControlName","method"],["for","mixed"],["class","p-col-12 p-md-6 p-lg-6",4,"ngFor","ngForOf"],[1,"button"],["type","submit","label","Cargar","icon","pi pi-cloud-upload"],[1,"p-col-12","p-md-6","p-lg-6"],[1,"p-field-checkbox"],["formControlName","areas",3,"value","inputId","onChange"],[3,"for"],[1,"spiner"],[4,"ngIf"],[4,"ngIf","ngIfElse"],["uploadProgress",""],["color","danger",3,"value"],[1,"btn-next"],["type","submit","label","Continuar","iconPos","right","icon","pi pi-angle-right",3,"click",4,"ngIf"],["type","submit","label","Continuar","iconPos","right","icon","pi pi-angle-right",3,"click"],["icon","pi pi-times","label","Cancelar","styleClass","p-button-text",3,"click"],["icon","pi pi-check","label","Aceptar","styleClass","p-button-text",3,"click"]],template:function(e,n){1&e&&(l.Ob(0,"div",0),l.Ob(1,"div",1),l.Jb(2,"div",2),l.Ob(3,"div",3),l.Cc(4,N,6,1,"ngx-dropzone",4),l.Nb(),l.Jb(5,"div",2),l.Cc(6,j,23,2,"div",5),l.Ob(7,"div",6),l.Cc(8,_,12,9,"div",7),l.Nb(),l.Nb(),l.Nb(),l.Ob(9,"p-dialog",8),l.Vb("visibleChange",function(e){return n.displayConditions=e}),l.Ob(10,"p"),l.Ec(11,"La Universidad Polit\xe9cnica Salesiana conjunto con el grupo de investigaci\xf3n EduTech pone a disposici\xf3n de esta plataforma de forma gratuita y sin \xe1nimos de lucro, para el desarrollo de la educaci\xf3n equitativa."),l.Nb(),l.Ob(12,"p"),l.Ec(13,"Al aceptar estos t\xe9rminos y condiciones de uso de la aplicaci\xf3n el usuario acepta de forma voluntaria los siguientes t\xe9rminos:"),l.Nb(),l.Ob(14,"p"),l.Ec(15,"Los datos registrados y recopilados del objeto de aprendizaje se destruyen en 24 horas por lo que el sistema no guarda datos de ning\xfan objeto de aprendizaje subido a la plataforma."),l.Nb(),l.Ob(16,"p"),l.Ec(17,"Los datos que se guardan son solo informaci\xf3n de navegaci\xf3n como informaci\xf3n del navegador y datos estad\xedsticos sobre el resumen de lo realizado en esta aplicaci\xf3n con la finalidad re recopilar datos estad\xedsticos para mejorar la aplicaci\xf3n."),l.Nb(),l.Ob(18,"p"),l.Ec(19,"Este sistema no guarda datos personales de ning\xfan usuario que navegue o que haga uso de esta plataforma."),l.Nb(),l.Ob(20,"p"),l.Ec(21,"Los archivos subidos no se compartir\xe1n con ninguna persona o instituci\xf3n publica o privada de igual manera los archivos generados pertenecen solo al usuario de la sesi\xf3n actual que est\xe1 navegando."),l.Nb(),l.Ob(22,"p"),l.Ec(23,"El usuario esta en su responsabilidad de subir archivos \xfanicamente recursos educativos (Objetos de Aprendizaje), se admiten solo archivos comprimidos con formato zip."),l.Nb(),l.Cc(24,w,2,0,"ng-template",9),l.Nb(),l.Jb(25,"app-file-upload")),2&e&&(l.xb(4),l.fc("ngIf",!n.loader),l.xb(2),l.fc("ngIf",n.file&&!n.loader),l.xb(2),l.fc("ngIf",n.loader),l.xb(1),l.Ac(l.hc(6,q)),l.fc("visible",n.displayConditions))},directives:[r.j,b.a,p.j,g,f.a,f.d,v.a,f.c,d.o,d.k,d.e,h.a,d.j,d.d,r.i,m.a,O.a,C.a],styles:[".dop-zone[_ngcontent-%COMP%]{min-height:75vh;display:flex;align-items:center;margin:20px}.dop-zone[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]{margin:10px 0}.dop-zone[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .p-field-checkbox[_ngcontent-%COMP%], .dop-zone[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .p-field-radiobutton[_ngcontent-%COMP%]{margin:0}.dop-zone[_ngcontent-%COMP%]   .p-grid[_ngcontent-%COMP%]{display:flex;justify-content:center}.dop-zone[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]{margin-top:10px;text-align:center}.methods[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.spiner[_ngcontent-%COMP%]{text-align:center;margin-bottom:15px}.btn-next[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-top:15px}"]}),A),data:{breadcrumb:null}},{path:":id",loadChildren:function(){return a.e(14).then(a.bind(null,"5YYF")).then(function(e){return e.AdapterDetailModule})},data:{breadcrumb:"Edici\xf3n de objeto de aprendizaje"}}],Z=((F=function n(){e(this,n)}).\u0275mod=l.Gb({type:F}),F.\u0275inj=l.Fb({factory:function(e){return new(e||F)},imports:[[c.h.forChild(J)],c.h]}),F),L=a("PCNd"),V=a("QGhL"),D=((S=function n(){e(this,n)}).\u0275mod=l.Gb({type:S}),S.\u0275inj=l.Fb({factory:function(e){return new(e||S)},imports:[[r.b,Z,f.b,L.a,V.a,d.m]]}),S)},t3rE:function(n,o,a){"use strict";a.d(o,"a",function(){return p});var i=a("XNiG"),r=a("lJxs"),c=a("AytR"),s=a("fXoL"),d=a("tk/3"),l=c.a.baseUrl,p=function(){var n=function(){function n(t){e(this,n),this.http=t,this.enviarMensajeSubject=new i.a,this.enviarMensajeObservable=this.enviarMensajeSubject.asObservable()}return t(n,[{key:"enviarMensaje",value:function(e){this.mensaje=e,this.enviarMensajeSubject.next(e)}},{key:"uploadObject",value:function(e){var n=new FormData;return n.append("file",e.file),n.append("areas",e.areas),n.append("method",e.method),this.http.post(l+"/learning_objects/",n,{reportProgress:!0,observe:"events",responseType:"json"})}},{key:"getLearningsObjects",value:function(){}},{key:"getLearningObject",value:function(e){return this.http.get("".concat(l,"/learning_objects/").concat(e))}},{key:"getImagesForPge",value:function(e){return this.http.get("".concat(l,"/page/image/").concat(e)).pipe(Object(r.a)(function(e){return e}))}},{key:"updateImage",value:function(e,n){return this.http.put("".concat(l,"/page/image/").concat(n),e).pipe(Object(r.a)(function(e){return e}))}},{key:"getAudiosForPge",value:function(e){return this.http.get("".concat(l,"/page/audio/").concat(e)).pipe(Object(r.a)(function(e){return e}))}},{key:"sentCreateAudio",value:function(e){return this.http.post(l+"/page/audio",e).pipe(Object(r.a)(function(e){return e}))}},{key:"updateAudio",value:function(e,n){return this.http.put("".concat(l,"/page/audio/").concat(n),e).pipe(Object(r.a)(function(e){return e}))}},{key:"getDownloadFileZip",value:function(e){return this.http.get("".concat(l,"/compress/learningObject/").concat(e)).pipe(Object(r.a)(function(e){return e}))}}]),n}();return n.\u0275fac=function(e){return new(e||n)(s.Sb(d.a))},n.\u0275prov=s.Eb({token:n,factory:n.\u0275fac,providedIn:"root"}),n}()}}])}();