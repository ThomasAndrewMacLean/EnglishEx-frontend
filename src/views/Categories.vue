<template>
    <section class="section container">
        <h1 class="title">Categories</h1>
        <ul>
            <li v-for="cat in categories.filter(c => c.courses.length && c.showOnHomePage)" :key="cat._id">
                <a :href="'#/category/' + cat._id">{{cat.name}}</a>
                <ol>
                    <li v-for="course in cat.courses" :key="cat._id+course">
                        {{courses.find(c => c._id === course) && courses.find(c => c._id === course).title}}
                    </li>
                </ol>
            </li>
        </ul>
    </section>
</template>

<script>
import TextLabel from './../components/TextLabel.vue';

export default {
    name: 'categories',
    data() {
        return {
            // courses: []
        };
    },
    components: {
        TextLabel
    },
    computed: {
        categories() {
            return this.$store.getters.getCategories;
        },
        courses() {
            return this.$store.getters.getCourses;
        }
    },
    mounted() {
        this.$store.dispatch('getCourses').catch(err => {
            this.$store.dispatch({
                message: err
            });
        });
        this.$store.dispatch('getCategories').catch(err => {
            this.$store.dispatch({
                message: err
            });
        });
    }
};
</script>

<style>
</style>
