export default `<DictSelect
    style="width:200px" 
    :value.sync="value1"
    :placeholder="placeholder1"
    type="yes_no">
</DictSelect>
<script>
export default {
    data () {
        return {
            value1: '',
            placeholder1: '请选择'
        }
    }
}
</script>`;
