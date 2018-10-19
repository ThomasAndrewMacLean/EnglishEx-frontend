<template>
    <section>
        <h1 class="title">{{editMode? "Edit": "Create"}} Exercise Type C</h1>
        <p v-if="!editMode" class="level"> Here we create exercises type C.
            One word is missing from each line. The word may be at the beginning, the end or somewhere
            in between. Write in the missing words in the spaces provided.

            To create these exercises just write the whole sentence, and put the word between double brackets [[]]
        </p>

        <div v-if="error" class="notification is-danger">
            <button @click="error = ''" class="delete"></button>
            {{error}}
        </div>
        <form @submit.prevent="addExercise">
            <div class="field">
                <label class="label" for="title">Title</label>
                <div class="columns">
                    <div class="column is-half">
                        <div class="control">
                            <input class="input is-radiusless" v-model="title" type="text" name="title" id="title"
                                required>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field">
                <label class="label" for="title">Info</label>
                <div class="info-input">
                    <div class="control">
                        <input class="input is-radiusless" v-model="info" type="text" name="info" id="info" placeholder="info">
                    </div>
                </div>
            </div>

            <div v-for="(line, index) in lines" :key="line.toString() + index" class="field">
                <div class="columns">
                    <div class="column">
                        <div class="control">
                            <input v-model="line.partA" class="input is-radiusless" type="text" required>
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
                    <button type="submit" class="button is-primary is-radiusless">Save</button>
                </div>
            </div>
        </form>
        <label v-if="!editMode" class="button upload-button is-radiusless" for="inputfile">
            <span class="file-icon">
                <i class="fas fa-upload"></i>
            </span>
            Upload file
            <input type="file" id="inputfile" @change="readExcel" style="display:none" />
        </label>
    </section>
</template>

<script>
export default {
    data() {
        return {
            lines: (this.exercise && this.exercise.exercise) || [{}],
            title: (this.exercise && this.exercise.title) || '',
            editMode: !!this.exercise,
            id: (this.exercise && this.exercise._id) || null,
            error: ''
        };
    },
    methods: {
        deleteLine(line) {
            this.preventDefault;
            this.lines.splice(this.lines.findIndex(x => x === line), 1);
        },
        addExercise() {
            let correct = true;
            this.lines.forEach(line => {
                let checkForCorrectInput = line.partA.match(/\[\[(.+?)\]\]/g);
                if (
                    checkForCorrectInput === null ||
                    checkForCorrectInput.length !== 1
                ) {
                    console.log('error');
                    correct = false;
                }
            });
            if (correct) {
                this.error = '';
                this.$store
                    .dispatch('addExercise', {
                        exercise: this.lines,
                        title: this.title,
                        info: this.info,
                        type: 'C',
                        id: this.id
                    })
                    .then(x => {
                        this.$emit('updated', {
                            title: this.title,
                            exercise: this.lines
                        });
                        console.log(x);
                        this.lines = [{}];
                        this.title = '';
                    });
            } else {
                this.error =
                    'Make sure every line has a correct [[word]] in it, and only 1.';
            }
        },
        readExcel(event) {
            var inputElement = document.getElementById('inputfile');
            this.$store
                .dispatch('readExcel', {
                    file: inputElement.files[0]
                })
                .then(x => {
                    const keys = Object.keys(x[0]);
                    this.lines = x.map(y => {
                        return {
                            partA: y.partA || y[keys[0]]
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

.upload-button {
    margin-top: 1rem;
}
</style>
