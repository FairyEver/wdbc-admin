<template>
    <div>
        <LayoutHeader title="场栋配置" sub-title="配置场栋关系"></LayoutHeader>
        <Row :gutter="10">
            <Col span="10">
                <Card dis-hover>
                    <p slot="title">场</p>
                    <div style="margin: -17px -17px 0px -17px;"> 
                        <Vtable
                            ref="vtableChang"
                            v-bind="tableChang"
                            @save="vTableSaveHandlerChang"
                            @on="vTableOnHandlerChang">
                        </Vtable>
                    </div>
                    <PageList :current="page.current" :total="pageChang.total" :page-size="pageChang.size" @change="pageChangeHandlerChang"></PageList>
                </Card>
            </Col>
            <Col span="14">
                <Card dis-hover>
                    <p slot="title">{{dongCardTitle}}</p>
                    <Button href="#" slot="extra" size="small" @click="closeDong">
                        <Icon type="close"></Icon>
                        关闭
                    </Button>
                    <template v-if="changSelectId">
                        <div style="margin: -17px -17px 0px -17px;">
                            <Vtable
                                ref="vtableDong"
                                v-bind="tableDong"
                                @save="vTableSaveHandlerDong">
                            </Vtable>
                        </div>
                        <PageList :current="page.current" :total="pageDong.total" :page-size="pageDong.size" @change="pageChangeHandlerDong"></PageList>    
                    </template>
                    <template v-else>
                        <Alert style="margin-bottom: 0px;">
                            <Icon type="ios-arrow-back"></Icon>
                            请先选择一个场，点击
                            <Button size="small"><Icon type="edit"></Icon> 编辑下属栋</Button>
                        </Alert>
                    </template>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
// 库
import { axiosToken, axiosErrorHandler } from '@/plugins/axios.js';
// mixin
import business from '@/mixin/business.js';
import chang from './chang.js';
import dong from './dong.js';
export default {
    mixins: [
        business,
        chang,
        dong
    ],
    data () {
        return {
            // 缓存 当前选怎的场
            changSelectId: '',
            changSelectName: ''
        };
    },
    computed: {
        dongCardTitle () {
            return this.changSelectId ? `${this.changSelectName}的下属栋` : '请先在左侧选择场';
        }
    },
    created () {
        this.syncTableChangData();
    },
    watch: {
        changSelectId (value) {
            if (value) {
                this.resetPageDong();
                this.syncTableDongData();
            }
        }
    }
};
</script>
