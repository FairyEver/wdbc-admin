webpackJsonp([6],{767:function(e,t,n){var a=n(16)(n(860),n(828),null,null);a.options.__file="/Users/liyang/MyFiles/code/iview-admin-dev/src/views/page/sys/user/list.vue",a.esModule&&Object.keys(a.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] list.vue: functional components are not supported with templates, they should use render functions."),e.exports=a.exports},770:function(e,t,n){"use strict";t.__esModule=!0;var a=n(110),r=function(e){return e&&e.__esModule?e:{default:e}}(a);t.default=r.default||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}},771:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e){return JSON.parse(e)}function o(e){return(0,d.default)(e,null,"\t")}function i(e,t,n){for(var a=e.toString().length;a<t;)e+=n,a++;return e}function s(e){return/.*[\u4e00-\u9fa5]+.*$/.test(e)}function l(e,t){var n=new Date,a=n.getFullYear(),r=n.getMonth()+1;1==String(r).length&&(r="0"+String(r));var o=n.getDate(),i=a+"-"+r+"-"+o;"now"==e&&(e=i),"now"==t&&(t=i);var s=new Date(Date.parse(e)).getTime()/864e5;return new Date(Date.parse(t)).getTime()/864e5-s}function u(e,t){var n=0,a=0;e.map(function(e,t){parseFloat(e)&&(n+=1,a+=parseFloat(e))});var r=a/n;return r?r.toFixed(t):"0"}Object.defineProperty(t,"__esModule",{value:!0}),t.tool=void 0;var c=n(53),d=a(c),f=n(41),p=a(f),m=function e(t){var n;if("object"==(void 0===t?"undefined":(0,p.default)(t)))if(null===t)n=null;else if(t instanceof Array){n=[];for(var a=0,r=t.length;a<r;a++)n.push(e(t[a]))}else{n={};for(var o in t)n[o]=e(t[o])}else n=t;return n};Date.prototype.Format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var n in t)new RegExp("("+n+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[n]:("00"+t[n]).substr((""+t[n]).length)));return e};var h={clone:m,toJson:r,toString:o,pad:i,hasChinese:s,getDateDiff:l,pingjun:u};t.tool=h},775:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(770),o=a(r),i=n(284),s=a(i),l=n(109),u=n(771);t.default={data:function(){return{setting:{columnsOptionsAPI:"/a/fns/getDictList",formDataGetWay:"row",mockBaseUrl:"http://www.easy-mock.com/mock/5a09103ac645f122782988de/wdbc-admin"},page:{current:1,total:0,size:10},table:{data:[],dataTransformOptionDict:{},ready:!1,loading:!1},extraData:{dictOptions:[]}}},created:function(){var e=this;this.syncdataTransformOptionDict().then(function(){e.syncTableOptions(),e.syncTableData()})},watch:{"$route.params":function(e){this.checkMyParams()}},methods:{checkMyParams:function(){var e=u.tool.clone(this.$route.params);e.for===this.setting.myName&&e.data.reload&&(this.page.current=1,this.page.total=0,this.syncTableData())},pageChangeHandler:function(e){this.page.current=e,this.syncTableData()},syncdataTransformOptionDict:function(){var e=this;return new s.default(function(t,n){var a=e.table.dataTransformOptionDictSetting||[];a.length>0?(0,l.all)(a.map(function(e){return(0,l.axiosToken)({url:e.API,data:e.data})})).then((0,l.spread)(function(){for(var n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];r.forEach(function(t,n){e.table.dataTransformOptionDict[a[n].name]=t.data.dictList}),t()})):t()})},syncTableOptions:function(){var e=this,t=this.table.columns.filter(function(e){return e.control});if(0===t.length)return void(this.table.ready=!0);var n=t.filter(function(e){return"DictSelect"===e.control});n.length>0?(0,l.all)(n.map(function(t){return(0,l.axiosToken)({url:e.setting.columnsOptionsAPI,data:{type:t.key}})})).then((0,l.spread)(function(){for(var t=arguments.length,a=Array(t),r=0;r<t;r++)a[r]=arguments[r];a.forEach(function(t,a){var r=t.data.dictList.map(function(e){return{label:e.label,value:e.value}}),o=n[a].key;e.table.columns.forEach(function(e){e.key===o&&(e.props?e.props.options=r:e.props={options:r})})}),e.table.ready=!0})):this.table.ready=!0},syncTableData:function(){var e=this;this.table.loading=!0;var t=this.searchForm?this.searchForm:{},n=function(t){t.data.page?(e.page.total=t.data.page.total,a(t.data.page.list),t.data.typeList&&(e.extraData.dictOptions=t.data.typeList.map(function(e){return{value:e,label:e}}))):a(t.data.list),e.table.loading=!1,e.$Message.success("数据重载完毕")},a=function(t){e.dataTransformer?e.table.data=e.dataTransformer(t):e.table.data=t};this.setting.mock?l.axios.get(this.setting.mockBaseUrl+this.setting.API).then(function(e){n(e)}):(0,l.axiosToken)({url:this.setting.API,data:(0,o.default)({pageNo:this.page.current,pageSize:this.page.size},t)}).then(function(e){n(e)})},tableHandler:function(e){if(this[e]){for(var t=arguments.length,n=Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];this[e].apply(this,n)}},enterHandler:function(e){this.table.data[e.row][e.key]!==e.value&&(this.table.data[e.row][e.key]=e.value,console.log("更新了table.data第"+e.row+"行的"+e.key+" = "+e.value))},search:function(){this.page.current=1,this.syncTableData()},add:function(){this.$router.push({name:this.setting.brotherName,params:{for:this.setting.brotherName,from:this.setting.myName,mode:"new"}})},edit:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"edit";this.$router.push({name:this.setting.brotherName,params:{for:this.setting.brotherName,from:this.setting.myName,mode:n,dataGetWay:this.setting.formDataGetWay,dataGetId:e.id,data:{row:e}}})},saveLine:function(e,t){},saveAll:function(){this.$Message.info("全部保存")},delete:function(e,t){var n=this;(0,l.axiosToken)({url:this.setting.API+"/"+e.id,method:"delete"}).then(function(e){0===e.data.code&&(n.$Message.success("删除成功"),n.syncTableData())})}}}},776:function(e,t,n){var a=n(16)(n(781),n(777),null,null);a.options.__file="/Users/liyang/MyFiles/code/iview-admin-dev/src/components/table/table.vue",a.esModule&&Object.keys(a.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] table.vue: functional components are not supported with templates, they should use render functions."),e.exports=a.exports},777:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("Table",{attrs:{loading:e.loading,columns:e.columnsComputed,data:e.data,border:!0,stripe:!0,size:"small"}})},staticRenderFns:[]},e.exports.render._withStripped=!0},781:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(158),o=a(r),i=n(782),s=a(i),l=n(783),u=a(l);t.default={mixins:[s.default,u.default],props:{loading:{default:!0},columns:{default:function(){return[]}},columnsEdit:{default:function(){return[]}},columnsExtend:{default:function(){return[]}},data:{default:function(){return[]}}},computed:{columnsComputed:function(){var e=this;return[].concat((0,o.default)(this.columns.map(function(t,n){return t.align="center",t.control&&(t.render=function(n,a){return n("div",[e.inputBuilder(t,n,a)])}),t})),(0,o.default)(this.columnsExtend.map(function(t,n){return{title:t.title||"操作",width:t.width,align:"center",key:"action"+n,fixed:"right",render:function(n,a){return n("div",[t.children.map(function(r,o){return e.buttonBuilder(t,n,a,r,o)})])}}})))}}}},782:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(770),r=function(e){return e&&e.__esModule?e:{default:e}}(a);t.default={methods:{buttonBuilder:function(e,t,n,a,o){var i=this;return t("Button",{props:(0,r.default)({},this.buttonPropBuilder(e,t,n,a,o)),style:{marginRight:o===e.children.length-1?"0px":"5px"},on:{click:function(){i.$emit("emit",a.action,n.row,n.index)}}},a.text)},buttonPropBuilder:function(e,t,n,a,o){var i={size:"small"};return(0,r.default)({type:"edit"===a.action?"primary":"ghost"},i)}}}},783:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(770),r=function(e){return e&&e.__esModule?e:{default:e}}(a);t.default={methods:{inputBuilder:function(e,t,n){var a=this,o=n.row[n.column.key];return t(e.control.split("|")[0],{props:(0,r.default)({value:o},function(){var t=e.props||{};switch(e.control.split("|")[0]){case"Input":case"i-switch":return(0,r.default)({},t);case"DatePicker":switch(e.control.split("|")[1]){case"datetime":return(0,r.default)({type:e.control.split("|")[1],confirm:!0},t);default:return(0,r.default)({type:e.control.split("|")[1]},t)}case"DictSelect":return(0,r.default)({mode:"table"},t);default:return(0,r.default)({},t)}}()),on:(0,r.default)({},function(){switch(e.control.split("|")[0]){case"Input":return{"on-change":function(e){o=e.target.value},"on-blur":function(){a.$emit("enter",{row:n.index,key:n.column.key,value:o})},"on-enter":function(){a.$emit("enter",{row:n.index,key:n.column.key,value:o})}};case"i-switch":return{"on-change":function(e){setTimeout(function(){a.$emit("enter",{row:n.index,key:n.column.key,value:e})},300)}};case"DatePicker":switch(e.control.split("|")[1]){case"datetime":return{"on-change":function(e){o=e},"on-ok":function(){setTimeout(function(){a.$emit("enter",{row:n.index,key:n.column.key,value:o})},400)}};default:return{"on-change":function(e){setTimeout(function(){a.$emit("enter",{row:n.index,key:n.column.key,value:e})},400)}}}case"DictSelect":return{"on-change":function(e){setTimeout(function(){a.$emit("enter",{row:n.index,key:n.column.key,value:e})},500)}};default:return{}}}())})}}}},790:function(e,t,n){var a=n(16)(n(796),n(792),null,null);a.options.__file="/Users/liyang/MyFiles/code/iview-admin-dev/src/components/page/list.vue",a.esModule&&Object.keys(a.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] list.vue: functional components are not supported with templates, they should use render functions."),e.exports=a.exports},792:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("Page",{staticClass:"margin-top-10",staticStyle:{"margin-top":"10px"},attrs:{total:e.total,"page-size":e.pageSize,size:"small","show-total":"","show-elevator":""},on:{"on-change":e.handleChange}})},staticRenderFns:[]},e.exports.render._withStripped=!0},796:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{total:{default:0},pageSize:{default:0}},methods:{handleChange:function(e){this.$emit("change",e)}}}},828:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Row",[n("Col",{attrs:{span:"24"}},[n("Form",{ref:"searchForm",attrs:{"label-position":"top",inline:""}},[n("FormItem",{attrs:{prop:"office.id",label:"部门名称"}},[n("OfficeMenu",{attrs:{value:e.searchForm.office.id},on:{"update:value":function(t){e.$set(e.searchForm.office,"id",t)}}})],1),e._v(" "),n("FormItem",{attrs:{prop:"company.id",label:"公司名称"}},[n("OfficeMenu",{attrs:{value:e.searchForm.company.id},on:{"update:value":function(t){e.$set(e.searchForm.company,"id",t)}}})],1),e._v(" "),n("FormItem",{attrs:{prop:"loginName",label:"登录名"}},[n("Input",{attrs:{type:"text",placeholder:"loginName"},model:{value:e.searchForm.loginName,callback:function(t){e.$set(e.searchForm,"loginName",t)},expression:"searchForm.loginName"}})],1),e._v(" "),n("FormItem",{attrs:{prop:"no",label:"工号"}},[n("Input",{attrs:{type:"text",placeholder:"no"},model:{value:e.searchForm.no,callback:function(t){e.$set(e.searchForm,"no",t)},expression:"searchForm.no"}})],1),e._v(" "),n("FormItem",{attrs:{prop:"mobile",label:"手机号"}},[n("Input",{attrs:{type:"text",placeholder:"mobile"},model:{value:e.searchForm.mobile,callback:function(t){e.$set(e.searchForm,"mobile",t)},expression:"searchForm.mobile"}})],1),e._v(" "),n("FormItem",{attrs:{prop:"name",label:"姓名"}},[n("Input",{attrs:{type:"text",placeholder:"name"},model:{value:e.searchForm.name,callback:function(t){e.$set(e.searchForm,"name",t)},expression:"searchForm.name"}})],1),e._v(" "),n("FormItem",{staticStyle:{width:"150px"},attrs:{prop:"userType",label:"类型"}},[n("DictSelect",{attrs:{value:e.searchForm.userType,type:"sys_user_type"},on:{"update:value":function(t){e.$set(e.searchForm,"userType",t)}}})],1),e._v(" "),n("FormItem",{attrs:{label:"搜索"}},[n("Button",{attrs:{type:"primary"},on:{click:e.search}},[n("Icon",{attrs:{type:"search"}})],1)],1),e._v(" "),n("FormItem",{attrs:{label:"新增"}},[n("Button",{attrs:{type:"ghost"},on:{click:e.add}},[n("Icon",{attrs:{type:"plus"}})],1)],1)],1)],1)],1),e._v(" "),n("Row",{attrs:{gutter:16}},[n("Col",{attrs:{span:"6"}},[n("Card",{attrs:{"dis-hover":"",bordered:!1}},[n("p",{attrs:{slot:"title"},slot:"title"},[n("Icon",{attrs:{type:"briefcase"}}),e._v(" 组织机构")],1),e._v(" "),n("a",{attrs:{slot:"extra",href:"#"},on:{click:function(t){t.preventDefault(),e.refreshOffice(t)}},slot:"extra"},[n("Icon",{attrs:{type:"ios-loop-strong"}}),e._v(" 刷新")],1),e._v(" "),n("div",{staticStyle:{"margin-bottom":"20px"}},[n("Input",{attrs:{placeholder:"输入关键字进行筛选"},model:{value:e.officeKeyword,callback:function(t){e.officeKeyword=t},expression:"officeKeyword"}})],1),e._v(" "),n("div",{staticStyle:{height:"400px",overflow:"scroll"}},[n("Ztree",{ref:"ztree",attrs:{dataMode:"data",treeData:e.treeDataFilter,initAfterSync:!0},on:{onClick:e.zTreeOnClick}})],1)])],1),e._v(" "),n("Col",{attrs:{span:"18"}},[n("XTable",{attrs:{loading:e.table.loading,columns:e.table.columns,"columns-extend":e.table.columnsExtend,data:e.table.data},on:{emit:e.tableHandler}}),e._v(" "),n("PageList",{attrs:{total:e.page.total,"page-size":e.page.size},on:{change:e.pageChangeHandler}})],1)],1)],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},860:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(770),o=a(r),i=n(109),s=n(775),l=a(s),u=n(776),c=a(u),d=n(790),f=a(d);t.default={name:"sys-user",mixins:[l.default],components:{XTable:c.default,PageList:f.default},data:function(){return{officeKeyword:"",treeData:[],treeDataFilter:[],setting:{myName:"sys-user",brotherName:"sys-user-form",API:"/a/sys/user"},searchForm:{office:{id:""},company:{id:""},loginName:"",no:"",mobile:"",name:"",userType:""},table:{columns:[{title:"隶属机构",key:"_officeName"},{title:"用户类型",key:"_userType"},{title:"姓名",key:"name"},{title:"工号",key:"no"},{title:"手机",key:"mobile"},{title:"登录名",key:"loginName"}],columnsExtend:[{width:160,children:[{action:"edit",text:"修改"},{action:"delete",text:"删除"}]}],dataTransformOptionDictSetting:[{name:"dataScope",API:"/a/fns/getDictList",data:{type:"sys_user_type"}}]}}},mounted:function(){this.getTreeData()},watch:{officeKeyword:function(e){this.$refs.ztree.destroy(),this.filterOffice()}},methods:{editUser:function(e,t){var n={id:e.id};this.edit(n)},dataTransformer:function(e){var t=this,n=this.table.dataTransformOptionDict.dataScope||[];return e.map(function(e){var a=n.find(function(t){return t.value===e.userType});t.treeData.find(function(t){return t.id===e.company.id});return(0,o.default)({},e,{_officeName:e.office.name?e.office.name:"",_userType:a?a.label:""})})},refreshOffice:function(){""!==this.officeKeyword&&(this.officeKeyword="",this.$refs.ztree.destroy(),this.treeDataFilter=this.treeData,this.$refs.ztree.init())},filterOffice:function(){var e=this;this.treeDataFilter=this.treeData.filter(function(t){return t.name.indexOf(e.officeKeyword)>=0})},getTreeData:function(){var e=this;this.$refs.ztree.destroy(),(0,i.axiosToken)({url:"/a/sys/officeTree"}).then(function(t){e.treeData=t.data,e.treeDataFilter=e.treeData})},zTreeOnClick:function(e,t,n){this.setting.API="/a/sys/user?id="+n.id,this.syncTableData()}}}}});