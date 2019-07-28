<template>
    <a :href="'#/category/' + category._id" class="box is-radiusless">
        <h3 class="title">{{category.name}}</h3>

        <p class="level">{{category.info}}</p>
        <div class="tags has-addons">
            <span class="tag is-dark">#courses</span>
            <span class="tag is-info">{{category.courses.length}}</span>
        </div>
    </a>
</template>

<script>
export default {
    watch: {
        category: function() {}
    },
    props: ['category']
};
</script>

<style scoped>
</style>
