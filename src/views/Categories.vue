<template lang="html">
    <section class="section container">
        <h1 class="title">
            <TextLabel label="categoriesTitle" />
        </h1>
        <p class="level">
            <TextLabel label="categoriesExplanation" />
        </p>
        <ul class="columns is-multiline">
            <li class="column is-one-third"
                v-for="cat in categories.filter(c => c.name && c.courses.length && c.showOnHomePage)" :key="cat._id">
                <CategoryAtom :category="cat" />
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
