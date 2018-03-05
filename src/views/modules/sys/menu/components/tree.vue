<template>
    <div>
        <Button @click="modalOpen">{{ buttonText }}</Button>
        <Modal
            v-model="modal.show"
            title="请选择"
            @on-ok="modalOk"
            @on-cancel="modalCancel">
            <div style="max-height: 400px; overflow: scroll;">
                <Tree :data="treeData" @on-select-change="onSelectChange"></Tree>
            </div>
        </Modal>
    </div>
</template>

<script>
// 菜单选择树
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
export default {
    props: {
        value: {default: ''},
        api: {default: ''}
    },
    data () {
        return {
            modal: {
                show: false
            },
            treeData: [],
            treeSelected: {},
            buttonText: '请选择'
        };
    },
    watch: {
        value (value) {
            this.getTitle();
        }
    },
    created () {
        this.syncData();
    },
    methods: {
        syncData () {
            // 请求数据
            if (this.api !== '') {
                axiosToken({
                    url: this.api
                }).then(res => {
                    this.treeData = res.data.mapList;
                    this.getTitle();
                }).catch(error => axiosErrorHandler(error));
            }
        },
        onSelectChange (value) {
            // tree节点被选中(不是勾选)
            this.treeSelected = value[0];
        },
        getTitle () {
            let arr = [];
            let maker = (tempArray) => {
                tempArray.forEach(e => {
                    if (e.children) {
                        maker(e.children);
                    }
                    arr.push({
                        id: e.id,
                        title: e.title
                    });
                });
            };
            maker(this.treeData);
            let find = arr.find(e => e.id === this.value);
            if (find) {
                this.buttonText = find.title;
            }
        },
        modalOpen () {
            this.modal.show = true;
        },
        modalOk () {
            console.log(this.treeSelected);
            this.$emit('update:value', this.treeSelected.id);
        },
        modalCancel () {

        }
    }
};
</script>
