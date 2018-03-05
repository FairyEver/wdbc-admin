<template>
    <div>
        <p style="text-align: center;"><Button @click="modal = true">查看全部数据</Button></p>
        <Modal
            v-model="modal"
            title="详细数据"
            width="90">
            <TableHeaderEditor v-model="currentColumns"></TableHeaderEditor>
            <TableBase :columns="tableColumns" :data="tableData"></TableBase>
        </Modal>
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
            modal: false,
            currentColumns: []
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
                    ...e,
                    title: e.title + ' ' + this.chinesePEG(e.PEG),
                    key: e.keyName + e.PEG
                }))
            ]
        }
    },
    methods: {
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
