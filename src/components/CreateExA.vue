<template>
    <section>
        <h1 class="title">{{editMode? "Edit": "Create"}} Exercise Type A</h1>
        <p v-if="!editMode" class="level"> Here we create exercises type A, we set the left and right part in the
            correct order. These
            can also be uploaded from an Excelfile.
            It will upload the first sheet of an excel file, and it needs a title on the first row.
        </p>

        <div class="field">
            <label class="label" for="title">Title</label>
            <div class="columns title-input">
                <div class="column is-half">
                    <div class="control">
                        <input class="input is-radiusless" v-model="title" type="text" name="title" id="title" required>
                    </div>
                </div>
            </div>
        </div>

        <form @submit.prevent="addExercise">
            <div v-for="(line, index) in lines" :key="line.toString() + index" class="field">
                <div class="columns">
                    <div class="column">
                        <div class="control">
                            <input v-model="line.partA" class="input is-radiusless" type="text" required>
                        </div>
                    </div>
                    <div class="column">
                        <div class="control">
                            <input v-model="line.partB" class="input is-radiusless" type="text" required>
                        </div>
                    </div>
                    <a @click="deleteLine(line)" class="margin-delete-button delete" tabindex="-1"></a>
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <a @click="lines.push({})" class="button  is-radiusless">add</a>
                </div>
                <div class="control">
                    <button type="submit" class="button is-link is-radiusless">Save</button>
                </div>
            </div>
        </form>
        <label v-if="!editMode" for="inputfile">
            Upload file
            <input type="file" id="inputfile" @change="readExcel" style="display:none" />
        </label>
    </section>
</template>

<script>
export default {
    data() {
        return {
            //(this.exercise && this.exercise.exercise) ||
            lines: (this.exercise && this.exercise.exercise) || [{}],
            title: (this.exercise && this.exercise.title) || '',
            editMode: !!this.exercise,
            id: (this.exercise && this.exercise._id) || null
        };
    },
    methods: {
        deleteLine(line) {
            this.preventDefault;
            this.lines.splice(this.lines.findIndex(x => x === line), 1);
        },
        addExercise() {
            this.$store
                .dispatch('addExercise', {
                    exercise: this.lines,
                    title: this.title,
                    type: 'A',
                    id: this.id
                })
                .then(x => {
                    console.log(x);
                    this.$emit('updated', {
                        title: this.title,
                        exercise: this.lines
                    });
                    this.lines = [{}];
                    this.title = '';
                });
        },
        readExcel(event) {
            var inputElement = document.getElementById('inputfile');
            this.$store
                .dispatch('readExcel', {
                    file: inputElement.files[0]
                })
                .then(x => {
                    const keys = Object.keys(x[0]);
                    //dodgy shit goin on here... cant be sure of the order of the keys...
                    console.log(keys);
                    this.lines = x.map(y => {
                        return {
                            partA: y.partA || y[keys[0]],
                            partB: y.partB || y[keys[1]]
                        };
                    });
                    event.target.value = '';
                });
        }
    },
    props: ['exercise'],
    watch: {
        exercise(val) {
            this.editMode = true;
            this.title = val.title;
            this.lines = val.exercise;
            this.id = val._id;
        }
    }
};
</script>

<style scoped>
.margin-delete-button {
    margin-top: 20px;
    position: absolute;
    right: 0;
}
</style>
