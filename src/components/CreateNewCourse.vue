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
        </form>
        <div class="columns">
            <div class="column">

                <div class="panel">
                    <p class="panel-heading">
                        Exercises
                    </p>
                    <a  v-if="ex.test" v-for="(ex, index) in exercises" :key="index" 
                    :class="ex.isActive ? 'is-active panel-block' : 'panel-block'"
                        @click="toggle(ex)">
                        
                        {{ex.test && ex.test.title}}
                    </a>
                    <!-- <a class="panel-block">
                        <span class="panel-icon">
                            <i class="fas fa-book" aria-hidden="true"></i>
                        </span>
                        marksheet
                    </a> -->
                </div>
            </div>
            <div class="column"></div>
        </div>
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
  methods:{
      toggle(e) {
          console.log(e);
          console.log("jkljk")
          e.isActive = true;
      }
  },
  mounted() {
    //TODO: store in vuex store so we dont fetch them every time we visit homepage?
    this.$store.dispatch("getExercises").then(x => (this.exercises = x));
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

.panel {
  margin-top: 2rem;
}

.panel-block.is-active {
  border-left-width: 1rem;
}
</style>
