<template>
    <Poptip title="操作">
        <span>{{data.title}}</span>
        <div slot="content">
            <Row v-if="data.type === 'Number'" :gutter="4" style="margin-bottom: 4px;">
                <Col span="12">
                    <!-- 升序 -->
                    <Button long size="small" @click="$emit('sort-sx', data)">
                        <Icon type="arrow-up-a"></Icon>
                    </Button>
                </Col>
                <Col span="12">
                    <!-- 降序 -->
                    <Button long size="small" @click="$emit('sort-jx', data)">
                        <Icon type="arrow-down-a"></Icon>
                    </Button>
                </Col>
            </Row>
            <Button long size="small" type="primary" @click="filterModalOpen">
                <Icon type="funnel"></Icon>
                过滤
            </Button>
            <Modal
                v-model="modal"
                title="过滤参数设置"
                width="300"
                @on-ok="modalOkHandler">
                <ParamControlNumber
                    v-if="data.type === 'Number'"
                    v-model="filterSetting">
                </ParamControlNumber>
                <ParamControlString
                    v-if="data.type === 'String'"
                    v-model="filterSetting">
                </ParamControlString>
            </Modal>
        </div>
    </Poptip>
</template>

<script>
import ParamControlNumber from '../ParamControl/Number'
import ParamControlString from '../ParamControl/String'
export default {
    components: {
        ParamControlNumber,
        ParamControlString
    },
    props: {
        data: {
            type: Object,
            required: false,
            default: () => ({})
        }
    },
    data () {
        return {
            modal: false,
            filterSetting: {},
            // 数字类型的筛选默认条件
            filterSettingNumber: {
                type: 'Number',
                value: [
                    {
                        enable: true,
                        sym: '>',
                        value: 0
                    },
                    {
                        enable: false,
                        sym: '>',
                        value: 0
                    }
                ]
            },
            // 字符类型的筛选默认条件
            filterSettingString: {
                type: 'String',
                value: []
            }
        }
    },
    created () {
        this.filterSetting = this.data.type === 'Number' ? {...this.filterSettingNumber} : {...this.filterSettingString}
    },
    methods: {
        // 打开筛选设置界面
        filterModalOpen () {
            this.modal = true
        },
        // 模态框确认了
        modalOkHandler () {
            this.$emit('filter', this.data, this.filterSetting)
        }
    }
}
</script>
