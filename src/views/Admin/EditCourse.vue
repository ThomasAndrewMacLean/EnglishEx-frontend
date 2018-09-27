<template>
    <section>
        <!-- have all courses right. click one to load it and edit it -->
        <h1 class="title">Edit Courses</h1>
        <div v-if="!selectedCourse" class="columns is-multiline">
            <div class="column is-one-third " v-if="course.title" v-for="(course,index) in courses.filter(c => !c.delete)"
                :key="index">
                <div class="box is-radiusless" @click="selectCourse(course)">
                    <div class="img image is-3by1" :style="{ backgroundImage: `url('${course.imgURL}')` }"></div>
                    <p class="title">{{course.title}}</p>
                    <p class="level">{{course.description}}</p>
                    <ul v-for="ex in course.exercises" :key="ex._id">
                        <li>
                            {{ex.title}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <form v-if="selectedCourse" @submit.prevent="editCourse" class="form">

            <div class="field">
                <label class="label" for="title">Title</label>
                <div class="columns">
                    <div class="column is-half">
                        <div class="control">
                            <input class="input is-radiusless" v-model="selectedCourse.title" type="text" name="title"
                                id="title" required>
                        </div>
                    </div>

                </div>
            </div>

            <div class="field">
                <label class="label" for="img">Image URL</label>
                <div class="columns">

                    <div class="column">
                        <div class="control">
                            <input class="input is-radiusless" v-model="selectedCourse.imgURL" type="text" name="img"
                                id="img">
                        </div>
                    </div>

                    <div class="column">
                        <div :style="{ backgroundImage: `url('${selectedCourse.imgURL}')` }" id="imgPreview2">
                        </div>
                    </div>
                </div>
            </div>
            <div class="field">
                <label class="label" for="description">Description</label>
                <div class="control">
                    <textarea class="textarea is-radiusless" v-model="selectedCourse.description" type="text" name="description"
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
                            <button @click.prevent="clearCourse" class="button cancel-button is-radiusless">Cancel</button>
                            <Button @click.prevent="showModal=true" class="button delete-button is-radiusless">Delete</Button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
         <div :class="showModal? 'is-active modal':'modal'">
            <div class="modal-background"></div>
            <div class="modal-card is-radiusless">
                <header class="modal-card-head is-radiusless">
                    <p class="modal-card-title">Are you sure??</p>
                    <button @click="showModal=false" class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <!-- Content ... -->
                    Are you sure you want to delete this exercise?
                </section>
                <footer class="modal-card-foot is-radiusless">
                    <button @click="deleteCourse" class="button is-danger is-radiusless">Yes, delete</button>
                    <button @click="showModal=false" class="button is-radiusless">Cancel</button>
                </footer>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'editCourse',
    data() {
        return {
            courses: [],
            selectedCourse: null,
            fil: '',
            exercises: [],
            showModal: false
        };
    },
    methods: {
        selectCourse(c) {
            this.selectedCourse = c;
            this.exercises.forEach(e => {
                e.isActive = c.exercises.map(d => d.id).includes(e.id);
                let exx = c.exercises.find(d => e.id === d.id);
                if (exx && exx.tagName) {
                    e.tagName = exx.tagName;
                }
            });
        },
        deleteCourse() {
            this.showModal = false;
            this.selectedCourse.delete = true;
            this.$store
                .dispatch('editCourse', {
                    course: this.selectedCourse
                })
                .then(() => this.clearCourse());
        },
        editCourse() {
            this.selectedCourse.exercises = this.exercises.filter(
                e => e.isActive
            );
            this.$store
                .dispatch('editCourse', {
                    course: this.selectedCourse
                })
                .then(() => this.clearCourse());
        },
        clearCourse() {
            this.exercises.forEach(e => (e.isActive = false));
            this.selectedCourse = null;
        },
        addTagName(event, ex) {
            event.stopPropagation();
            let tagName = prompt('Please enter the tagname for ' + ex.title);
            ex.tagName = tagName;
            this.$forceUpdate();
        }
    },
    computed: {
        filteredExercises() {
            return this.exercises.filter(
                e =>
                    e.title.toLowerCase().indexOf(this.fil.toLowerCase()) !== -1
            );
        }
    },
    mounted() {
        //TODO: store in vuex store so we dont fetch them every time we visit homepage?
        this.$store
            .dispatch('getCourses')
            .then(x => (this.courses = x))
            .catch(err => {
                console.log('err');
                console.log(err);

                this.$router.push('/');
            });
        this.$store.dispatch('getExercises').then(x => {
            return (this.exercises = x
                .filter(y => y.title && !y.delete)
                .map(z => {
                    return {
                        id: z._id,
                        isActive: false,
                        title: z.title,
                        type: z.type,
                        tagName: z.tagName
                    };
                }));
        });
    }
};
</script>

<style scoped>
.search-icon {
    margin-top: 7px;
}
.search-panel {
    padding: 0;
}
.search-input {
    min-height: 50px;
    line-height: 50px;
}
.panel-block {
    justify-content: space-between;
    min-height: 50px;
}
.box {
    cursor: pointer;
}
ul {
    list-style: inside;
}
.img {
    height: auto;
    background: tomato;
    width: calc(100% + 2.5rem);
    margin-left: -1.25rem;
    margin-top: -1.25rem;
    background-size: cover;
    background-repeat: no-repeat;
    filter: grayscale(20%);
}
#imgPreview2 {
    outline: 1px solid #ccc;
    height: 160px;
    width: 320px;
    position: absolute;
    top: 120px;
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
.delete-button {
    float: right;
}
.delete-button:hover {
    background-color: #ff3860;
    border-color: transparent;
    color: #fff;
}
.cancel-button {
    margin-left: 1rem;
}
.box {
    height: 100%;
}
</style>
