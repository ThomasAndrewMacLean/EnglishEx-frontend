<template lang="html">
    <section v-if="categories.find(c=> c._id === categoryId)" class="section container">
        <h1 class="title">Category:
            {{categories.find(c=> c._id === categoryId).name}}</h1>
        <ul class="columns is-multiline">
            <li class="column is-one-third" v-for="courseId in categories.find(c=> c._id === categoryId).courses" :key="courseId">
                <CourseAtom  :course="courses.find(c => c._id === courseId)" />
            </li>

        </ul>
    </section>
</template>

<script>
import TextLabel from './../components/TextLabel.vue';
import CourseAtom from './../components/CourseAtom';

export default {
    name: 'category',
    data() {
        return {
            categoryId: this.$route.params.categoryid,
            category: {},
            categoryCourses: []
        };
    },
    components: {
        TextLabel,
        CourseAtom
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
        this.$store
            .dispatch('getCategories')
            // .then(categoriez => {
            //     console.log(categoriez);

            //     this.categoryCourses = categoriez.find(
            //         c => c._id === this.categoryId
            //     ).courses;
            // })
            .catch(err => {
                this.$store.dispatch({
                    message: err
                });
            });
    }
};
</script>

<style>
</style>
