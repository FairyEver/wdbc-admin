<template>
    <div>
        <Input v-model="searchText" placeholder="搜索..."></Input>
        <ul ref="tree" class="ztree"></ul>
    </div>
</template>

<script>
// 库
import $ from '@/plugins/jquery-vendor.js';
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
export default {
    props: {
        api: { default: '' },
        checked: { default: () => [] },
        // 额外设置
        mustChild: { default: false },
        // 树设置
        dataMode: { default: 'api' }, // 树组件自己根据api获取数据还是外部给予 api | data
        treeData: { default: () => [] }, // dataMode = data 时 treeData接收外部的树数据值
        treeAutoExpandAll: { default: false }, // 在初始化后自动展开
        initAfterSync: { default: false }, // 在 syncTreeData 后自动初始化
        // 简单数据相关设置
        simpleData: { default: true },
        idKey: { default: 'id' },
        pIdKey: { default: 'pId' },
        rootPId: { default: 0 },
        // 勾选相关设置
        check: { default: false },
        chkStyle: { default: 'checkbox' }, // checkbox | radio
        chkboxTypeY: { default: 'ps' },
        chkboxTypeN: { default: 's' },
        radioType: { default: 'all' }, // all | level (需要 chkStyle = radio)
        // 搜索数据字段
        searchKeyName: { default: 'name' }
    },
    data () {
        return {
            tree: {
                data: [],
                obj: null,
                checked: []
            },
            searchText: ''
        };
    },
    computed: {
        treeSetting () {
            // 树的设置
            return {
                data: {
                    simpleData: {
                        enable: this.simpleData,
                        idKey: this.idKey,
                        pIdKey: this.pIdKey,
                        rootPId: this.rootPId
                    }
                },
                check: {
                    enable: this.check,
                    chkStyle: this.chkStyle,
                    chkboxType: {
                        Y: this.chkboxTypeY,
                        N: this.chkboxTypeS
                    },
                    radioType: this.radioType
                },
                callback: {
                    // 判断是否必须子节点
                    beforeClick: (treeId, treeNode, clickFlag) => this.mustChild ? this.isChild(treeNode) : true,
                    beforeCheck: (treeId, treeNode) => this.mustChild ? this.isChild(treeNode) : true,
                    // 节点点击
                    onClick: (event, treeId, treeNode) => { this.$emit('onClick', event, treeId, treeNode); }
                }
            };
        }
    },
    created () {
        this.syncTreeData();
    },
    watch: {
        treeData (value) {
            if (this.dataMode === 'data') {
                // 只有在 dataMode = data 的时候才有效 (外部提供数据源)
                this.syncTreeData();
                if (this.tree.obj) {
                    this.tree.obj.refresh();
                }
            }
        },
        searchText () {
            this.searchNode()
        }
    },
    methods: {
        // 搜索节点
        searchNode () {
            // 显示所有的节点
            const showAllNode = (nodes) => {
                const nodesArray = this.tree.obj.transformToArray(nodes);
                for(var i = nodesArray.length - 1; i >= 0; i--) {
                    if(nodesArray[i].getParentNode() != null){
                        this.tree.obj.expandNode(nodesArray[i],false,false,false,false);
                    }else{
                        this.tree.obj.expandNode(nodesArray[i],true,true,false,false);
                    }
                    this.tree.obj.showNode(nodesArray[i]);
                    showAllNode(nodesArray[i].children);
                }
            }

            // 隐藏所有节点
            const hideAllNode = nodes => {			
                const nodesArray = this.tree.obj.transformToArray(nodes);
                for(var i=nodesArray.length-1; i>=0; i--) {
                    this.tree.obj.hideNode(nodesArray[i]);
                }
            }


            //更新节点状态
            const updateNodes = nodeList => {
                this.tree.obj.showNodes(nodeList);
                for(var i=0, l=nodeList.length; i<l; i++) {
                    //展开当前节点的父节点
                    this.tree.obj.showNode(nodeList[i].getParentNode()); 
                    //this.tree.obj.expandNode(nodeList[i].getParentNode(), true, false, false);
                    //显示展开符合条件节点的父节点
                    while(nodeList[i].getParentNode()!=null){
                        this.tree.obj.expandNode(nodeList[i].getParentNode(), true, false, false);
                        nodeList[i] = nodeList[i].getParentNode();
                        this.tree.obj.showNode(nodeList[i].getParentNode());
                    }
                    //显示根节点
                    this.tree.obj.showNode(nodeList[i].getParentNode());
                    //展开根节点
                    this.tree.obj.expandNode(nodeList[i].getParentNode(), true, false, false);
                }
            }
        
        
            // 如果这时候tree还没实例 就算了吧
            if (this.tree.obj === null) {
                return
            }
            
            const nodes = this.tree.obj.getNodes()

            // 如果搜索字符串是空 就恢复显示
            if (this.searchText === '') {
                showAllNode(nodes)
            }

            hideAllNode(nodes)

            const nodeList = this.tree.obj.getNodesByParamFuzzy(this.searchKeyName, this.searchText);

            updateNodes(nodeList)
        },
        // 工具方法
        syncTreeData () {
            if (this.dataMode === 'api') {
                // 获得树的数据
                axiosToken({
                    url: this.api
                }).then(res => {
                    this.tree.data = res.data;
                    // 判断是否需要立即初始化
                    if (this.initAfterSync) {
                        this.init();
                    }
                }).catch(error => axiosErrorHandler(error));
            } else {
                this.tree.data = this.treeData;
                // 判断是否需要立即初始化
                if (this.initAfterSync) {
                    this.init();
                }
            }
        },
        isChild (treeNode) {
            // 是否是最底层的节点(是否没有子节点)
            let filted = this.tree.data.filter(e => e.pId === treeNode.id );
            return filted.length === 0;
        },
        // 生命周期
        init () {
            // 初始化树
            if (this.tree.obj) {
                this.$Message.error('tree实例没有销毁');
            } else {
                this.tree.obj = $.fn.zTree.init($(this.$refs.tree), this.treeSetting, this.tree.data);
                this.checkNode();
                // 判断是否需要全部展开
                if (this.treeAutoExpandAll) {
                    this.tree.obj.expandAll(true);
                }
            }
        },
        destroy () {
            // 销毁树
            if (this.tree.obj) {
                this.tree.obj.destroy();
                this.tree.obj = null;
            }
        },
        // - - - - - - - - - - ztree 同名方法 - - - - - - - - - -
        // - - - - - - - - - - ztree 同名方法 - - - - - - - - - -
        // - - - - - - - - - - ztree 同名方法 - - - - - - - - - -
        getCheckedNodes (checked = true) {
            // 获取输入框被勾选 或 未勾选的节点集合。[setting.check.enable = true 时有效]
            if (this.tree.obj) {
                return this.tree.obj.getCheckedNodes(checked);
            } else {
                return [];
            }
        },
        getSelectedNodes () {
            // 获取 zTree 当前被选中的节点数据集合
            if (this.tree.obj) {
                return this.tree.obj.getSelectedNodes();
            } else {
                return [];
            }
        },
        // 回显
        checkNode () {
            if (this.tree.obj) {
                this.checked.forEach(e => {
                    let node = this.tree.obj.getNodeByParam('id', e);
                    if (node) {
                        if (this.check) {
                            this.tree.obj.checkNode(node, true, false);
                        } else {
                            this.tree.obj.selectNode(node, true, false);
                        }
                    }
                });
            }
        },
        // 外部使用方法
        getTreeValue () {
            // 获取树的值 不管是单选还是多选 都在这里返回
            if (this.check) {
                return this.getCheckedNodes();
            } else {
                return this.getSelectedNodes();
            }
        }
    }
};
</script>
