webpackJsonp([11],{762:function(e,t,r){var o=r(16)(r(854),r(826),null,null);o.options.__file="/Users/liyang/MyFiles/code/iview-admin-dev/src/views/page/sys/office/form.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] form.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},770:function(e,t,r){"use strict";t.__esModule=!0;var o=r(110),a=function(e){return e&&e.__esModule?e:{default:e}}(o);t.default=a.default||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e}},771:function(e,t,r){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function a(e){return JSON.parse(e)}function n(e){return(0,f.default)(e,null,"\t")}function s(e,t,r){for(var o=e.toString().length;o<t;)e+=r,o++;return e}function i(e){return/.*[\u4e00-\u9fa5]+.*$/.test(e)}function l(e,t){var r=new Date,o=r.getFullYear(),a=r.getMonth()+1;1==String(a).length&&(a="0"+String(a));var n=r.getDate(),s=o+"-"+a+"-"+n;"now"==e&&(e=s),"now"==t&&(t=s);var i=new Date(Date.parse(e)).getTime()/864e5;return new Date(Date.parse(t)).getTime()/864e5-i}function u(e,t){var r=0,o=0;e.map(function(e,t){parseFloat(e)&&(r+=1,o+=parseFloat(e))});var a=o/r;return a?a.toFixed(t):"0"}Object.defineProperty(t,"__esModule",{value:!0}),t.tool=void 0;var d=r(53),f=o(d),c=r(41),m=o(c),p=function e(t){var r;if("object"==(void 0===t?"undefined":(0,m.default)(t)))if(null===t)r=null;else if(t instanceof Array){r=[];for(var o=0,a=t.length;o<a;o++)r.push(e(t[o]))}else{r={};for(var n in t)r[n]=e(t[n])}else r=t;return r};Date.prototype.Format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var r in t)new RegExp("("+r+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[r]:("00"+t[r]).substr((""+t[r]).length)));return e};var h={clone:p,toJson:a,toString:n,pad:s,hasChinese:i,getDateDiff:l,pingjun:u};t.tool=h},772:function(e,t,r){var o=r(16)(r(774),r(773),null,null);o.options.__file="/Users/liyang/MyFiles/code/iview-admin-dev/src/components/form/save/bar.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] bar.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},773:function(e,t,r){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Card",{staticStyle:{margin:"10px auto"},attrs:{"dis-hover":""}},[r("div",{staticClass:"card-inner-m-10"},[r("Button",{attrs:{size:"large",type:"primary"},on:{click:e.save}},[e._v("保存")])],1)])},staticRenderFns:[]},e.exports.render._withStripped=!0},774:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={methods:{save:function(){this.$emit("save")}}}},778:function(e,t,r){r(157),r(111),e.exports=r(779)},779:function(e,t,r){var o=r(34),a=r(156);e.exports=r(8).getIterator=function(e){var t=a(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return o(t.call(e))}},780:function(e,t,r){e.exports={default:r(778),__esModule:!0}},784:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(53),a=function(e){return e&&e.__esModule?e:{default:e}}(o);t.default={data:function(){return{closeMe:{currentPageName:"",to:{name:"home_index"}}}},created:function(){this.closeMe.currentPageName=this.$route.name},methods:{closeMeTo:function(e){var t=e||this.closeMe.to;this.$store.commit("removeTag",this.closeMe.currentPageName),this.$store.commit("closePage",this.closeMe.currentPageName),localStorage.pageOpenedList=(0,a.default)(this.$store.state.pageOpenedList),this.$router.push(t)}}}},785:function(e,t,r){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(770),n=o(a),s=r(285),i=o(s),l=r(780),u=o(l),d=r(109),f=r(771);t.default={data:function(){return{setting:{brotherName:"home_index",mode:"new"},ready:!1,form:{}}},watch:{"$route.params":function(e){this.checkMyParams()}},created:function(){this.checkMyParams()},methods:{checkMyParams:function(){var e=this,t=function(t){if(e.dataToFrom)e.dataToFrom(t);else{e.form=f.tool.clone(e.formEmpty);var r=t.role||t,o=!0,a=!1,n=void 0;try{for(var s,l=(0,u.default)((0,i.default)(e.form));!(o=(s=l.next()).done);o=!0){var d=s.value;void 0!==r[d]&&(e.form[d]=r[d])}}catch(e){a=!0,n=e}finally{try{!o&&l.return&&l.return()}finally{if(a)throw n}}}};this.ready=!1;var r=f.tool.clone(this.$route.params);if(r.for===this.setting.myName){r.from&&(this.setting.brotherName=r.from),r.mode&&(this.setting.mode=r.mode),this.initStartHandler&&this.initStartHandler();if("new"===(r.dataGetWay||"row"))return this.form=f.tool.clone(this.formEmpty),void(0,d.axiosToken)({url:this.setting.API+"/"+r.dataGetId}).then(function(o){0===o.data.code&&(t(o.data),e.formDataMaker&&e.formDataMaker(r.data.row),e.ready=!0)});!this.paramsValidate||this.paramsValidate(r)?r.data&&r.data.row?(delete r.data.row._index,delete r.data.row._rowKey,t(r.data.row),this.formDataMaker&&this.formDataMaker(r.data.row)):this.form=f.tool.clone(this.formEmpty):(this.$Message.error("页面参数校验失败，即将自动关闭"),this.paramsErrorHandler()),this.ready=!0}else this.paramsErrorHandler()},paramsErrorHandler:function(){this.closeMeTo({name:this.setting.brotherName})},returnBrother:function(){this.closeMeTo({name:this.setting.brotherName,params:{for:this.setting.brotherName,data:{reload:!0}}})},submitHandler:function(){var e=this,t=function(t){0===t.data.code?(e.$Message.success(t.data.msg),e.returnBrother()):(e.$Message.error(t.data.msg),e.ready=!0)};if(""===this.setting.mode)return void this.$Message.error("表单状态不合法");this.$refs.form.validate(function(r){r?(e.ready=!1,"new"===e.setting.mode?(0,d.axiosToken)({url:e.setting.API,method:"post",data:(0,n.default)({},e.form)}).then(function(e){t(e)}):"edit"===e.setting.mode&&(0,d.axiosToken)({url:e.setting.API+"/"+e.form.id,method:"put",data:(0,n.default)({},e.form)}).then(function(e){t(e)})):e.$Message.error("表单校验失败")})}}}},786:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={methods:{tryFormValidate:function(e){var t=!1;return this.$refs[e].validate(function(e){t=e}),t},mixinFormReset:function(e){this.$refs[e].resetFields()}}}},826:function(e,t,r){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticStyle:{position:"relative"}},[r("Input",{staticStyle:{display:"none"},model:{value:e.oldCode,callback:function(t){e.oldCode=t},expression:"oldCode"}}),e._v(" "),r("Form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-position":"top"}},[r("Row",{attrs:{gutter:10}},[r("Col",{attrs:{span:"4"}},[r("FormItem",{attrs:{label:"机构编码",prop:"code"}},[r("Input",{attrs:{placeholder:"code"},model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)},expression:"form.code"}})],1)],1),e._v(" "),r("Col",{attrs:{span:"4"}},[r("FormItem",{attrs:{label:"机构名称",prop:"name"}},[r("Input",{attrs:{placeholder:"name"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),r("Col",{attrs:{span:"4"}},[r("FormItem",{attrs:{label:"负责人",prop:"primaryPerson.name"}},[r("Input",{attrs:{placeholder:"primaryPerson.name"},model:{value:e.form.primaryPerson.name,callback:function(t){e.$set(e.form.primaryPerson,"name",t)},expression:"form.primaryPerson.name"}})],1)],1),e._v(" "),r("Col",{attrs:{span:"4"}},[r("FormItem",{attrs:{label:"机构类型",prop:"type"}},[r("DictSelect",{attrs:{value:e.form.type,type:"sys_office_type"},on:{"update:value":function(t){e.$set(e.form,"type",t)}}})],1)],1),e._v(" "),r("Col",{attrs:{span:"4"}},[r("FormItem",{attrs:{label:"机构级别",prop:"grade"}},[r("DictSelect",{attrs:{value:e.form.grade,type:"sys_office_grade"},on:{"update:value":function(t){e.$set(e.form,"grade",t)}}})],1)],1),e._v(" "),r("Col",{attrs:{span:"4"}},[r("FormItem",{attrs:{label:"上级机构",prop:"parent.id"}},[r("OfficeMenu",{attrs:{value:e.form.parent.id},on:{"update:value":function(t){e.$set(e.form.parent,"id",t)}}})],1)],1),e._v(" "),r("Col",{attrs:{span:"4"}},[r("FormItem",{attrs:{label:"是否可用",prop:"useable"}},[r("DictRadio",{attrs:{value:e.form.useable,type:"yes_no"},on:{"update:value":function(t){e.$set(e.form,"useable",t)}}})],1)],1),e._v(" "),r("Col",{attrs:{span:"8"}},[r("FormItem",{attrs:{label:"备注",prop:"remarks"}},[r("Input",{attrs:{type:"textarea",placeholder:"remarks"},model:{value:e.form.remarks,callback:function(t){e.$set(e.form,"remarks",t)},expression:"form.remarks"}})],1)],1)],1)],1),e._v(" "),r("SaveBar",{on:{save:e.submitHandler}}),e._v(" "),r("Modal",{attrs:{title:"选择机构"},model:{value:e.modal,callback:function(t){e.modal=t},expression:"modal"}},[r("div",{staticStyle:{height:"400px",overflow:"scroll"}},[r("Ztree",{ref:"ztree",attrs:{api:"/a/sys/officeTree",initAfterSync:!0},on:{onClick:e.zTreeOnClick}})],1)]),e._v(" "),e.ready?e._e():r("Spin",{attrs:{size:"large",fix:""}})],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},854:function(e,t,r){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(785),n=o(a),s=r(784),i=o(s),l=r(786),u=o(l),d=r(109),f=r(772),c=o(f);t.default={name:"sys-office-form",mixins:[n.default,i.default,u.default],components:{SaveBar:c.default},data:function(){var e=this;return{modal:!1,setting:{myName:"sys-office-form",API:"/a/sys/office"},formEmpty:{id:"",code:"",name:"",primaryPerson:{name:""},useable:"1",type:"",grade:"",parent:{id:"",name:"请选择"},remarks:""},rules:{code:[{validator:function(t,r,o){if(!r)return o(new Error("必填"));(0,d.axiosToken)({url:"/a/sys/office/checkOfficeCode?oldCode="+e.oldCode+"&code="+e.form.code}).then(function(e){e.data?o():o(new Error("机构编码已存在"))})},trigger:"blur"}],name:[{required:!0,message:"必填",trigger:"blur"}],type:[{required:!0,message:"必填",trigger:"change"}]},oldCode:""}},created:function(){this.oldCode=this.form.code},methods:{zTreeOnClick:function(e,t,r){this.form.parent.id=r.id,this.form.parent.name=r.name}}}}});