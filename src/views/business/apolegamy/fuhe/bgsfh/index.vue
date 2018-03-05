<template>
    <Card dis-hover style="min-height: 300px;">
        <Tabs :animated="false" type="card" :value="String(0)">
            <TabPane
                v-for="(tab, index) in tabs"
                :key="index"
                :label="tab.name"
                :name="String(index)">
                <UploadPage
                    :name="tab.name"
                    v-bind="uploadPagePublicSetting"
                    :download-url="tab.downloadUrl"
                    :submit-url="tab.submitUrl"
                    :type="tab.type"
                    action-path="/a/sys/uploadFile/upload">
                </UploadPage>
            </TabPane>
        </Tabs>
    </Card>
</template>

<script>
import Cookies from 'js-cookie';
import UploadPage from '@/views/business/components/uploadPage.vue';
export default {
    components: {
        UploadPage
    },
    data () {
        return {
            tabs: [
                {
                    name: '母鸡蛋色复核',
                    downloadUrl: '/a/officeRecheckExcelExport/henEggColorTemplate',
                    submitUrl: '/a/officeRecheckExcelImport/henEggColorRecheckImport',
                    type: 7
                },
                {
                    name: '公鸡蛋色复核',
                    downloadUrl: '/a/officeRecheckExcelExport/cockEggColorTemplate',
                    submitUrl: '/a/officeRecheckExcelImport/cockEggColorRecheckImport',
                    type: 8
                },
                {
                    name: '光泽度',
                    downloadUrl: '/a/officeRecheckExcelExport/glossTemplate',
                    submitUrl: '/a/officeRecheckExcelImport/glossRecheckImport',
                    type: 9
                },
                {
                    name: '水纹',
                    downloadUrl: '/a/officeRecheckExcelExport/waterWaveTemplate',
                    submitUrl: '/a/officeRecheckExcelImport/waterWaveRecheckImport',
                    type: 10
                },
                {
                    name: '精液',
                    downloadUrl: '/a/officeRecheckExcelExport/semenTemplate',
                    submitUrl: '/a/officeRecheckExcelImport/semenRecheckImport',
                    type: 11
                }
            ],
            uploadPagePublicSetting: {
                multiple: false
            }
        };
    }
}
</script>
