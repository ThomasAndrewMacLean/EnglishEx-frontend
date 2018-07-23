<template>
    <section>
        <h1>Create</h1>

        <div class="field">
            <label class="label" for="title">Title</label>
            <div class="columns">
                <div class="column is-half">
                    <div class="control">
                        <input class="input is-radiusless" v-model="title" type="text" name="title" id="title" requierd>
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
                    <div class="column">
                        <div class="control">
                            <input v-model="line.partB" class="input is-radiusless" type="text" required>
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
                    <button type="submit" class="button is-link is-radiusless">Save</button>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
export default {
  data() {
    return {
      lines: [{}],
      title: ""
    };
  },
  methods: {
    deleteLine(line) {
      this.preventDefault;
      this.lines.splice(this.lines.findIndex(x => x === line), 1);
    },
    addExercise() {
      this.$store.dispatch("addExercise", {
        exercise: this.lines,
        title: this.title,
        type: "A"
      });
    }
  }
};
</script>

<style>
.margin-delete-button {
  margin-top: 20px;
  position: absolute;
  right: 0;
}
</style>
