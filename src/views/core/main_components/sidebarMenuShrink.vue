<template>
    <div>
        <template>
            <div style="text-align: center;">
                <Dropdown v-for="(item, index) in menuList" transfer v-if="item.children.length !== 1" placement="right-start" :key="index" @on-click="changeMenu">
                    <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <template v-for="(child, i) in item.children">
                            <DropdownItem :name="child.name" :key="i"><Icon :type="child.icon"></Icon><span style="padding-left:10px;">{{ itemTitle(child) }}</span></DropdownItem>
                        </template>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown v-for="(item, index) in menuListSync" transfer v-if="item.childList.length !== 1" placement="right-start" :key="index" @on-click="changeMenu">
                    <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <template v-for="(child, i) in item.childList">
                            <DropdownItem :name="child.href" :key="i"><Icon :type="child.icon"></Icon><span style="padding-left:10px;">{{ itemTitleSync(child) }}</span></DropdownItem>
                        </template>
                    </DropdownMenu>
                </Dropdown>
                <!-- <Dropdown transfer v-else placement="right-start" :key="index" @on-click="changeMenu">
                    <Button @click="changeMenu(item.children[0].name)" style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <DropdownItem :name="item.children[0].name" :key="'d' + index"><Icon :type="item.icon"></Icon><span style="padding-left:10px;">{{ itemTitle(item.children[0]) }}</span></DropdownItem>
                    </DropdownMenu>
                </Dropdown> -->
            </div>
        </template>
    </div>
</template>

<script>
import util from '@/libs/util';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
export default {
    name: 'sidebarMenuShrink',
    props: {
        menuList: {
            type: Array
        },
        iconColor: {
            type: String,
            default: 'white'
        }
    },
    data () {
        return {
            currentPageName: this.$route.name,
            openedSubmenuArr: this.$store.state.openedSubmenuArr
        };
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
        },
        itemTitleSync (item) {
            if (typeof item.name === 'object') {
                return this.$t(item.name.i18n);
            } else {
                return item.name;
            }
        }
    },
    watch: {
        '$route' (to) {
            this.currentPageName = to.name;
            localStorage.currentPageName = to.name;
        }
    }
};
</script>
