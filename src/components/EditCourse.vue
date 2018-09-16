<template>
    <section>
        <!-- have all courses right. click one to load it and edit it -->
        <h1 class="title">Edit Courses</h1>
        <div v-if="!selectedCourse" class="columns is-multiline">
            <div class="column is-one-third " v-if="course.title" v-for="(course,index) in courses" :key="index">
                <div class="box is-radiusless" @click="selectCourse(course)">
                    <div class="img image is-3by1" :style="{ backgroundImage: `url('${course.imgURL}')` }"></div>
                    <p class="title">{{course.title}}</p>
                    <p class="level">{{course.description}}</p>
                    <p class="level">number of exercises {{course.exercises.length}}</p>
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
                <div class="column">

                    <div class="panel margin-top">
                        <p class="panel-heading">
                            Exercises
                        </p>
                        <div class="panel-block">
                            <p class="control">
                                <input class="input is-small" v-model="fil" type="text" placeholder="search">
                            </p>
                        </div>
                        <a v-for="(ex, index) in filteredExercises" :key="index" :class="ex.isActive ? 'is-active panel-block' : 'panel-block'" @click="ex.isActive = ! ex.isActive">

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
  name: "editCourse",
  data() {
    return {
      courses: [],
      selectedCourse: null,
      fil: "",
      exercises: []
    };
  },
  methods: {
    selectCourse(c) {
      this.selectedCourse = c;
      console.log(c.exercises.map(d => d.id));

      this.exercises.forEach(e => {
        console.log(e);

        e.isActive = c.exercises.map(d => d.id).includes(e.id);
      });
    },
    editCourse() {
      this.selectedCourse.exercises = this.exercises.filter(e => e.isActive);
      this.$store
        .dispatch("editCourse", {
          course: this.selectedCourse
        })
        .then(() => this.clearCourse());
    },
    clearCourse() {
      this.exercises.forEach(e => (e.isActive = false));
      this.selectedCourse = null;
    }
  },
  computed: {
    filteredExercises() {
      return this.exercises.filter(e => e.title.indexOf(this.fil) !== -1);
    }
  },
  mounted() {
    //TODO: store in vuex store so we dont fetch them every time we visit homepage?
    this.$store
      .dispatch("getCourses")
      .then(x => (this.courses = x))
      .catch(err => {
        console.log("err");
        console.log(err);

        this.$router.push("/");
      });
    this.$store.dispatch("getExercises").then(x => {
      console.log(x);

      return (this.exercises = x.filter(y => y.title).map(z => {
        return {
          id: z._id,
          isActive: false,
          title: z.title
        };
      }));
    });
  }
};
</script>

<style>
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

.margin-top {
  margin-top: 2rem;
}

.panel-block.is-active {
  border-left-width: 1rem;
}
</style>
