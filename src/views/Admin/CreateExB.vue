<template>
    <section>
        <h1 class="title">Create Exercise Type B</h1>
        <p class="level"> Here we create exercises type B.
            The words that have to be filled in should be put between double [[]]
            These can also be uploaded from an Excelfile. It will upload the first sheet of an excel file, and it needs
            a title on the first row.
        </p>

        <div class="field">
            <label class="label" for="title">Title</label>
            <div class="columns">
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
        <label class="button upload-button is-radiusless" for="inputfile">
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
            lines: [{}],
            title: ''
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
                    type: 'B'
                })
                .then(x => {
                    console.log(x);
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
                    this.lines = x.map(y => {
                        return {
                            partA: y.partA || y[keys[0]]
                        };
                    });
                    event.target.value = '';
                });
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
