"use strict";(self.webpackChunkmirage=self.webpackChunkmirage||[]).push([[219],{5219:(D,d,r)=>{r.r(d),r.d(d,{DeleteModule:()=>y});var g=r(8692),p=r(9004),m=r(8239),e=r(6796),s=r(865),h=r(3651);function l(t,c){1&t&&(e.ynx(0),e.TgZ(1,"div"),e._UZ(2,"p-progressSpinner",3),e.qZA(),e.BQk())}function f(t,c){if(1&t&&(e.TgZ(0,"div",4)(1,"h2"),e._uU(2,"DELETE SUCCESS"),e.qZA(),e.TgZ(3,"p"),e._uU(4),e.qZA(),e.TgZ(5,"p"),e._uU(6,"Thank you for using our service."),e.qZA()()),2&t){const o=e.oxw();e.xp6(4),e.hij("",o.resum," files delete.")}}const a=[{path:"",component:(()=>{class t{constructor(o,u,v){this.route=o,this.router=u,this.learningObjectService=v,this.loader=!1,this.key=this.route.snapshot.queryParamMap.get("key"),this.key||this.router.navigate(["/notfound"])}ngOnInit(){this.loadData()}loadData(){var o=this;return(0,m.Z)(function*(){try{o.loader=!0;let u=yield o.learningObjectService.delete({key:o.key}).toPromise();o.resum=u.data,o.loader=!1}catch(u){console.log(u),o.router.navigate(["/notfound"])}})()}}return t.\u0275fac=function(o){return new(o||t)(e.Y36(p.gz),e.Y36(p.F0),e.Y36(s.N))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-delete"]],decls:4,vars:2,consts:[[1,"main-content","animate__animated","animate__fadeIn"],[4,"ngIf","ngIfElse"],["elseTemplate",""],["styleClass","w-4rem h-4rem","strokeWidth","8","animationDuration",".5s"],[1,"terms-content"]],template:function(o,u){if(1&o&&(e.TgZ(0,"div",0),e.YNc(1,l,3,0,"ng-container",1),e.YNc(2,f,7,1,"ng-template",null,2,e.W1O),e.qZA()),2&o){const v=e.MAs(3);e.xp6(1),e.Q6J("ngIf",u.loader)("ngIfElse",v)}},dependencies:[g.O5,h.G],styles:[".main-content[_ngcontent-%COMP%]{min-height:80vh;display:flex;justify-content:center;align-items:center}"]}),t})()}];let i=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[p.Bz.forChild(a),p.Bz]}),t})(),y=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[g.ez,i,h.L]}),t})()},865:(D,d,r)=>{r.d(d,{N:()=>h});var g=r(8002),p=r(2340),m=r(6796),e=r(5732);const s=p.N.baseUrl;let h=(()=>{class l{constructor(n){this.http=n,this.roa_api=p.N.repoUrl}uploadObject(n){let a=new FormData;return a.append("file",n.file),a.append("areas",n.areas),a.append("method",n.method),this.http.post(`${s}/learning_objects/`,a,{reportProgress:!0,observe:"events",responseType:"json"})}getLearningsObjects(){return this.http.get(`${s}/learning_objects/`)}getLearningObject(n){return this.http.get(`${s}/learning_objects/${n}`)}getDownloadFileZip(n,a){return this.http.post(`${s}/compress/learningObject/${n}`,a).pipe((0,g.U)(i=>i))}getPosition(){return new Promise((n,a)=>{navigator.geolocation.getCurrentPosition(i=>{n({lng:i.coords.longitude,lat:i.coords.latitude})},i=>{a(i)})})}getTagAdapted(n){return this.http.get(`${s}/adapted/tag/${n}`).pipe((0,g.U)(a=>a))}updateLearningObject_file_adapted(n,a){return this.http.put(`${s}/adapted/learningObject/${n}`,a).pipe((0,g.U)(i=>i))}getMetadataInfo(){return this.http.get(`${s}/metadata_info/`)}postROA(n){return this.http.post(`${this.roa_api}/learning-object-oer/`,n)}delete(n){return this.http.get(`${s}/delete/`,{params:n})}}return l.\u0275fac=function(n){return new(n||l)(m.LFG(e.eN))},l.\u0275prov=m.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"}),l})()}}]);