<template>
    <div>
        <Card shadow>
            <p slot="title">{{title}}</p>
            <Tree :empty-text="loadingText" :data="treeData" @on-select-change="select"></Tree>
        </Card>
    </div>
</template>

<script>
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
export default {
    name: 'treeGrid',
    props: {
        api: {default: ''},
        currentOfficeId: {default: ''},
        title: {default: ''}
    },
    data () {
        return {
            treeData: [],
            loadingText: ''
        };
    },
    created () {
        this.getTreeData();
    },
    methods: {
        select (node) {
            if (node.length !== 0) {
                this.$emit('update:currentOfficeId', node[0].id);
            } else {
                this.$emit('update:currentOfficeId', '');
            }
        },
        getTreeData () {
            this.loadingText = '数据加载中……';
            axiosToken({
                url: this.api
            }).then(res => {
                if (res.data.officeTree.length === 0) {
                    this.loadingText = '暂无数据';
                } else {
                    this.loadingText = '';
                }
                this.treeData = res.data.officeTree;
            }).catch(error => axiosErrorHandler(error));
        }
    }
};
</script>
