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
                    name: '淘汰记录',
                    downloadUrl: '/a/excelExport/eliminationRecordTemplate',
                    submitUrl: '/a/LayerExcelImport/importEliminationRecord',
                    type: 1
                },
                {
                    name: '抽测(个体)',
                    downloadUrl: '/a/excelExport/individualMeasureTemplate',
                    submitUrl: '/a/LayerExcelImport/importIndividualMeasure',
                    type: 2
                },
                {
                    name: '抽测(群体)',
                    downloadUrl: '/a/excelExport/groupMeasureTemplate',
                    submitUrl: '/a/LayerExcelImport/importGroupMeasure',
                    type: 3
                },
                {
                    name: '个体性状记录',
                    downloadUrl: '/a/excelExport/individualTraitRecord',
                    submitUrl: '/a/LayerExcelImport/importIndividualTraitRecord',
                    type: 4
                },
                {
                    name: '个体性状记录(群体)',
                    downloadUrl: '/a/excelExport/groupTraitRecord',
                    submitUrl: '/a/LayerExcelImport/importGroupCharacterRecord',
                    type: 5
                }
            ],
            uploadPagePublicSetting: {
                multiple: false
            }
        };
    }
}
</script>
