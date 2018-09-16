<template>
    <section class="section container">
        <h1 class="title">Home</h1>
        <p class="level">explenation</p>
        <!-- <pre>{{exercises}}</pre> -->
        <div class="columns is-multiline">

            <a class="column is-one-third " v-if="course.title" v-for="(course,index) in courses.filter(c => !c.delete)" :key="index" :href="'#/course/' + course._id">
                <div class="box is-radiusless">
                    <div class="img image is-3by1" :style="{ backgroundImage: `url('${course.imgURL}')` }"></div>
                    <p class="title">{{course.title}}</p>
                    <p class="level">{{course.description}}</p>
                    <!-- TODO: filter x.delete does not work here, we only know the id of the exercises, not the properties -->
                    <!-- <p class="level">number of exercises {{course.exercises.filter(x => !x.delete).length}}</p> -->
                    <p class="level">{{ Math.floor(course.exercises.filter(x =>
                        x.total).length/course.exercises.filter(x => !x.delete).length * 100)}} %</p>
                    <ul v-for="ex in course.exercises" :key="ex._id">
                        <li>
                            {{ex.title}} <span v-if="ex.total">score:({{ex.score}}/{{ex.total}})</span>
                        </li>
                    </ul>
                </div>
            </a>
        </div>
    </section>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      courses: []
    };
  },
  mounted() {
    //TODO: store in vuex store so we dont fetch them every time we visit homepage?
    this.$store
      .dispatch("getCourses")
      .then(x => {
        this.courses = x;
        this.$store.dispatch("getMyPoints").then(y => {
          let yy = y.reverse();
          this.courses.forEach(course => {
            if (course.exercises) {
              course.exercises.forEach(ex => {
                let score = yy.find(z => z.exId === ex.id);
                if (score) {
                  console.log(score);

                  ex.score = score.score;
                  ex.total = score.total;
                }
              });
            }
          });
          this.$forceUpdate();
        });
      })
      .catch(err => {
        console.log("err");
        console.log(err);

        this.$router.push("/");
      });
  }
};
</script>

<style scoped>
.img {
  height: auto;
  background: tomato;
  /* randomize the background */
  width: calc(100% + 2.5rem);
  margin-left: -1.25rem;
  margin-top: -1.25rem;
  background-size: cover;
  background-repeat: no-repeat;
  filter: grayscale(20%);
}

ul {
  list-style: inside;
}
</style>
