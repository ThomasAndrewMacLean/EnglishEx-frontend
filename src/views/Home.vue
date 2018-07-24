<template>
    <section class="section container">
        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <h1>Home</h1>
                    <pre>{{exercises}}</pre>
                </div>
            </div>
        </div>
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
    this.$store.dispatch("getExercises").then(x => (this.exercises = x));
  }
};
</script>

<style>
</style>
