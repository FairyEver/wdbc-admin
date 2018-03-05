<template>
    <div>
        <LayoutHeader :title="myFamily.name"></LayoutHeader>
        <br>
        <Row :gutter="10">
            <Col
                span="4"
                v-for="(item, index) in myFamilyChildList"
                :key="index"
                style="margin-bottom: 10px;">
                <Card dis-hover>
                    <div slot="title">
                        <Icon :type="item.icon"></Icon> {{item.name}}
                    </div>
                    <Button long size="large" @click="open(item.href)">进入</Button>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import util from '@/libs/util';
import { mapState } from 'vuex'
export default {
    props: {
        parentName: {default: 'manage'}
    },
    computed: {
        ...mapState({
            // navList 里面存的是nav接口返回的菜单结构
            navList: state => state.navList
        }),
        myName () {
            return this.$route.name
        },
        myFamily () {
            let manage = this.navList.find(e => e.href === this.parentName);
            let manageChildList = manage.childList || [];
            let myFamily = manageChildList.find(e => e.href === this.myName);
            return myFamily ? myFamily : {
                name: ''
            };
        },
        myFamilyChildList () {
            let myFamilyChildList = this.myFamily.childList || [];
            return myFamilyChildList;
        }
    },
    methods: {
        open (active) {
            if (active !== 'accesstest_index') {
                util.openNewPage(this, active);
                this.$router.push({
                    name: active
                });
            }
        }
    }
}
</script>
