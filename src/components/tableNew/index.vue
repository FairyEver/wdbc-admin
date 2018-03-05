<template>
    <div>
        <Table
            v-bind="attrs"
            :columns="columnsComputed"
            :data="dataComputed"
            :row-class-name="rowClassName"
            @on-select="selectHandler"
            @on-select-all="selectAllHandler"
            @on-selection-change="selectChangeHandler">
        </Table>
        <div v-if="addMode || saveMode" style="text-align: center; margin-top: 10px;">
            <Button v-if="addMode" @click="addRow" :type="addButtonType" shape="circle" :size="addButtonSize">
                <Icon :type="addButtonIcon"></Icon>
                {{addButtonText}}
            </Button>
            <span v-if="addMode && saveMode" style="display: inline-block; width: 10px;"></span>
            <Button v-if="saveMode" @click="saveHandler" :type="saveButtonType" shape="circle" :size="saveButtonSize">
                <Icon :type="saveButtonIcon"></Icon>
                {{saveButtonText}}
            </Button>
        </div>
    </div>
</template>

<script>
// mixin
import base from './base.js';
import control from './control.js';
import button from './button.js';
import add from './add.js';
import deleteMixin from './delete.js';
import save from './save.js';
import select from './select.js';
export default {
    mixins: [
        base,
        control,
        button,
        add,
        deleteMixin,
        save,
        select
    ]
};
</script>

<style>
.v-table-row-is-add td{
    background-color: #EBF7FF !important;
}
</style>

