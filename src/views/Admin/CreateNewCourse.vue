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
                <label class="label" for="img">Choose image or colour
                    <span class="icon has-text-info tooltip is-tooltip-multiline" data-tooltip="If no picture is uploaded, the colour will be used. You can click on the color to change it.">
                        <i class="fas fa-info-circle"></i>
                    </span>
                </label>
                <div class="columns">

                    <div class="column">
                        <div class="control">
                            <div class="columns">
                                <div class="column">
                                    <div class="file">
                                        <label class="file-label">
                                            <input @change="(e) => handleChange(e.target.files)" class="file-input"
                                                type="file" name="resume">
                                            <span class="file-cta is-radiusless">
                                                <span class="file-icon">
                                                    <i class="fas fa-upload"></i>
                                                </span>
                                                <span class="file-label is-radiusless">
                                                    Choose a file…
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div class="column">
                                    <button @click.prevent="clearPic" class="button is-radiusless">Clear</button>
                                </div>
                                <div class="column">
                                    <input class="colorPicker" type="color" v-model="course.color">
                                </div>
                            </div>
                            <!-- <input class="input is-radiusless" v-model="course.imgURL" type="text" name="img" id="img"> -->
                        </div>
                    </div>

                    <div class="column">
                        <div :style="{ background:course.imgURL ? '':course.color, backgroundImage: `url('${course.imgURL}')` }"
                            id="imgPreview">
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
                            {{ex.title}} - {{ex.searchTag}}
                            <span class="type is-italic has-text-grey-dark is-size-7">
                                (type: {{ ex.type}})                       
                            </span>
                                 <span v-if="ex.tagName" class="type is-italic has-text-grey-dark is-size-7">
                                (tag: {{ ex.tagName}})                       
                            </span>
                    </span>
                    <div>

                    <button @click.prevent="addTagName($event, ex)" v-if="ex.isActive" class="button is-small is-radiusless is-pulled-right">{{ex.tagName? 'Edit': 'Add'}} Tag</button>
                    <input @click.stop placeholder="order" class="order-input is-pulled-right is-radiusless" v-model="ex.order" v-if="ex.isActive" />
                    </div>
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
            course: {
                color: '#ff6347'
            },
            exercises: [],
            fil: ''
        };
    },
    methods: {
        handleChange(files) {
            this.$store.dispatch('showLoader', {
                add: true,
                name: 'uploadingPic'
            });
            const file = files[0];

            var validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
            if (validImageTypes.indexOf(file.type) === -1) {
                console.log('wrong type');
                return;
            }
            var fd = new FormData();
            fd.append('file', file);
            fd.append('upload_preset', 'uzgtvylv');
            fetch('https://api.cloudinary.com/v1_1/dhz1ztiqb/upload', {
                method: 'POST',
                body: fd
            })
                .then(img => {
                    return img.json();
                })
                .then(j => {
                    this.$store.dispatch('showLoader', {
                        add: false,
                        name: 'uploadingPic'
                    });
                    this.$set(this.course, 'imgURL', j.secure_url);
                });
        },
        clearPic() {
            this.$set(this.course, 'imgURL', '');
        },
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
            this.$set(ex, 'tagName', tagName);
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
                        searchTag: z.searchTag,
                        type: z.type
                    };
                }));
        });
    },
    computed: {
        filteredExercises() {
            return this.exercises.filter(
                e =>
                    ((e.searchTag || '') + e.title)
                        .toLowerCase()
                        .indexOf(this.fil.toLowerCase()) !== -1
            );
        }
    }
};
</script>

<style scoped>
.colorPicker {
    height: 36px;
    width: 100%;
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

.order-input {
    height: 27px;
    width: 3rem;
    margin-right: 1rem;
}
</style>
