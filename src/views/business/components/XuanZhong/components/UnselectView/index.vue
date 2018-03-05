<template>
    <div>
        <div style="margin-bottom: 10px;">
            <Button
                size="large"
                type="success"
                @click="submitHandler">
                <Icon type="checkmark-circled"></Icon>
                确定
            </Button>
            <Button
                size="large"
                type="primary"
                @click="moveHandler">
                <Icon type="paper-airplane"></Icon>
                移动选中的{{selectRows.length}}项到候选池
            </Button>
        </div>
        <TableHeaderEditor v-model="currentColumns"></TableHeaderEditor>
        <TableBase
            ref="table"
            :columns="tableColumns"
            :data="tableData"
            :select="true"
            :filterable="true"
            v-model="selectRows">
        </TableBase>
    </div>
</template>

<script>
import TableBase from '../TableBase'
import TableHeaderEditor from '../TableHeaderEditor'
export default {
    components: {
        TableBase,
        TableHeaderEditor
    },
    props: {
        data: {
            type: Array,
            required: false,
            default: () => []
        },
        columns: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    data () {
        return {
            currentColumns: [],
            selectRows: []
        }
    },
    created () {
        this.currentColumns = this.columns
    },
    watch: {
        columns: {
            handler (value) {
                this.currentColumns = [...value]
            },
            deep: true
        },
        currentColumns: {
            handler (value) {
                if (JSON.stringify(value) !== JSON.stringify(this.columns)) {
                    this.$emit('update:columns', value)
                }
            },
            deep: true
        }
    },
    computed: {
        tableData () {
            const columns = this.currentColumns.filter(e => e.display)
            return this.data.map(e => {
                let temp = {}
                columns.forEach(col => {
                    temp[col.keyName + col.PEG] = e[col.PEG][col.keyName] === undefined ? '' : e[col.PEG][col.keyName]
                })
                temp.id = e.id
                return temp
            })
        },
        tableColumns () {
            return [
                {
                    title: 'ID',
                    key: 'id'
                },
                ...this.currentColumns.filter(e => e.display).map(e => ({
                    // 用的是 key title 这两个字段
                    ...e,
                    title: e.title + ' ' + this.chinesePEG(e.PEG),
                    key: e.keyName + e.PEG
                }))
            ]
        }
    },
    methods: {
        submitHandler () {
            this.$emit('fixed')
        },
        moveHandler () {
            this.$emit('move', this.selectRows, this.$refs.table.filterSettingHistory)
        },
        chinesePEG (PEG) {
            switch (PEG) {
                case 'P':
                    return '表型值'
                case 'E':
                    return '育种值'
                case 'G':
                    return '基因值'
                default:
                    return ''
            }
        }
    }
}
</script>