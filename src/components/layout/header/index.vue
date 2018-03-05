<template>
    <div>
        <h1 v-if="title">{{title}}</h1>
        <p v-if="subTitle" style="margin-bottom: 4px;">{{subTitle}}</p>
    </div>
</template>

<script>
export default {
    props: {
        title: {default: ''},
        subTitle: {default: ''}
    }
};
</script>

