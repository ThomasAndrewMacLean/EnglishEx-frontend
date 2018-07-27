<template>
    <section class="section container">
        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <h1 class="title">Course</h1>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: "course",
  data() {
    return {
      exercises: []
    };
  },
  mounted() {
    //TODO: store in vuex store so we dont fetch them every time we visit homepage?
    this.$store
      .dispatch("getCourse", {
        id: this.$route.params.courseid
      })
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
