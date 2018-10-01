<template>
    <section>
        <div v-if="exercise" class="wrap">
            <div v-if="exercise.type==='A'">
                <div v-if="showInfo" class="notification">
                    <button @click="showInfo = false" class="delete"></button>
                    <TextLabel label="explanationTypeA" />

                </div>
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
            <div v-if="exercise.type==='B'">
                <div v-if="showInfo" class="notification">
                    <button @click="showInfo = false" class="delete"></button>
                    <TextLabel label="explanationTypeB" />

                </div>
                <div class="columns">
                    <div class="column">
                        <div class="partA exB" v-for="(e, index) in columnA" :key="e.ex" @click=setFocus(index)>
                            <div>{{e.ex.split('[[')[0]}}
                                <input v-bind:style="{width:e.ex.split('[[')[1].split(']]')[0].length +'ch'}" class="typeBInput"
                                    type="text" v-model="e.ans" v-bind:ref="'input-' + index">
                                {{e.ex.split(']]')[1]}}</div>
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
import TextLabel from './TextLabel.vue';
export default {
    data() {
        return {
            copy: null,
            selected: null,
            score: null,
            showInfo: true
        };
    },
    components: {
        TextLabel
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
        setFocus(index) {
            let t = 'input-' + index;

            this.$refs[t][0].focus();
        },
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
            console.log('DROP');
            //console.log(e.target.innerText);
            this.switzch(e.target.innerText);
        },
        startdrag(e) {
            console.log('START');
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

            this.$store.dispatch('changeColB', copy);
            this.$forceUpdate();
        },
        sendExToServer() {
            if (this.exercise.type === 'A') {
                this.$store
                    .dispatch('sendExToServer', {
                        exId: this.exercise._id,
                        data: this.columnB
                    })
                    .then(re => (this.score = re));
                return;
            }
            if (this.exercise.type === 'B') {
                console.log(this.columnA);
                // return;
                this.$store
                    .dispatch('sendExToServer', {
                        exId: this.exercise._id,
                        data: this.columnA
                    })
                    .then(re => (this.score = re));
                return;
            }
        }
    },
    watch: {
        exercise: function() {
            this.score = null;
        }
    },
    props: ['exercise']
};
</script>


<style lang="scss" scoped>
@import '../mystyles.scss';

.typeBInput {
    display: inline-block;
    border: none;
    border-bottom: 2px solid lightblue;
    outline: none;
    font-size: 1rem;
}

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

[draggable='true'] {
    cursor: move;
}
.exB {
    cursor: pointer;
}
</style>
