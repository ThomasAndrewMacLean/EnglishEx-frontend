<template>
    <section>
        <h1 class="title">Create New Course Card</h1>
        <p class="level"> Here we set the title and description of a course, plus we add the exercises that go in the
            course.</p>

        <form @submit.prevent="addCourse" class="form">

            <div class="field">
                <label class="label" for="title">Title</label>
                <div class="columns">
                    <div class="column is-half">
                        <div class="control">
                            <input class="input is-radiusless" v-model="course.title" type="text" name="title" id="title"
                                required>
                        </div>
                    </div>

                </div>
            </div>

            <div class="field">
                <label class="label" for="img">Image URL</label>
                <div class="columns">

                    <div class="column">
                        <div class="control">
                            <input class="input is-radiusless" v-model="course.imgURL" type="text" name="img" id="img">
                        </div>
                    </div>

                    <div class="column">
                        <div :style="{ backgroundImage: `url('${course.imgURL}')` }" id="imgPreview">
                        </div>
                    </div>
                </div>
            </div>
            <div class="field">
                <label class="label" for="description">Description</label>
                <div class="control">
                    <textarea class="textarea is-radiusless" v-model="course.description" type="text" name="description"
                        id="description" required />
                    </div>
            </div>
            <div class="columns">
                <div class="column is-two-thirds">

                    <div class="panel margin-top">
                        <p class="panel-heading">
                            Exercises
                        </p>
                        <div class="panel-block search-panel">
                            <p class="control has-icons-left">
                                <input class="input search-input is-radiusless" v-model="fil" type="text" placeholder="search">
                            <span class="icon is-small is-left search-icon">
      <i class="fas fa-search"></i>
    </span>
                            </p>
                        </div>
                        <a v-for="(ex, index) in filteredExercises" :key="index" :class="ex.isActive ? 'is-active panel-block' : 'panel-block'" @click="ex.isActive = ! ex.isActive">

                    <span>
                            {{ex.title}}
                            <span class="type is-italic has-text-grey-dark is-size-7">
                                (type: {{ ex.type}})
                                
                            </span>
                                 <span v-if="ex.tagName" class="type is-italic has-text-grey-dark is-size-7">
                                (tag: {{ ex.tagName}})
                                
                            </span>

                    </span>
                    <button @click.prevent="addTagName($event, ex)" v-if="ex.isActive" class="button is-small is-radiusless is-pulled-right">{{ex.tagName? 'Edit': 'Add'}} Tag</button>
                        </a>
                    </div>
                </div>
                <div class="column">
                    <div class="field margin-top">
                        <div class="control">
                            <button type="submit" class="button is-primary is-radiusless">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
export default {
    data() {
        return {
            course: {},
            exercises: [],
            fil: ''
        };
    },
    methods: {
        addCourse() {
            this.course.exercises = this.exercises.filter(e => e.isActive);
            this.$store
                .dispatch('addCourse', {
                    course: this.course
                })
                .then(() => this.clearCourse());
        },
        clearCourse() {
            this.exercises.forEach(e => (e.isActive = false));
            this.course = {};
        },
        addTagName(event, ex) {
            event.stopPropagation();
            let tagName = prompt('Please enter the tagname for ' + ex.title);
            ex.tagName = tagName;
            this.$forceUpdate();
        }
    },
    mounted() {
        //TODO: store in vuex store so we dont fetch them every time we visit homepage?
        this.$store.dispatch('getExercises').then(x => {
            return (this.exercises = x
                .filter(y => y.title && !y.delete)
                .map(z => {
                    return {
                        id: z._id,
                        isActive: false,
                        title: z.title,
                        type: z.type
                    };
                }));
        });
    },
    computed: {
        filteredExercises() {
            return this.exercises.filter(
                e =>
                    e.title.toLowerCase().indexOf(this.fil.toLowerCase()) !== -1
            );
        }
    }
};
</script>

<style scoped>
#imgPreview {
    outline: 1px solid #ccc;
    height: 160px;
    width: 320px;
    position: absolute;
    top: 160px;
    margin-left: 21px;
    background-size: cover;
    background-repeat: no-repeat;
}
.type {
    margin-left: 0.5rem;
}

.margin-top {
    margin-top: 2rem;
}

.panel-block.is-active {
    border-left-width: 1rem;
}

.panel-block {
    justify-content: space-between;
    min-height: 50px;
}

.search-panel {
    padding: 0;
}

.search-input {
    min-height: 50px;
}

.search-icon {
    margin-top: 7px;
}
</style>
