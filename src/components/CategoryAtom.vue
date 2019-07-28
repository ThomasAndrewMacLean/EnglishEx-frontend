<template>
    <div>

        <h1>{{category.name}}</h1>
        <a :href="'#/category/' + category._id">{{category.name}}</a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: ''
        };
    },
    watch: {
        category: function() {}
    },
    props: ['category']
};
</script>

<style scoped>

</style>
