<template>
    <div>
        <LayoutHeader title="指标明细" sub-title="在此形成了类、⼤类、指标ID、指标属性的四级选择结构"></LayoutHeader>
        <Row :gutter="10">
            <Col span="6">
                <Card dis-hover>
                    <Ztree
                        ref="ztree"
                        dataMode="data"
                        :treeData="treeData"
                        :initAfterSync="true"
                        @onClick="zTreeOnClick">
                    </Ztree>
                </Card>
            </Col>
            <Col span="18">
                <Card dis-hover>
                    <Tabs value="1">
                        <TabPane label="新增下级" name="1">
                            <Form12 v-if="grade === 0 || grade === 1" :grade="grade + 1" :pid="pId" @submit="getTreeData"></Form12>
                            <Form3 v-else-if="grade === 2" :grade="grade + 1" :pid="pId" @submit="getTreeData"></Form3>
                            <Alert v-else>请先在左侧选择一个上级指标</Alert>
                        </TabPane>
                        <TabPane label="修改" name="2">
                            <Form12 v-if="grade === 1 || grade === 2" :grade="grade" :pid="pId" mode="edit" :form-def="formData" @submit="getTreeData"></Form12>
                            <Form3 v-else-if="grade === 3" :grade="grade" :pid="pId" mode="edit" :form-def="formData" @submit="getTreeData"></Form3>
                            <Alert v-else>请先选择你要修改的指标</Alert>
                        </TabPane>
                        <TabPane label="删除" name="3">
                            <div style="margin: 0px 10px;">
                                <Button @click="deleteHandler">删除</Button>
                            </div>
                        </TabPane>
                    </Tabs>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
// 库
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
// 组件
import Form12 from './components/Form12'
import Form3 from './components/Form3'
// mixin
import business from '@/mixin/business.js';
export default {
    mixins: [
        business
    ],
    components: {
        Form12,
        Form3
    },
    data () {
        return {
            treeData: [],
            formData: {},
            grade: '',
            pId: '0'
        }
    },
    mounted () {
        this.getTreeData();
    },
    methods: {
        getTreeData () {
            this.$refs.ztree.destroy();
            axiosToken({
                url: '/a/config/indexDetail/ztree'
            }).then(res => {
                this.treeData = res.data.list.map(e => {
                    if (e.id === 0) {
                        return {
                            ...e,
                            open: true
                        }
                    } else {
                        return e
                    }
                })
            }).catch(error => axiosErrorHandler(error));
        },
        zTreeOnClick (event, treeId, treeNode) {
            this.formData = {
                ...treeNode,
                name: treeNode.grade === 3 ? treeNode.name1 : treeNode.name,
                type: String(treeNode.type)
            }
            this.grade = treeNode.grade || 0
            this.pId = String(treeNode.id)
        },
        deleteHandler () {
            axiosToken({
                url: '/a/config/indexDetail/' + this.formData.id,
                method: 'delete'
            }).then(res => {
                this.$Message.success(res.data.msg);
                this.getTreeData()
            }).catch(error => axiosErrorHandler(error));
        }
    }
};
</script>
