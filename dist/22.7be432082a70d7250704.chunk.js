webpackJsonp([22],{772:function(e,r,t){t(845);var s=t(16)(t(873),t(837),null,null);s.options.__file="/Users/liyang/MyFiles/code/iview-admin-dev/src/views/page/sys/userinfo/info/form.vue",s.esModule&&Object.keys(s.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] form.vue: functional components are not supported with templates, they should use render functions."),e.exports=s.exports},837:function(e,r,t){e.exports={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[t("Card",[t("p",{attrs:{slot:"title"},slot:"title"},[t("Icon",{attrs:{type:"person"}}),e._v("\n            个人信息\n        ")],1),e._v(" "),t("div",[t("Form",{ref:"userForm",attrs:{model:e.userForm,"label-width":100,"label-position":"right",rules:e.inforValidate}},[t("FormItem",{attrs:{label:"邮箱：",prop:"email"}},[t("div",{staticStyle:{display:"inline-block",width:"300px"}},[t("Input",{model:{value:e.userForm.email,callback:function(r){e.$set(e.userForm,"email",r)},expression:"userForm.email"}})],1)]),e._v(" "),t("FormItem",{attrs:{label:"电话：",prop:"phone"}},[t("div",{staticStyle:{display:"inline-block",width:"300px"}},[t("Input",{model:{value:e.userForm.phone,callback:function(r){e.$set(e.userForm,"phone",r)},expression:"userForm.phone"}})],1)]),e._v(" "),t("FormItem",{attrs:{label:"手机：",prop:"mobile"}},[t("div",{staticStyle:{display:"inline-block",width:"300px"}},[t("Input",{model:{value:e.userForm.mobile,callback:function(r){e.$set(e.userForm,"mobile",r)},expression:"userForm.mobile"}})],1)]),e._v(" "),t("FormItem",{attrs:{label:"备注：",prop:"remarks"}},[t("div",{staticStyle:{display:"inline-block",width:"300px"}},[t("Input",{model:{value:e.userForm.remarks,callback:function(r){e.$set(e.userForm,"remarks",r)},expression:"userForm.remarks"}})],1)]),e._v(" "),t("FormItem",{attrs:{label:"公司名称："}},[t("span",[e._v(e._s(e.company))])]),e._v(" "),t("FormItem",{attrs:{label:"用户角色："}},[t("span",[e._v(e._s(e.roleNames))])]),e._v(" "),t("FormItem",{attrs:{label:"部门名称："}},[t("span",[e._v(e._s(e.department))])]),e._v(" "),t("FormItem",{attrs:{label:"姓名："}},[t("span",[e._v(e._s(e.name))])]),e._v(" "),t("FormItem",{attrs:{label:"用户类型："}},[t("span",[e._v(e._s(e.userType))])]),e._v(" "),t("FormItem",{attrs:{label:"上次登录IP："}},[t("span",[e._v(e._s(e.oldLoginIp))])]),e._v(" "),t("FormItem",{attrs:{label:"上次登录时间："}},[t("span",[e._v(e._s(e.oldLoginDate))])]),e._v(" "),t("div",[t("Button",{staticStyle:{width:"100px"},attrs:{type:"primary",loading:e.save_loading},on:{click:e.saveEdit}},[e._v("保存")])],1)],1)],1)])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},845:function(e,r){},873:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s=t(109);r.default={name:"info",data:function(){return{userForm:{email:"",phone:"",mobile:"",remarks:""},inforValidate:{email:[{type:"email",message:"请输入正确格式的邮箱",trigger:"blur"}]},roleNames:"",company:"",department:"",name:"",userType:"",oldLoginIp:"",oldLoginDate:"",save_loading:!1}},created:function(){this.getUserInfo()},methods:{getUserInfo:function(){var e=this;(0,s.axiosToken)({url:"/a/sys/user/info"}).then(function(r){e.userForm.email=r.data.user.email,e.userForm.phone=r.data.user.phone,e.userForm.mobile=r.data.user.mobile,e.userForm.remarks=r.data.user.remarks,e.roleNames=r.data.user.roleNames,e.company=r.data.user.company_id,e.department=r.data.user.office_id,e.userType=r.data.user.user_type,e.name=r.data.user.name,e.oldLoginIp=r.data.user.oldLoginIp,e.oldLoginDate=r.data.user.oldLoginDate}).catch(function(e){return(0,s.axiosErrorHandler)(e)})},saveEdit:function(){var e=this;this.$refs.userForm.validate(function(r){r&&e.saveInfoAjax()})},saveInfoAjax:function(){var e=this;this.save_loading=!0,(0,s.axiosToken)({method:"post",url:"/a/sys/user/info",data:{email:this.userForm.email,phone:this.userForm.phone,mobile:this.userForm.mobile,remarks:this.userForm.remarks}}).then(function(r){0===r.data.code?e.$Message.success(r.data.msg):e.$Message.error(r.data.msg),e.save_loading=!1})}}}}});