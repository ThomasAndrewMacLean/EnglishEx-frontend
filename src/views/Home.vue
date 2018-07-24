<template>
    <section class="section container">
        <h1>Home</h1>
        <!-- <pre>{{exercises}}</pre> -->
        <a v-if="exercises" v-for="(ex,index) in exercises" :key="index" :href="'#/exercise/' + ex._id">
            <pre>{{ex}}</pre>
        </a>

    </section>
</template>

<script>
export default {
  data() {
    return {
      exercises: []
    };
  },
  mounted() {
    //TODO: store in vuex store so we dont fetch them every time we visit homepage?
    this.$store
      .dispatch("getCourses")
      .then(x => (this.exercises = x))
      .catch(err => {
        console.log("err");
        console.log(err);

        this.$router.push("/");
      });
  }
};
</script>

<style>
</style>
