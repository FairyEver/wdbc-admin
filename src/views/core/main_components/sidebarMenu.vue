<style lang="less">
    @import './menu.less';
</style>

<template>
    <Menu
        ref="sideMenu"
        :active-name="$route.name"
        :open-names="openedSubmenuArr"
        :theme="$store.state.menuTheme"
        width="auto"
        @on-select="changeMenu">
        
        <template v-for="item in menuList">
            <template v-if="item.children">
                <MenuItem v-if="item.children.length < 1" :name="item.children[0].name" :key="item.path">
                    <Icon :type="item.icon" :size="iconSize" :key="item.path + '-icon'"></Icon>
                    <span class="layout-text" :key="item.path + '-span'">{{ itemTitle(item) }}</span>
                </MenuItem>
                <Submenu v-if="item.children.length>1" :name="item.name" :key="item.path">
                    <template slot="title">
                        <Icon :type="item.icon" :size="iconSize"></Icon>
                        <span class="layout-text">{{ itemTitle(item) }}</span>
                    </template>
                    <template v-for="child in item.children">
                        <MenuItem :name="child.name" :key="child.name">
                            <Icon :type="child.icon" :size="iconSize" :key="child.name + '-icon'"></Icon>
                            <span class="layout-text" :key="child.name + '-span'">{{ child.title }}</span>
                        </MenuItem>
                    </template>
                </Submenu>    
            </template>
        </template>

        <template v-for="item in menuListSync">
            <template v-if="item.childList">
                <MenuItem v-if="item.childList.length < 1" :name="item.childList[0].href" :key="item.id">
                    <Icon :type="item.icon" :size="iconSize" :key="item.id"></Icon>
                    <span class="layout-text" :key="item.id">{{ item.name }}</span>
                </MenuItem>
                <Submenu v-if="item.childList.length >= 1" :name="item.id" :key="item.id">
                    <template slot="title">
                        <Icon :type="item.icon" :size="iconSize" :key="item.id"></Icon>
                        <span class="layout-text">{{ item.name }}</span>
                    </template>
                    <template v-for="child in item.childList">
                        <MenuItem :name="child.href" :key="child.id">
                            <Icon :type="child.icon" :size="iconSize" :key="item.id"></Icon>
                            <span class="layout-text" :key="child.id">{{ child.name }}</span>
                        </MenuItem>
                    </template>
                </Submenu>    
            </template>
        </template>

    </Menu>
</template>

<script>
import util from '@/libs/util';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
export default {
    data () {
        return {
            openedSubmenuArr: this.$store.state.openedSubmenuArr
        };
    },
    name: 'sidebarMenu',
    props: {
        slotTopClass: String,
        menuList: Array,
        iconSize: Number
    },
    computed: {
        tagsList () {
            return this.$store.state.tagsList;
        },
        menuListSync () {
            return this.$store.state.navList;
        }
    },
    methods: {
        changeMenu (active) {
            console.log(active)
            if (active !== 'accesstest_index') {
                util.openNewPage(this, active);
                this.$router.push({
                    name: active
                });
            }
        },
        itemTitle (item) {
            if (typeof item.title === 'object') {
                return this.$t(item.title.i18n);
            } else {
                return item.title;
            }
        }
    },
    watch: {
        '$route' (to) {
            localStorage.currentPageName = to.name;
        },
        currentPageName () {
            this.openedSubmenuArr = this.$store.state.openedSubmenuArr;
            this.$nextTick(() => {
                if (this.$refs.sideMenu) {
                    this.$refs.sideMenu.updateOpened();
                }
            });
        }
    },
    updated () {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                this.$refs.sideMenu.updateOpened();
            }
        });
    }

};
</script>
