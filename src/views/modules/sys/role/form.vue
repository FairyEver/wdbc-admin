<template>
    <div style="position: relative;">
        <!-- 表单 -->
        <Form ref="form" :model="form" :rules="rules" label-position="top">
            <Row :gutter="10">
                <!-- <Col span="4"><FormItem label="ID" prop="id"><Input v-model="form.id" placeholder="ID" disabled style="width: 150px;"></Input></FormItem></Col> -->
                <Col span="4"><FormItem label="归属机构" prop="office.id"><TreeOffice :value.sync="form.office.id"></TreeOffice></FormItem></Col>
                <Col span="4"><FormItem label="角色名称" prop="name"><Input v-model="form.name" placeholder="角色名称" style="width: 150px;"></Input></FormItem></Col>
                <Col span="4"><FormItem label="英文名称" prop="enname"><Input v-model="form.enname" placeholder="英文名称" style="width: 150px;"></Input></FormItem></Col>
                <Col span="4"><FormItem label="角色类型" prop="roleType"><Input v-model="form.roleType" placeholder="角色类型" disabled style="width: 150px;"></Input></FormItem></Col>
                <Col span="4"><FormItem label="是否系统数据" prop="sysData"><DictRadio :value.sync="form.sysData" type="yes_no"></DictRadio></FormItem></Col>
                <Col span="4"><FormItem label="是否可用" prop="useable"><DictRadio :value.sync="form.useable" type="yes_no"></DictRadio></FormItem></Col>
                <Col span="4">
                    <FormItem label="数据范围" prop="dataScope">
                        <DictSelect
                            :value.sync="form.dataScope"
                            type="sys_data_scope"
                            :disabled="true">
                        </DictSelect>
                    </FormItem>
                </Col>
                <Col span="4"><FormItem label="角色菜单权限授权" prop="menuIds"><TreeMenu :value.sync="form.menuIds" :check="true"></TreeMenu></FormItem></Col>
                <Col span="4" v-if="form.dataScope === '9'"><FormItem label="角色数据权限授权" prop="officeIds"><TreeOffice :value.sync="form.officeIds" :check="true"></TreeOffice></FormItem></Col>
                <Col span="4"><FormItem label="备注" prop="remarks"><Input v-model="form.remarks" placeholder="remarks" style="width: 150px;"></Input></FormItem></Col>
            </Row>
        </Form>
        <!-- <CodeCard :data="form"></CodeCard>
        <CodeCard :data="$route.params"></CodeCard> -->
        <!-- 提交 -->
        <SaveBar @save="submitHandler"></SaveBar>
        <!-- 载入 -->
        <Spin size="large" fix v-if="!ready"></Spin>
    </div>
</template>

<script>
// mixin
import form from '@/mixin/form.js';
import closeMe from '@/mixin/closeMe.js';
import formValidate from '@/mixin/formValidate.js';
// 组件
import SaveBar from '@/components/form/save/bar.vue';
// name
const nameInRouter = 'sys-role-form';

export default {
    name: nameInRouter,
    mixins: [
        form,
        closeMe,
        formValidate
    ],
    components: {
        SaveBar
    },
    data () {
        return {
            // 设置
            setting: {
                // 本页的名字(路由name)
                myName: nameInRouter,
                // 数据接口
                API: '/a/sys/role'
            },
            // 表单空模板
            formEmpty: {
                id: '',
                office: {
                    id: '0'
                },
                name: '',
                enname: '',
                roleType: 'assignment',
                sysData: '1',
                useable: '1',
                dataScope: '2',
                remarks: '',
                menuIds: '',
                officeIds: '',
                // 隐藏的
                oldName: '',
                oldEnname: ''
            },
            // 校验规则
            rules: {
                name: [{required: true, message: '必填', trigger: 'blur'}],
                enname: [{required: true, message: '必填', trigger: 'blur'}]
            }
        };
    },
    methods: {
        dataToFrom (paramsData) {
            if (this.setting.mode === 'edit') {
                // 赋值
                this.form.id = paramsData.role.id;
                this.form.name = paramsData.role.name;
                this.form.enname = paramsData.role.enname;
                this.form.roleType = paramsData.role.roleType;
                this.form.sysData = paramsData.role.sysData;
                this.form.useable = paramsData.role.useable;
                this.form.dataScope = paramsData.role.dataScope;
                this.form.remarks = paramsData.role.remarks;
                // tree数据
                this.form.office.id = paramsData.role.office.id;
                this.form.menuIds = paramsData.role.menuIds;
                this.form.officeIds = paramsData.role.officeIds;
                // 额外内容
                this.form.oldName = paramsData.role.name;
                this.form.oldEnname = paramsData.role.enname;
            }
        }
    }
};
</script>

