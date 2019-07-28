<template lang="html">
    <section class="section container">
        <h1 class="title">Categories</h1>
        <ul>
            <li v-for="cat in categories.filter(c => c.courses.length && c.showOnHomePage)" :key="cat._id">
                
                    <CategoryAtom :category="cat" />
                    <!-- <li v-for="course in cat.courses" :key="cat._id+course">
                        {{courses.find(c => c._id === course) && courses.find(c => c._id === course).title}}
                    </li> -->
            </li>
        </ul>
    </section>
</template>

<script>
import TextLabel from './../components/TextLabel.vue';
import CategoryAtom from './../components/CategoryAtom';
export default {
    name: 'categories',
    data() {
        return {
            // courses: []
        };
    },
    components: {
        TextLabel,
        CategoryAtom
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
