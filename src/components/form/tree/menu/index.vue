<template>
    <div>
        <Poptip trigger="hover" title="已选择" placement="bottom">
            <div slot="content" style="max-height: 200px;">
                <div v-for="(item, index) in nameAndValueArray" :key="index">{{item}}</div>
            </div>
            <Button @click="modal.show = true">
                <Icon v-if="buttonTextComputed === buttonText" :type="buttonIcon"></Icon>
                {{ buttonTextComputed }}
            </Button>
        </Poptip>
        <Modal title="请选择菜单" v-model="modal.show" @on-ok="modalOk" width="400">
            <Ztree ref="ztree" data-mode="data" :tree-data="tree.data" :checked="valueArray" v-bind="$attrs"></Ztree>
        </Modal>
    </div>
</template>

<script>
// mixin
import formTreePublic from '../public.js';

export default {
    mixins: [
        formTreePublic
    ],
    data () {
        return {
            setting: {
                API: '/a/sys/menuTree'
            }
        };
    },
    methods: {
        modalShowHandler () {
            this.ztree.init();
        },
        modalHideHandler () {
            this.ztree.destroy();
        }
    }
};
</script>

