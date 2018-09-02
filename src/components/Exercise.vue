<template>
    <section>
        <div v-if="exercise" class="wrap">
            <div v-if="exercise.type==='A'">
                <div class="columns">
                    <div class="column">
                        <div class="partA" v-for="e in columnA" :key="e">
                            {{e}}
                        </div>
                    </div>
                    <div class="column">
                        <div draggable @dragover="dragover" class="partB" v-for="e in columnB" :key="e">
                            {{e}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  data() {
    return {
      //columnA: this.exercise.exercise.map(a => a.partA)
      // columnB: this.exercise.exercise.map(a => a.partB)
    };
  },
  //   updated: function() {
  //   },
  computed: {
    columnA() {
      return this.$store.getters.getColA;
    },
    columnB() {
      return this.$store.getters.getColB;
    }
  },
  methods: {
    dragover() {
      console.log("a");
    }
  },
  //   watch: {
  //     exercise: function(newVal) {
  //       this.columnA = newVal.exercise.map(a => a.partA);
  //       // this.columnB = newVal.exercise.map(a => a.partB);
  //     }
  //   },
  props: ["exercise"]
};
</script>


<style lang="scss" scoped>
@import "../../node_modules/bulma/bulma.sass";

.partA {
  min-height: 72px;
}

.partB {
  min-height: 72px;
  cursor: pointer;
}

.partB:hover {
  color: $purple;
  background: lightblue;
}

[draggable="true"] {
  cursor: move;
}
</style>
