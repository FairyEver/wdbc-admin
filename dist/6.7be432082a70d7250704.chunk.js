webpackJsonp([6],{767:function(t,e,n){var r=n(16)(n(868),n(827),null,null);r.options.__file="/Users/liyang/MyFiles/code/iview-admin-dev/src/views/page/sys/role/list.vue",r.esModule&&Object.keys(r.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] list.vue: functional components are not supported with templates, they should use render functions."),t.exports=r.exports},774:function(t,e,n){"use strict";e.__esModule=!0;var r=n(110),a=function(t){return t&&t.__esModule?t:{default:t}}(r);e.default=a.default||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}},775:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function a(t){return JSON.parse(t)}function o(t){return(0,d.default)(t,null,"\t")}function i(t,e,n){for(var r=t.toString().length;r<e;)t+=n,r++;return t}function s(t){return/.*[\u4e00-\u9fa5]+.*$/.test(t)}function l(t,e){var n=new Date,r=n.getFullYear(),a=n.getMonth()+1;1==String(a).length&&(a="0"+String(a));var o=n.getDate(),i=r+"-"+a+"-"+o;"now"==t&&(t=i),"now"==e&&(e=i);var s=new Date(Date.parse(t)).getTime()/864e5;return new Date(Date.parse(e)).getTime()/864e5-s}function u(t,e){var n=0,r=0;t.map(function(t,e){parseFloat(t)&&(n+=1,r+=parseFloat(t))});var a=r/n;return a?a.toFixed(e):"0"}Object.defineProperty(e,"__esModule",{value:!0}),e.tool=void 0;var c=n(53),d=r(c),f=n(41),p=r(f),h=function t(e){var n;if("object"==(void 0===e?"undefined":(0,p.default)(e)))if(null===e)n=null;else if(e instanceof Array){n=[];for(var r=0,a=e.length;r<a;r++)n.push(t(e[r]))}else{n={};for(var o in e)n[o]=t(e[o])}else n=e;return n};Date.prototype.Format=function(t){var e={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var n in e)new RegExp("("+n+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[n]:("00"+e[n]).substr((""+e[n]).length)));return t};var m={clone:h,toJson:a,toString:o,pad:i,hasChinese:s,getDateDiff:l,pingjun:u};e.tool=m},779:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(774),o=r(a),i=n(156),s=r(i),l=n(109),u=n(775);e.default={data:function(){return{setting:{columnsOptionsAPI:"/a/fns/getDictList",formDataGetWay:"row",mockBaseUrl:"http://www.easy-mock.com/mock/5a09103ac645f122782988de/wdbc-admin"},page:{current:1,total:0,size:10},table:{data:[],dataTransformOptionDict:{},ready:!1,loading:!1},extraData:{dictOptions:[]}}},created:function(){var t=this;this.syncdataTransformOptionDict().then(function(){t.syncTableOptions(),t.syncTableData()})},watch:{"$route.params":function(t){this.checkMyParams()}},methods:{checkMyParams:function(){var t=u.tool.clone(this.$route.params);t.for===this.setting.myName&&t.data.reload&&(this.page.current=1,this.page.total=0,this.syncTableData())},pageChangeHandler:function(t){this.page.current=t,this.syncTableData()},syncdataTransformOptionDict:function(){var t=this;return new s.default(function(e,n){var r=t.table.dataTransformOptionDictSetting||[];r.length>0?(0,l.all)(r.map(function(t){return(0,l.axiosToken)({url:t.API,data:t.data}).catch(function(t){return(0,l.axiosErrorHandler)(t)})})).then((0,l.spread)(function(){for(var n=arguments.length,a=Array(n),o=0;o<n;o++)a[o]=arguments[o];a.forEach(function(e,n){t.table.dataTransformOptionDict[r[n].name]=e.data.dictList}),e()})):e()})},syncTableOptions:function(){var t=this,e=this.table.columns.filter(function(t){return t.control});if(0===e.length)return void(this.table.ready=!0);var n=e.filter(function(t){return"DictSelect"===t.control});n.length>0?(0,l.all)(n.map(function(e){return(0,l.axiosToken)({url:t.setting.columnsOptionsAPI,data:{type:e.key}}).catch(function(t){return(0,l.axiosErrorHandler)(t)})})).then((0,l.spread)(function(){for(var e=arguments.length,r=Array(e),a=0;a<e;a++)r[a]=arguments[a];r.forEach(function(e,r){var a=e.data.dictList.map(function(t){return{label:t.label,value:t.value}}),o=n[r].key;t.table.columns.forEach(function(t){t.key===o&&(t.props?t.props.options=a:t.props={options:a})})}),t.table.ready=!0})):this.table.ready=!0},syncTableData:function(){var t=this;this.table.loading=!0;var e=this.searchForm?this.searchForm:{},n=function(e){console.log("***表格数据***"),console.log(e.data),console.log("***表格数据结束***"),e.data.page?(t.page.total=e.data.page.total,r(e.data.page.list),e.data.typeList&&(t.extraData.dictOptions=e.data.typeList.map(function(t){return{value:t,label:t}}))):r(e.data.list),t.table.loading=!1,t.$Message.success("数据重载完毕")},r=function(e){t.dataTransformer?t.table.data=t.dataTransformer(e):t.table.data=e};this.setting.mock?l.axios.get(this.setting.mockBaseUrl+this.setting.API).then(function(t){n(t)}):(0,l.axiosToken)({url:this.setting.API,data:(0,o.default)({pageNo:this.page.current,pageSize:this.page.size},e)}).then(function(t){return n(t)}).catch(function(t){return(0,l.axiosErrorHandler)(t)})},tableHandler:function(t){if(this[t]){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];this[t].apply(this,n)}},enterHandler:function(t){this.table.data[t.row][t.key]!==t.value&&(this.table.data[t.row][t.key]=t.value,console.log("更新了table.data第"+t.row+"行的"+t.key+" = "+t.value))},search:function(){this.page.current=1,this.syncTableData()},add:function(){this.$router.push({name:this.setting.brotherName,params:{for:this.setting.brotherName,from:this.setting.myName,mode:"new",dataGetWay:this.setting.formDataGetWay,dataGetId:"id",data:{}}})},edit:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"edit";this.$router.push({name:this.setting.brotherName,params:{for:this.setting.brotherName,from:this.setting.myName,mode:n,dataGetWay:this.setting.formDataGetWay,dataGetId:t.id,data:{row:t}}})},saveLine:function(t,e){},saveAll:function(){this.$Message.info("全部保存")},delete:function(t,e){var n=this;(0,l.axiosToken)({url:this.setting.API+"/"+t.id,method:"delete"}).then(function(t){n.$Message.success("删除成功"),n.syncTableData()}).catch(function(t){return(0,l.axiosErrorHandler)(t)})}}}},780:function(t,e,n){var r=n(16)(n(785),n(781),null,null);r.options.__file="/Users/liyang/MyFiles/code/iview-admin-dev/src/components/table/table.vue",r.esModule&&Object.keys(r.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] table.vue: functional components are not supported with templates, they should use render functions."),t.exports=r.exports},781:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("Table",{attrs:{loading:t.loading,columns:t.columnsComputed,data:t.data,border:!0,stripe:!0,size:"small"}})},staticRenderFns:[]},t.exports.render._withStripped=!0},785:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(159),o=r(a),i=n(786),s=r(i),l=n(787),u=r(l);e.default={mixins:[s.default,u.default],props:{loading:{default:!0},columns:{default:function(){return[]}},columnsEdit:{default:function(){return[]}},columnsExtend:{default:function(){return[]}},data:{default:function(){return[]}}},computed:{columnsComputed:function(){var t=this;return[].concat((0,o.default)(this.columns.map(function(e,n){return e.align="center",e.control&&(e.render=function(n,r){return n("div",[t.inputBuilder(e,n,r)])}),e})),(0,o.default)(this.columnsExtend.map(function(e,n){return{title:e.title||"操作",width:e.width,align:"center",key:"action"+n,fixed:"right",render:function(n,r){return n("div",[e.children.map(function(a,o){return t.buttonBuilder(e,n,r,a,o,!a.p||t.$root.p(a.p))})])}}})))}}}},786:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(774),a=function(t){return t&&t.__esModule?t:{default:t}}(r);e.default={methods:{buttonBuilder:function(t,e,n,r,o){var i=this;if(!(arguments.length>5&&void 0!==arguments[5])||arguments[5]){var s=r.text?[r.text]:[],l=r.icon?[e("Icon",{props:{type:r.icon?r.icon:"edit"},style:{marginRight:r.text?"5px":"0px"}})]:[];return e("Button",{props:(0,a.default)({},this.buttonPropBuilder(t,e,n,r,o)),style:{marginRight:o===t.children.length-1?"0px":"5px"},on:{click:function(){i.$emit("emit",r.action,n.row,n.index)}}},[].concat(l,s))}},buttonPropBuilder:function(t,e,n,r,o){var i={size:"small"};return(0,a.default)({type:"edit"===r.action?"primary":"ghost"},i)}}}},787:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(774),a=function(t){return t&&t.__esModule?t:{default:t}}(r);e.default={methods:{inputBuilder:function(t,e,n){var r=this,o=n.row[n.column.key];return e(t.control.split("|")[0],{props:(0,a.default)({value:o},function(){var e=t.props||{};switch(t.control.split("|")[0]){case"Input":case"i-switch":return(0,a.default)({},e);case"DatePicker":switch(t.control.split("|")[1]){case"datetime":return(0,a.default)({type:t.control.split("|")[1],confirm:!0},e);default:return(0,a.default)({type:t.control.split("|")[1]},e)}case"DictSelect":return(0,a.default)({mode:"table"},e);default:return(0,a.default)({},e)}}()),on:(0,a.default)({},function(){switch(t.control.split("|")[0]){case"Input":return{"on-change":function(t){o=t.target.value},"on-blur":function(){r.$emit("enter",{row:n.index,key:n.column.key,value:o})},"on-enter":function(){r.$emit("enter",{row:n.index,key:n.column.key,value:o})}};case"i-switch":return{"on-change":function(t){r.$emit("enter",{row:n.index,key:n.column.key,value:t})}};case"DatePicker":switch(t.control.split("|")[1]){case"datetime":return{"on-change":function(t){o=t},"on-ok":function(){r.$emit("enter",{row:n.index,key:n.column.key,value:o})}};default:return{"on-change":function(t){r.$emit("enter",{row:n.index,key:n.column.key,value:t})}}}case"DictSelect":return{"on-change":function(t){r.$emit("enter",{row:n.index,key:n.column.key,value:t})}};default:return{}}}())})}}}},807:function(t,e,n){var r=n(16)(n(866),n(831),null,null);r.options.__file="/Users/liyang/MyFiles/code/iview-admin-dev/src/views/page/sys/role/assign.vue",r.esModule&&Object.keys(r.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] assign.vue: functional components are not supported with templates, they should use render functions."),t.exports=r.exports},827:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("Form",{ref:"searchForm",attrs:{"label-position":"top",inline:""}},[n("FormItem",{attrs:{label:"新增"}},[n("Button",{attrs:{type:"ghost"},on:{click:t.add}},[n("Icon",{attrs:{type:"plus"}})],1)],1)],1),t._v(" "),n("XTable",{attrs:{loading:t.table.loading,columns:t.table.columns,"columns-extend":t.table.columnsExtend,data:t.table.data},on:{emit:t.tableHandler}}),t._v(" "),n("Modal",{attrs:{title:"分配角色",width:"1000"},on:{"on-ok":t.assignModalOk},model:{value:t.assignSetting.modal.show,callback:function(e){t.$set(t.assignSetting.modal,"show",e)},expression:"assignSetting.modal.show"}},[n("Assign",{ref:"assign"})],1)],1)},staticRenderFns:[]},t.exports.render._withStripped=!0},831:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticStyle:{background:"#eee",margin:"-16px",padding:"10px"}},[n("Row",{attrs:{gutter:10}},[n("Col",{attrs:{span:"8"}},[n("Card",{attrs:{"dis-hover":"",bordered:!1}},[n("p",{attrs:{slot:"title"},slot:"title"},[n("Icon",{attrs:{type:"briefcase"}}),t._v(" 所在部门")],1),t._v(" "),n("div",{staticStyle:{height:"300px",overflow:"scroll"}},[n("Ztree",{ref:"ztree",attrs:{api:"/a/sys/officeTree"},on:{onClick:t.zTreeOnClick}})],1)])],1),t._v(" "),n("Col",{attrs:{span:"8"}},[n("Card",{attrs:{"dis-hover":"",bordered:!1}},[n("p",{attrs:{slot:"title"},slot:"title"},[n("Icon",{attrs:{type:"person-stalker"}}),t._v(" 待选人员")],1),t._v(" "),n("div",{staticStyle:{height:"300px",overflow:"scroll",position:"relative"}},[n("div",{staticStyle:{"margin-bottom":"10px"}},[n("Input",{attrs:{icon:"ios-clock-outline",placeholder:"关键字过滤"},model:{value:t.filterText,callback:function(e){t.filterText=e},expression:"filterText"}})],1),t._v(" "),t._l(t.userListFilted,function(e,r){return n("Tag",{key:r,attrs:{type:"dot",color:t.isSelected(e.id)?"green":"default"},nativeOn:{click:function(n){t.addUser(e)}}},[t._v(t._s(e.name))])}),t._v(" "),t.userListLoading?n("Spin",{attrs:{fix:""}}):t._e()],2)])],1),t._v(" "),n("Col",{attrs:{span:"8"}},[n("Card",{attrs:{"dis-hover":"",bordered:!1}},[n("p",{attrs:{slot:"title"},slot:"title"},[n("Icon",{attrs:{type:"person"}}),t._v(" 已选人员")],1),t._v(" "),n("div",{staticStyle:{"min-height":"300px",overflow:"scroll",position:"relative"}},[t._l(t.selectedUserList,function(e,r){return n("Tag",{key:r,attrs:{type:"dot",color:"green",closable:""},on:{"on-close":function(e){t.removeUser(r)}}},[t._v(t._s(e.name))])}),t._v(" "),t.selectedUserListLoading?n("Spin",{attrs:{fix:""}}):t._e()],2)])],1)],1)],1)},staticRenderFns:[]},t.exports.render._withStripped=!0},866:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(109);e.default={data:function(){return{filterText:"",userList:[],selectedUserList:[],row:{},userListLoading:!1,selectedUserListLoading:!1}},computed:{userListFilted:function(){var t=this;return""===this.filterText?this.userList:this.userList.filter(function(e){return e.name.indexOf(t.filterText)>=0})}},methods:{zTreeOnClick:function(t,e,n){var a=this;this.userListLoading=!0,(0,r.axiosToken)({url:"a/sys/role/user/"+n.id}).then(function(t){a.userListLoading=!1,a.userList=t.data.userList}).catch(function(t){return(0,r.axiosErrorHandler)(t)})},syncSelected:function(){var t=this;this.selectedUserListLoading=!0,(0,r.axiosToken)({url:"a/sys/role/"+this.row.id+"/user"}).then(function(e){t.selectedUserListLoading=!1,t.selectedUserList=e.data.userList}).catch(function(t){return(0,r.axiosErrorHandler)(t)})},isSelected:function(t){return this.selectedUserList.find(function(e){return e.id===t})},addUser:function(t){this.isSelected(t.id)?this.$Message.error("已经添加的人员"):this.selectedUserList.push(t)},removeUser:function(t){this.selectedUserList.splice(t,1)},init:function(t){this.$refs.ztree.init(),this.row=t,this.syncSelected()},destroy:function(){this.$refs.ztree.destroy(),this.selectedUserList=[],this.userList=[]}}}},868:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(774),o=r(a),i=n(109),s=n(779),l=r(s),u=n(780),c=r(u),d=n(807),f=r(d);e.default={name:"sys-role",mixins:[l.default],components:{XTable:c.default,Assign:f.default},data:function(){return{setting:{myName:"sys-role",brotherName:"sys-role-form",API:"/a/sys/role",formDataGetWay:"new"},table:{columns:[{title:"角色名称",key:"name"},{title:"英文名称",key:"enname"},{title:"归属机构",key:"_officeName"},{title:"数据范围",key:"_dataScope"}],columnsExtend:[{width:200,children:[{action:"assign",text:"分配",icon:"person"},{action:"edit",icon:"edit"},{action:"delete",text:"删除",icon:"trash-a"}]}],dataTransformOptionDictSetting:[{name:"dataScope",API:"/a/fns/getDictList",data:{type:"sys_data_scope"}}]},assignSetting:{modal:{show:!1},row:{}}}},watch:{"assignSetting.modal.show":function(t){t||this.$refs.assign.destroy()}},methods:{dataTransformer:function(t){var e=this.table.dataTransformOptionDict.dataScope||[];return t.map(function(t){var n=e.find(function(e){return e.value===t.dataScope});return(0,o.default)({},t,{_officeName:t.office.name?t.office.name:"",_dataScope:n?n.label:""})})},assign:function(t,e){this.assignSetting.modal.show=!0,this.assignSetting.row=t,this.$refs.assign.init(t)},assignModalOk:function(){var t=this;(0,i.axiosToken)({url:"a/sys/role/"+this.assignSetting.row.id+"/assign",method:"post",data:{idsArr:this.$refs.assign.selectedUserList.map(function(t){return t.id}).join(",")}}).then(function(e){t.$Message.success("保存成功")}).catch(function(t){return(0,i.axiosErrorHandler)(t)})}}}}});