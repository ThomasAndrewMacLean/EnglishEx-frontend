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
                        <div draggable="true" @dragstart="startdrag" @click="clickk" @drop="onDrop" @dragover="ondragover"
                            @dragenter="ondragenter" class="partB" v-for="e in columnB" :key="e">
                            {{e}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button @click="sendExToServer" class="button is-primary is-radiusless">Submit</button>
        <div v-if="score">{{score}}</div>
    </section>
</template>

<script>
export default {
  data() {
    return {
      copy: null,
      selected: null,
      score: null
    };
  },
  computed: {
    columnA() {
      return this.$store.getters.getColA;
    },
    columnB() {
      return this.$store.getters.getColB;
    }
  },
  methods: {
    clickk(e) {
      let text = e.target.innerText;
      this.switzch(text);
    },
    switzch(text) {
      if (!this.selected) {
        this.selected = text;
      } else {
        this.switch(text, this.selected);
        this.selected = null;
      }
    },
    ondragenter(event) {
      event.preventDefault();
    },
    ondragover(event) {
      event.preventDefault();
    },
    onDrop(e) {
      console.log("DROP");
      //console.log(e.target.innerText);
      this.switzch(e.target.innerText);
    },
    startdrag(e) {
      console.log("START");
      this.selected = null;
      this.switzch(e.target.innerText);
      //console.log(e.target.innerText);
    },

    switch(id1, id2) {
      //console.log(id1, id2);

      let copy = this.columnB;
      let place1 = this.columnB.indexOf(id1);
      let place2 = this.columnB.indexOf(id2);
      //let temp = copy[copy.indexOf(id1)];
      this.columnB[place1] = id2;
      this.columnB[place2] = id1;

      this.$store.dispatch("changeColB", copy);
      this.$forceUpdate();
    },
    sendExToServer() {
      this.$store
        .dispatch("sendExToServer", {
          exId: this.exercise._id,
          data: this.columnB
        })
        .then(re => (this.score = re));
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
@import "../mystyles.scss";

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
