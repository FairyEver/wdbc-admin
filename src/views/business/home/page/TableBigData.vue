<template>
  <div>
    <Button @click="makeData">产生数据</Button>
    <Button @click="render" :disabled="!mockData.list">渲染表格</Button>
    <!-- <Table v-bind="table"></Table> -->
    <table border="1" class="gridtable">
      <tr v-for="(item, index) in table.data" :key="index">
        <th v-for="(key, keyIndex) in Object.keys(item)" :key="keyIndex">{{item[key]}}</th>
        <th>编辑</th>
      </tr>
    </table>
  </div>
</template>

<script>
import Mock from 'mockjs'
export default {
  data () {
    return {
      mockData: {},
      table: {
        columns: [],
        data: []
      }
    }
  },
  methods: {
    makeData () {
      this.mockData = Mock.mock({
        'list|2000': [{
          'id|+1': 1,
          'name': '@CNAME',
          'star|1-5': '★',
          'delFlag|1': [0, 1],
          'creatDate': '@DATE',
          'address': '@CITY',
          'zip': '@ZIP',
          'natural1': '@NATURAL(10, 100000)',
          'natural2': '@NATURAL(10, 100000)',
          'natural3': '@NATURAL(10, 100000)',
          'natural4': '@NATURAL(10, 100000)',
          'natural5': '@NATURAL(10, 100000)',
          'natural6': '@NATURAL(10, 100000)',
          'natural7': '@NATURAL(10, 100000)',
          'natural8': '@NATURAL(10, 100000)',
          'natural9': '@NATURAL(10, 100000)',
          'natural10': '@NATURAL(10, 100000)'
        }]
      })
      this.$Message.success('数据产生完成')
    },
    render () {
      this.table.columns = Object.keys(this.mockData.list[0]).map(e => ({
        title: e,
        key: e
      }))
      this.table.data = this.mockData.list
    }
  }
}
</script>

<style>
table.gridtable {
	font-family: verdana,arial,sans-serif;
	font-size:11px;
	color:#333333;
	border-width: 1px;
	border-color: #666666;
	border-collapse: collapse;
}
table.gridtable th {
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #666666;
	background-color: #dedede;
}
table.gridtable td {
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #666666;
	background-color: #ffffff;
}
</style>


