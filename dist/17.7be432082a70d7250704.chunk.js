webpackJsonp([17],{765:function(e,t,n){var i=n(16)(n(865),n(818),null,null);i.options.__file="/Users/liyang/MyFiles/code/iview-admin-dev/src/views/page/sys/office/list.vue",i.esModule&&Object.keys(i.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),i.options.functional&&console.error("[vue-loader] list.vue: functional components are not supported with templates, they should use render functions."),e.exports=i.exports},774:function(e,t,n){"use strict";t.__esModule=!0;var i=n(110),a=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default=a.default||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}},775:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e){return JSON.parse(e)}function r(e){return(0,u.default)(e,null,"\t")}function o(e,t,n){for(var i=e.toString().length;i<t;)e+=n,i++;return e}function s(e){return/.*[\u4e00-\u9fa5]+.*$/.test(e)}function c(e,t){var n=new Date,i=n.getFullYear(),a=n.getMonth()+1;1==String(a).length&&(a="0"+String(a));var r=n.getDate(),o=i+"-"+a+"-"+r;"now"==e&&(e=o),"now"==t&&(t=o);var s=new Date(Date.parse(e)).getTime()/864e5;return new Date(Date.parse(t)).getTime()/864e5-s}function l(e,t){var n=0,i=0;e.map(function(e,t){parseFloat(e)&&(n+=1,i+=parseFloat(e))});var a=i/n;return a?a.toFixed(t):"0"}Object.defineProperty(t,"__esModule",{value:!0}),t.tool=void 0;var h=n(53),u=i(h),d=n(41),f=i(d),p=function e(t){var n;if("object"==(void 0===t?"undefined":(0,f.default)(t)))if(null===t)n=null;else if(t instanceof Array){n=[];for(var i=0,a=t.length;i<a;i++)n.push(e(t[i]))}else{n={};for(var r in t)n[r]=e(t[r])}else n=t;return n};Date.prototype.Format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var n in t)new RegExp("("+n+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[n]:("00"+t[n]).substr((""+t[n]).length)));return e};var m={clone:p,toJson:a,toString:r,pad:o,hasChinese:s,getDateDiff:c,pingjun:l};t.tool=m},779:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(774),r=i(a),o=n(156),s=i(o),c=n(109),l=n(775);t.default={data:function(){return{setting:{columnsOptionsAPI:"/a/fns/getDictList",formDataGetWay:"row",mockBaseUrl:"http://www.easy-mock.com/mock/5a09103ac645f122782988de/wdbc-admin"},page:{current:1,total:0,size:10},table:{data:[],dataTransformOptionDict:{},ready:!1,loading:!1},extraData:{dictOptions:[]}}},created:function(){var e=this;this.syncdataTransformOptionDict().then(function(){e.syncTableOptions(),e.syncTableData()})},watch:{"$route.params":function(e){this.checkMyParams()}},methods:{checkMyParams:function(){var e=l.tool.clone(this.$route.params);e.for===this.setting.myName&&e.data.reload&&(this.page.current=1,this.page.total=0,this.syncTableData())},pageChangeHandler:function(e){this.page.current=e,this.syncTableData()},syncdataTransformOptionDict:function(){var e=this;return new s.default(function(t,n){var i=e.table.dataTransformOptionDictSetting||[];i.length>0?(0,c.all)(i.map(function(e){return(0,c.axiosToken)({url:e.API,data:e.data}).catch(function(e){return(0,c.axiosErrorHandler)(e)})})).then((0,c.spread)(function(){for(var n=arguments.length,a=Array(n),r=0;r<n;r++)a[r]=arguments[r];a.forEach(function(t,n){e.table.dataTransformOptionDict[i[n].name]=t.data.dictList}),t()})):t()})},syncTableOptions:function(){var e=this,t=this.table.columns.filter(function(e){return e.control});if(0===t.length)return void(this.table.ready=!0);var n=t.filter(function(e){return"DictSelect"===e.control});n.length>0?(0,c.all)(n.map(function(t){return(0,c.axiosToken)({url:e.setting.columnsOptionsAPI,data:{type:t.key}}).catch(function(e){return(0,c.axiosErrorHandler)(e)})})).then((0,c.spread)(function(){for(var t=arguments.length,i=Array(t),a=0;a<t;a++)i[a]=arguments[a];i.forEach(function(t,i){var a=t.data.dictList.map(function(e){return{label:e.label,value:e.value}}),r=n[i].key;e.table.columns.forEach(function(e){e.key===r&&(e.props?e.props.options=a:e.props={options:a})})}),e.table.ready=!0})):this.table.ready=!0},syncTableData:function(){var e=this;this.table.loading=!0;var t=this.searchForm?this.searchForm:{},n=function(t){console.log("***表格数据***"),console.log(t.data),console.log("***表格数据结束***"),t.data.page?(e.page.total=t.data.page.total,i(t.data.page.list),t.data.typeList&&(e.extraData.dictOptions=t.data.typeList.map(function(e){return{value:e,label:e}}))):i(t.data.list),e.table.loading=!1,e.$Message.success("数据重载完毕")},i=function(t){e.dataTransformer?e.table.data=e.dataTransformer(t):e.table.data=t};this.setting.mock?c.axios.get(this.setting.mockBaseUrl+this.setting.API).then(function(e){n(e)}):(0,c.axiosToken)({url:this.setting.API,data:(0,r.default)({pageNo:this.page.current,pageSize:this.page.size},t)}).then(function(e){return n(e)}).catch(function(e){return(0,c.axiosErrorHandler)(e)})},tableHandler:function(e){if(this[e]){for(var t=arguments.length,n=Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];this[e].apply(this,n)}},enterHandler:function(e){this.table.data[e.row][e.key]!==e.value&&(this.table.data[e.row][e.key]=e.value,console.log("更新了table.data第"+e.row+"行的"+e.key+" = "+e.value))},search:function(){this.page.current=1,this.syncTableData()},add:function(){this.$router.push({name:this.setting.brotherName,params:{for:this.setting.brotherName,from:this.setting.myName,mode:"new",dataGetWay:this.setting.formDataGetWay,dataGetId:"id",data:{}}})},edit:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"edit";this.$router.push({name:this.setting.brotherName,params:{for:this.setting.brotherName,from:this.setting.myName,mode:n,dataGetWay:this.setting.formDataGetWay,dataGetId:e.id,data:{row:e}}})},saveLine:function(e,t){},saveAll:function(){this.$Message.info("全部保存")},delete:function(e,t){var n=this;(0,c.axiosToken)({url:this.setting.API+"/"+e.id,method:"delete"}).then(function(e){n.$Message.success("删除成功"),n.syncTableData()}).catch(function(e){return(0,c.axiosErrorHandler)(e)})}}}},801:function(e,t,n){n(803);var i=n(16)(n(804),n(802),"data-v-affcd4fc",null);i.options.__file="/Users/liyang/MyFiles/code/iview-admin-dev/src/components/table/tableTree.vue",i.esModule&&Object.keys(i.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),i.options.functional&&console.error("[vue-loader] tableTree.vue: functional components are not supported with templates, they should use render functions."),e.exports=i.exports},802:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"autoTbale",style:{width:e.tableWidth}},[n("table",{staticClass:"table table-bordered",attrs:{id:"hl-tree-table"}},[n("thead",[n("tr",e._l(e.cloneColumns,function(t,i){return n("th",["selection"===t.type?n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.checks,expression:"checks"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.checks)?e._i(e.checks,null)>-1:e.checks},on:{click:e.handleCheckAll,change:function(t){var n=e.checks,i=t.target,a=!!i.checked;if(Array.isArray(n)){var r=e._i(n,null);i.checked?r<0&&(e.checks=n.concat([null])):r>-1&&(e.checks=n.slice(0,r).concat(n.slice(r+1)))}else e.checks=a}}})]):n("label",[e._v("\n                        "+e._s(e.renderHeader(t,i))+"\n                        "),t.sortable?n("span",{staticClass:"ivu-table-sort"},[n("Icon",{class:{on:"asc"===t._sortType},attrs:{type:"arrow-up-b"},nativeOn:{click:function(t){e.handleSort(i,"asc")}}}),e._v(" "),n("Icon",{class:{on:"desc"===t._sortType},attrs:{type:"arrow-down-b"},nativeOn:{click:function(t){e.handleSort(i,"desc")}}})],1):e._e()])])}))]),e._v(" "),n("tbody",e._l(e.initItems,function(t,i){return n("tr",{directives:[{name:"show",rawName:"v-show",value:e.show(t),expression:"show(item)"}],key:t.id,class:{"child-tr":t.parent}},e._l(e.columns,function(a,r){return n("td",{key:a.key,style:e.tdStyle(a)},["selection"===a.type?n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.checkGroup,expression:"checkGroup"}],attrs:{type:"checkbox"},domProps:{value:t.id,checked:Array.isArray(e.checkGroup)?e._i(e.checkGroup,t.id)>-1:e.checkGroup},on:{change:function(n){var i=e.checkGroup,a=n.target,r=!!a.checked;if(Array.isArray(i)){var o=t.id,s=e._i(i,o);a.checked?s<0&&(e.checkGroup=i.concat([o])):s>-1&&(e.checkGroup=i.slice(0,s).concat(i.slice(s+1)))}else e.checkGroup=r}}})]):e._e(),e._v(" "),"action"===a.type?n("div",{staticClass:"action-col"},e._l(a.actions,function(a){return n("i-button",{key:a.text,attrs:{type:a.type,size:"small"},on:{click:function(n){e.RowClick(t,n,i,a.text)}}},[e._v("\n                            "+e._s(a.text)+"\n                        ")])})):e._e(),e._v(" "),a.type?e._e():n("label",{on:{click:function(n){e.toggle(i,t)}}},[r==e.iconRow()?n("span",[n("i",{domProps:{innerHTML:e._s(t.spaceHtml)}}),e._v(" "),t[e.childrenKey]&&t[e.childrenKey].length>0?n("i",{staticClass:"ivu-icon",class:{"ivu-icon-plus-round":!t.expanded,"ivu-icon-minus-round":t.expanded}}):n("i",{staticClass:"ms-tree-space"})]):e._e(),e._v(" "+e._s(e.renderBody(t,a))+"\n                    ")])])}))}))])])},staticRenderFns:[]},e.exports.render._withStripped=!0},803:function(e,t){},804:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(110),a=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default={name:"treeGrid",props:{columns:Array,items:{type:Array,default:function(){return[]}},childrenKey:{default:"childList"}},data:function(){return{initItems:[],cloneColumns:[],checkGroup:[],checks:!1,screenWidth:document.body.clientWidth,tdsWidth:0,timer:!1,dataLength:0}},computed:{tableWidth:function(){return this.tdsWidth>this.screenWidth&&this.screenWidth>0?this.screenWidth+"px":"100%"}},watch:{screenWidth:function(e){var t=this;this.timer||(this.screenWidth=e,this.timer=!0,setTimeout(function(){t.timer=!1},400))},items:function(){this.items&&(this.dataLength=this.Length(this.items),this.initData(this.deepCopy(this.items),1,null),this.checkGroup=this.renderCheck(this.items),this.checkGroup.length==this.dataLength?this.checks=!0:this.checks=!1)},columns:{handler:function(){this.cloneColumns=this.makeColumns()},deep:!0},checkGroup:function(e){this.checkAllGroupChange(e)}},mounted:function(){var e=this;this.items&&(this.dataLength=this.Length(this.items),this.initData(this.deepCopy(this.items),1,null),this.cloneColumns=this.makeColumns(),this.checkGroup=this.renderCheck(this.items),this.checkGroup.length==this.dataLength?this.checks=!0:this.checks=!1),this.$nextTick(function(){e.screenWidth=document.body.clientWidth}),window.onresize=function(){return function(){window.screenWidth=document.body.clientWidth,e.screenWidth=window.screenWidth}()}},methods:{iconRow:function(){for(var e=0,t=this.columns.length;e<t;e++)if("selection"==this.columns[e].type)return 1;return 0},tdStyle:function(e){var t={};return e.align&&(t["text-align"]=e.align),e.width&&(t["min-width"]=e.width+"px"),t},handleSort:function(e,t){this.cloneColumns.forEach(function(e){return e._sortType="normal"}),this.cloneColumns[e]._sortType===t?this.cloneColumns[e]._sortType="normal":this.cloneColumns[e]._sortType=t,this.$emit("on-sort-change",this.cloneColumns[e].key,this.cloneColumns[e]._sortType)},RowClick:function(e,t,n,i){var a=this.makeData(e);this.$emit("on-row-click",a,t,n,i)},makeData:function(e){var t=this.type(e),n=void 0;if("array"===t)n=[];else{if("object"!==t)return e;n={}}if("array"===t)for(var i=0;i<e.length;i++)n.push(this.makeData(e[i]));else if("object"===t)for(var a in e)"spaceHtml"!=a&&"parent"!=a&&"level"!=a&&"expanded"!=a&&"isShow"!=a&&"load"!=a&&(n[a]=this.makeData(e[a]));return n},makeColumns:function(){var e=this,t=this.deepCopy(this.columns);return this.tdsWidth=0,t.forEach(function(t,n){t._index=n,t._width=t.width?t.width:"",t._sortType="normal",e.tdsWidth+=t.width?parseFloat(t.width):0}),t},initData:function(e,t,n){var i=this;this.initItems=[];for(var r="",o=1;o<t;o++)r+="<i class='ms-tree-space'></i>";e.forEach(function(e,o){e=(0,a.default)({},e,{parent:n,level:t,spaceHtml:r}),void 0===e.expanded&&(e=(0,a.default)({},e,{expanded:!1})),void 0===e.show&&(e=(0,a.default)({},e,{isShow:!1})),e=(0,a.default)({},e,{load:!!e.expanded}),i.initItems.push(e),e[i.childrenKey]&&e.expanded&&i.initData(e[i.childrenKey],t+1,e)})},show:function(e){return 1==e.level||e.parent&&e.parent.expanded&&e.isShow},toggle:function(e,t){for(var n=this,i=t.level+1,a="",r=1;r<i;r++)a+="<i class='ms-tree-space'></i>";t[this.childrenKey]&&(t.expanded?(t.expanded=!t.expanded,this.close(e,t)):(t.expanded=!t.expanded,t.load?this.open(e,t):(t.load=!0,t[this.childrenKey].forEach(function(r,o){n.initItems.splice(e+o+1,0,r),n.$set(n.initItems[e+o+1],"parent",t),n.$set(n.initItems[e+o+1],"level",i),n.$set(n.initItems[e+o+1],"spaceHtml",a),n.$set(n.initItems[e+o+1],"isShow",!0),n.$set(n.initItems[e+o+1],"expanded",!1)}))))},open:function(e,t){var n=this;t[this.childrenKey]&&t[this.childrenKey].forEach(function(t,i){t.isShow=!0,t[n.childrenKey]&&t.expanded&&n.open(e+i+1,t)})},close:function(e,t){var n=this;t[this.childrenKey]&&t[this.childrenKey].forEach(function(t,i){t.isShow=!1,t.expanded=!1,t[n.childrenKey]&&n.close(e+i+1,t)})},handleCheckAll:function(){this.checks=!this.checks,this.checks?this.checkGroup=this.getArray(this.checkGroup.concat(this.All(this.items))):this.checkGroup=[]},getArray:function(e){for(var t={},n=e.length,i=[],a=0;a<n;a++)t[e[a]]||(t[e[a]]=!0,i.push(e[a]));return i},checkAllGroupChange:function(e){this.dataLength>0&&e.length===this.dataLength?this.checks=!0:this.checks=!1,this.$emit("on-selection-change",this.checkGroup)},All:function(e){var t=this,n=[];return e.forEach(function(e){n.push(e.id),e[t.childrenKey]&&e[t.childrenKey].length>0&&(n=n.concat(t.All(e[t.childrenKey])))}),n},Length:function(e){var t=this,n=e.length;return e.forEach(function(e){e[t.childrenKey]&&(n+=t.Length(e[t.childrenKey]))}),n},renderHeader:function(e,t){return"renderHeader"in this.columns[t]?this.columns[t].renderHeader(e,t):e.title||"#"},renderBody:function(e,t,n){return e[t.key]},renderCheck:function(e){var t=this,n=[];return e.forEach(function(e){e._checked&&n.push(e.id),e[t.childrenKey]&&e[t.childrenKey].length>0&&(n=n.concat(t.renderCheck(e[t.childrenKey])))}),n},deepCopy:function(e){var t,n,i,a=this.type(e);if("array"===a)t=[];else{if("object"!==a)return e;t={}}if("array"===a){for(n=0,i=e.length;n<i;n++)t.push(this.deepCopy(e[n]));return t}if("object"===a){for(n in e)t[n]=this.deepCopy(e[n]);return t}},type:function(e){var t=Object.prototype.toString;return{"[object Boolean]":"boolean","[object Number]":"number","[object String]":"string","[object Function]":"function","[object Array]":"array","[object Date]":"date","[object RegExp]":"regExp","[object Undefined]":"undefined","[object Null]":"null","[object Object]":"object"}[t.call(e)]}},beforeDestroy:function(){window.onresize=null}}},818:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Row",[n("Col",{attrs:{span:"24"}},[n("Form",{ref:"searchForm",attrs:{"label-position":"top",inline:""}},[n("FormItem",{attrs:{label:"新增"}},[n("Button",{attrs:{type:"ghost"},on:{click:e.add}},[n("Icon",{attrs:{type:"plus"}})],1)],1)],1)],1)],1),e._v(" "),n("Row",{attrs:{gutter:16}},[n("Col",{attrs:{span:"6"}},[n("Card",{attrs:{"dis-hover":"",bordered:!1}},[n("p",{attrs:{slot:"title"},slot:"title"},[n("Icon",{attrs:{type:"briefcase"}}),e._v(" 组织机构")],1),e._v(" "),n("a",{attrs:{slot:"extra",href:"#"},on:{click:function(t){t.preventDefault(),e.refreshOffice(t)}},slot:"extra"},[n("Icon",{attrs:{type:"ios-loop-strong"}}),e._v(" 刷新")],1),e._v(" "),n("div",{staticStyle:{"margin-bottom":"20px"}},[n("Input",{attrs:{placeholder:"输入关键字进行筛选"},model:{value:e.officeKeyword,callback:function(t){e.officeKeyword=t},expression:"officeKeyword"}})],1),e._v(" "),n("div",{staticStyle:{height:"400px",overflow:"scroll"}},[n("Ztree",{ref:"ztree",attrs:{dataMode:"data",treeData:e.treeDataFilter,initAfterSync:!0},on:{onClick:e.zTreeOnClick}})],1)])],1),e._v(" "),n("Col",{attrs:{span:"18"}},[n("tableTree",{attrs:{items:e.table.data,columns:e.table.columns},on:{"on-row-click":e.rowClick}}),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.table.loading,expression:"table.loading"}],staticStyle:{"margin-top":"20px"}},[n("Spin",[e._v("数据加载中...")])],1)],1)],1)],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},865:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(774),r=i(a),o=n(109),s=n(779),c=i(s),l=n(801),h=i(l);t.default={name:"sys-office",mixins:[c.default],components:{tableTree:h.default},data:function(){return{officeKeyword:"",treeData:[],treeDataFilter:[],setting:{myName:"sys-office",brotherName:"sys-office-form",API:"/a/sys/office"},table:{columns:[{title:"机构名称",key:"name"},{title:"机构编码",key:"code"},{title:"机构类型",key:"_officeType"},{title:"备注",key:"remarks"},{title:"操作",type:"action",align:"center",actions:[{type:"primary",text:"修改"},{type:"ghost",text:"删除"},{type:"ghost",text:"添加下级机构"}]}],dataTransformOptionDictSetting:[{name:"dataScope",API:"/a/fns/getDictList",data:{type:"sys_office_type"}}]}}},mounted:function(){this.getTreeData()},watch:{officeKeyword:function(e){this.$refs.ztree.destroy(),this.filterOffice()}},methods:{dataTransformer:function(e){var t=this.table.dataTransformOptionDict.dataScope||[];return e.map(function(e){var n=t.find(function(t){return t.value===e.type});return(0,r.default)({},e,{_officeType:n?n.label:""})})},refreshOffice:function(){""!==this.officeKeyword&&(this.officeKeyword="",this.$refs.ztree.destroy(),this.treeDataFilter=this.treeData,this.$refs.ztree.init())},filterOffice:function(){var e=this;this.treeDataFilter=this.treeData.filter(function(t){return t.name.indexOf(e.officeKeyword)>=0})},getTreeData:function(){var e=this;this.$refs.ztree.destroy(),(0,o.axiosToken)({url:"/a/sys/officeTree"}).then(function(t){e.treeData=t.data,e.treeDataFilter=e.treeData}).catch(function(e){return(0,o.axiosErrorHandler)(e)})},zTreeOnClick:function(e,t,n){this.table.data=[],this.setting.API="/a/sys/office?id="+n.id,this.syncTableData()},rowClick:function(e,t,n,i){switch(i){case"修改":this.edit(e,n);break;case"删除":this.delete(e,n);break;case"添加下级机构":var a={parent:{id:e.id,name:e.name}};this.edit(a,n,"new");break;default:this.$Message.error("事件匹配失败")}}}}}});