<template>
    <section>
        <h1 class="title">Edit Exercise</h1>
        <p class="level">Select an exercise and then alter it down below.</p>

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
            <a v-for="(ex, index) in filteredExercises" :key="index" :class="ex.isActive ? 'is-active panel-block' : 'panel-block'"
                @click="selectEx(ex)">

                {{ex.title}} <span class="type is-italic has-text-grey-dark is-size-7"> (type:
                    {{ ex.type}})</span>
            </a>
        </div>
        <div id="editArea">
            <CreateExA @updated="exHasBeenUpdated" v-if="selectedEx && selectedEx.type ==='A'" :exercise="selectedEx" />
            <CreateExB @updated="exHasBeenUpdated" v-if="selectedEx && selectedEx.type ==='B'" :exercise="selectedEx" />
        </div>
        <Button @click="showModal=true" v-if="selectedEx" class="button delete-button is-radiusless">Delete</Button>
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
                    <button @click="deleteEx" class="button is-danger is-radiusless">Yes, delete</button>
                    <button @click="showModal=false" class="button is-radiusless">Cancel</button>
                </footer>
            </div>
        </div>
    </section>
</template>

<script>
import CreateExA from './CreateExA';
import CreateExB from './CreateExB';
export default {
    name: 'editEx',
    data() {
        return {
            selectedEx: null,
            exercises: [],
            fil: '',
            showModal: false
        };
    },
    components: {
        CreateExA,
        CreateExB
    },
    methods: {
        selectEx(c) {
            this.exercises.forEach(e => (e.isActive = false));
            c.isActive = true;
            this.selectedEx = c;
            setTimeout(() => {
                window.scrollTo({
                    top: document.getElementById('editArea').offsetTop + 35,
                    behavior: 'smooth'
                });
            }, 10);
        },
        exHasBeenUpdated(ex) {
            this.selectedEx.isActive = false;
            this.selectedEx.title = ex.title;
            this.selectedEx.exercise = ex.exercise;
            this.selectedEx = null;
        },
        deleteEx() {
            this.showModal = false;
            this.exercises.splice(this.exercises.indexOf(this.selectedEx), 1);

            this.$store
                .dispatch('addExercise', {
                    id: this.selectedEx._id,
                    delete: true
                })
                .then(() => {
                    this.selectedEx = null;
                });
        }
    },
    mounted() {
        this.$store.dispatch('getExercises').then(x => {
            this.exercises = x.filter(y => !y.delete);
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
.panel-block.is-active {
    border-left-width: 1rem;
}

.delete-button {
    margin-top: -36px;
    float: right;
}

.delete-button:hover {
    background-color: #ff3860;
    border-color: transparent;
    color: #fff;
}

.type {
    margin-left: 0.5rem;
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
