export default `<template>
    <Row :gutter="10">
        <Col span="4">
            <Card dis-hover>
                <p slot="title">Table</p>
                <Form label-position="top">
                    <Row :gutter="10">
                        <Col span="12"><FormItem label="stripe"><i-switch v-model="table.stripe"></i-switch></FormItem></Col>
                        <Col span="12"><FormItem label="loading"><i-switch v-model="table.loading"></i-switch></FormItem></Col>
                    </Row>
                    <FormItem label="height">
                        <Slider v-model="table.height" :min="50" :max="300" :step="50" show-stops></Slider>
                    </FormItem>
                </Form>
                <ButtonGroup>
                    <Button @click="clearData">清空</Button>
                    <Button @click="getData">加载</Button>
                </ButtonGroup>
            </Card>
        </Col>
        <Col span="20">
            <Vtable ref="vtable" v-bind="table"></Vtable>
        </Col>
        <Col span="24">
            <br>
            <CodeCard :data="code" :stringify="false"></CodeCard>
        </Col>
    </Row>
</template>

<script>
import { axios, axiosErrorHandler } from '@/plugins/axios.js';
import code from './code/base-play.js';
export default {
    data () {
        return {
            table: {
                columns: [
                    {title: '姓名', key: 'name', width: 200, align: 'center', fixed: 'left'},
                    {title: '年龄', key: 'age', width: 100},
                    {title: '地址', key: 'address', width: 240},
                    {title: '已婚', key: 'married', width: 100},
                    {title: '管理员', key: 'admin', width: 100},
                    {title: '创建日期', key: 'creatData', width: 150},
                    {title: '更新日期', key: 'updateData', width: 200},
                    {title: '删除', key: 'delFlag', width: 100},
                    {title: '全勤', key: 'qq', width: 100},
                    {title: '项目', key: 'project', width: 100}
                ],
                data: [],
                stripe: true,
                loading: false,
                height: 200
            },
            code
        };
    },
    created () {
        this.getData();
    },
    methods: {
        clearData () {
            this.table.data = [];
        },
        getData () {
            this.table.loading = true;
            axios.get('https://www.easy-mock.com/mock/5a09103ac645f122782988de/wdbc-admin/table')
            .then(res => {
                this.table.data = res.data.list;
                this.table.loading = false;
            })
            .catch(error => axiosErrorHandler(error));
        }
    }
};
</script>`;
