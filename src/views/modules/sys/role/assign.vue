<template>
    <section style="background:#eee; margin: -16px; padding: 10px;">
        <Row :gutter="10">
            <Col span="8">
                <Card dis-hover :bordered="false">
                    <p slot="title"><Icon type="briefcase"></Icon> 所在部门</p>
                    <div style="height: 300px; overflow: scroll;">
                        <Ztree ref="ztree" api="/a/sys/officeTree" @onClick="zTreeOnClick"></Ztree>
                    </div>
                </Card>
            </Col>
            <Col span="8">
                <Card dis-hover :bordered="false">
                    <p slot="title"><Icon type="person-stalker"></Icon> 待选人员</p>
                    <div style="height: 300px; overflow: scroll; position: relative;">
                        <div style="margin-bottom: 10px;">
                            <Input v-model="filterText" icon="ios-clock-outline" placeholder="关键字过滤"></Input>
                        </div>
                        <Tag v-for="(item, index) in userListFilted" :key="index" type="dot" :color="isSelected(item.id) ? 'green' : 'default'" @click.native="addUser(item)">{{item.name}}</Tag>
                        <Spin fix v-if="userListLoading"></Spin>
                    </div>
                </Card>
            </Col>
            <Col span="8">
                <Card dis-hover :bordered="false">
                    <p slot="title"><Icon type="person"></Icon> 已选人员</p>
                    <div style="min-height: 300px; overflow: scroll; position: relative;">
                        <Tag v-for="(item, index) in selectedUserList" :key="index" type="dot" color="green" closable @on-close="removeUser(index)">{{item.name}}</Tag>
                        <Spin fix v-if="selectedUserListLoading"></Spin>
                    </div>
                </Card>
            </Col>
        </Row>
    </section>
</template>

<script>
// 库
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
export default {
    data () {
        return {
            filterText: '',
            userList: [],
            selectedUserList: [],
            // 当前行的数据
            row: {},
            // loading
            userListLoading: false,
            selectedUserListLoading: false
        };
    },
    computed: {
        userListFilted () {
            if (this.filterText === '') {
                return this.userList;
            } else {
                return this.userList.filter(e => {
                    return e.name.indexOf(this.filterText) >= 0;
                });
            }
        }
    },
    methods: {
        zTreeOnClick (event, treeId, treeNode) {
            this.userListLoading = true;
            axiosToken({
                url: '/a/sys/role/user/' + treeNode.id
            }).then(res => {
                this.userListLoading = false;
                this.userList = res.data.userList;
            }).catch(error => axiosErrorHandler(error));
        },
        syncSelected () {
            this.selectedUserListLoading = true;
            axiosToken({
                url: '/a/sys/role/' + this.row.id + '/user'
            }).then(res => {
                this.selectedUserListLoading = false;
                this.selectedUserList = res.data.userList;
            }).catch(error => axiosErrorHandler(error));
        },
        isSelected (id) {
            return this.selectedUserList.find(e => e.id === id);
        },
        addUser (user) {
            if (this.isSelected(user.id)) {
                this.$Message.error('已经添加的人员');
            } else {
                this.selectedUserList.push(user);
            }
        },
        removeUser (id) {
            this.selectedUserList.splice(id, 1);
        },
        // 外部调用的方法
        init (row) {
            // 初始化
            this.$refs.ztree.init();
            this.row = row;
            this.syncSelected();
        },
        // 外部调用的方法
        destroy () {
            // 销毁
            this.$refs.ztree.destroy();
            this.selectedUserList = [];
            this.userList = [];
        }
    }
};
</script>
