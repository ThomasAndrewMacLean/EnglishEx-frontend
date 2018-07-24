<template>
    <section>
        <h1 class="title">Create New Course Card</h1>
        <p class="level"> Here we set the title and description of a course, plus we add the exercises that go in the course.</p>

        <form @submit.prevent="addCourse" class="form">

            <div class="field">
                <label class="label" for="title">Title</label>
                <div class="columns">
                    <div class="column is-half">
                        <div class="control">
                            <input class="input is-radiusless" v-model="course.title" type="text" name="title" id="title" required>
                        </div>
                    </div>

                </div>
            </div>

            <div class="field">
                <label class="label" for="img">Image URL</label>
                <div class="columns">

                    <div class="column">
                        <div class="control">
                            <input class="input is-radiusless" v-model="course.imgURL" type="text" name="img" id="img" required>
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
                    <textarea class="textarea is-radiusless" v-model="course.description" type="text" name="description" id="description" required
                    />
                </div>
            </div>
            <div class="columns">
                <div class="column">

                    <div class="panel margin-top">
                        <p class="panel-heading">
                            Exercises
                        </p>
                        <a v-for="(ex, index) in exercises" :key="index" :class="ex.isActive ? 'is-active panel-block' : 'panel-block'" @click="ex.isActive = ! ex.isActive">

                            {{ex.title}}
                        </a>
                    </div>
                </div>
                <div class="column">
                    <div class="field margin-top">
                        <div class="control">
                            <button type="submit" class="button is-link is-radiusless">Save</button>
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
      exercises: []
    };
  },
  methods: {
    addCourse() {
      this.course.exercises = this.exercises.filter(e => e.isActive);
      console.log(this.course);
      this.$store
        .dispatch("addCourse", {
          course: this.course
        })
        .then(() => this.clearCourse());
    },
    clearCourse() {
      this.exercises.forEach(e => (e.isActive = false));
      this.course = {};
    }
  },
  mounted() {
    //TODO: store in vuex store so we dont fetch them every time we visit homepage?
    this.$store.dispatch("getExercises").then(x => {
      return (this.exercises = x.filter(y => y.exercise).map(z => {
        return {
          id: z._id,
          isActive: false,
          title: z.exercise.title
        };
      }));
    });
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

.margin-top {
  margin-top: 2rem;
}

.panel-block.is-active {
  border-left-width: 1rem;
}
</style>
