<template>
    <div>
        <LayoutHeader title="笼翅对照"></LayoutHeader>
        <Tabs value="add">
            <TabPane label="新增" name="add"><Add></Add></TabPane>
            <TabPane label="浏览" name="browse"><Browse></Browse></TabPane>
            <TabPane label="修改" name="edit"><Edit></Edit></TabPane>
        </Tabs>
    </div>
</template>

<script>
import Add from './page/add.vue'
import Browse from './page/browse.vue'
import Edit from './page/edit.vue'
export default {
    components: {
        Add,
        Browse,
        Edit
    }
}
</script>