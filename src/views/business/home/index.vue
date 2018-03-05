<template>
    <div>
        <Card dis-hover v-if="hideTabs">欢迎使用！</Card>
        <Tabs value="tab1" v-else>
            <TabPane label="接口测试工具" name="tab1">
                <ApiTest></ApiTest>
            </TabPane>
            <TabPane label="栋号批量生成" name="tab2">
                <CodeMaker></CodeMaker>
            </TabPane>
            <TabPane label="上传文件测试" name="tab3">
                <Upload></Upload>
            </TabPane>
            <TabPane label="路由测试" name="tab4">
                <Router></Router>
            </TabPane>
            <TabPane label="表格数据测试" name="tab5">
                <TableBigData></TableBigData>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import CodeMaker from './page/CodeMaker.vue'
import ApiTest from './page/ApiTest.vue'
import Upload from './page/Upload.vue'
import Router from './page/Router.vue'
import TableBigData from './page/TableBigData'

export default {
    components: {
        CodeMaker,
        ApiTest,
        Upload,
        Router,
        TableBigData
    },
    computed: {
        hideTabs () {
            switch (this.$store.state.environment) {
                case 'online':
                    return true;
                case 'qas':
                    return true;
                case 'test':
                    return true;
                case 'dev':
                    return false;
                case 'local':
                    return false;
                default:
                    return true;
            }
        }
    }
}
</script>

