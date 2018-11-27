<template>
    <section v-if="course" class="section container">
        <h1 class="title">{{course.title}} </h1>
        <div class="columns">
            <div class="column is-one-fifth side-menu">
                <div class="has-text-dark has-text-weight-light description" v-if="course">
                    {{course.description}}
                </div>

                <div :key="tag" v-for="tag in tags">
                    <label class="label">
                        {{tag || 'untagged'}}
                    </label>
                    <ul>
                        <li class="ex-list" :class="{ 'is-active': exercise && exercise._id === e.id }" :key="e.id"
                            v-for="e in exercises.filter(ex => ex.tagName === tag)"
                            @click="getExercise(e.id)">
                            {{e.title}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="column">
                <div v-if="exercise">
                    <Exercise :exercise="exercise" />
                </div>
                <div v-if="!exercise">
                    <TextLabel label="exerciseExplanation" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Exercise from './../components/Exercise';
import TextLabel from './../components/TextLabel.vue';

export default {
    name: 'course',
    components: {
        Exercise,
        TextLabel
    },
    data() {
        return {
            course: undefined,
            exercises: [],
            tags: []
        };
    },
    methods: {
        getExercise(exId) {
            this.$store
                .dispatch('getExercise', {
                    id: exId
                })
                .catch(err => {
                    console.log(err);
                    this.$router.push('/');
                });
        }
    },
    computed: {
        exercise() {
            return this.$store.getters.getCurrentExercise;
        }
    },
    mounted() {
        //this.$store.dispatch("getExercise");
        //TODO: store in vuex store so we dont fetch them every time we visit homepage?
        this.$store.dispatch('getExercise', {
            id: null
        });
        this.$store
            .dispatch('getCourse', {
                id: this.$route.params.courseid
            })
            .then(x => {
                this.course = x[0];
                this.exercises = x[0].exercises;
                this.tags = [...new Set(this.exercises.map(e => e.tagName))];
            })
            .catch(err => {
                console.log(err);
                this.$router.push('/');
            });
    }
};
</script>

<style lang="scss" scoped>
//@import '../../node_modules/bulma/bulma.sass';
@import '../mystyles.scss';

.is-active::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 6px;
    background: $purple;
    margin-bottom: 2px;
}

.is-active {
    color: $dark;
}

.description {
    margin-bottom: 1rem;
}

.ex-list {
    cursor: pointer;
    margin: 0.5rem 0;
}

.ex-list:hover {
    color: $dark;
}

.side-menu {
    border-right: 1px solid #ccc;
    margin-right: 1rem;
}
</style>
