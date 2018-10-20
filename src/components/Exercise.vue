<template>
    <section>
        <div v-if="exercise" class="wrap">
            <div v-if="exercise.info" class="notification">
                {{exercise.info}}
            </div>
            <div v-if="exercise.type==='A'">
                <div v-if="showInfo" class="notification">
                    <button @click="showInfo = false" class="delete"></button>
                    <TextLabel label="explanationTypeA" />

                </div>
                <div class="columns">
                    <div class="column">
                        <div :class="{ 'doubleChecked': checked[index] }" class="partA" v-for="(e,index) in columnA"
                            :key="'columnA-' + index">
                            <span v-if="checked[index]" class="checkie"><i class="fas fa-check-double"></i></span>
                            {{e}}
                            <span v-if="checked[index]" @click.stop="unDoubleCheck(e, index)" class="undo-double-check"><i
                                    class="fas fa-undo"></i></span>
                        </div>
                    </div>
                    <div class="column">
                        <div @click="clickk" :class="{ 'doubleChecked': checked[index] }" class="partB" v-for="(e, index) in columnB"
                            :key="e + '-' + index">
                            {{e}}
                            <span v-if="!checked[index]" @click.stop="doubleCheck(e, index)" class="double-check"><i
                                    class="fas fa-check-double"></i></span>
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

                            <div v-if="e.ex.split('[[').length === 2">

                                {{e.ex.split('[[')[0]}}
                                <input v-bind:style="{width:e.ex.split('[[')[1].split(']]')[0].length+1 +'ch'}" class="typeBInput"
                                    type="text" v-model="e.ans" v-bind:ref="'input-' + index">
                                {{e.ex.split(']]')[1].split('[[')[0]}}
                            </div>
                            <div v-if="e.ex.split('[[').length === 3">

                                {{e.ex.split('[[')[0]}}
                                <input v-bind:style="{width:e.ex.split('[[')[1].split(']]')[0].length +1+'ch'}" class="typeBInput"
                                    type="text" v-model="e.ans" v-bind:ref="'input-' + index">
                                {{e.ex.split(']]')[1].split('[[')[0]}}
                                <input @click.stop v-bind:style="{width:e.ex.split(']]')[1].split('[[')[1].split(']]')[0].length+1 +'ch'}"
                                    class="typeBInput" type="text" v-model="e.ans1" v-bind:ref="'input-' + index">
                                {{e.ex.split(']]')[2]}}
                            </div>
                            <!-- <br><br>--------------
                            <div v-for="(part,index) in e.ex.match(/\[\[(.+?)\]\]/g)" :key="part">
                                {{e.ex.split(part)[0]}}--
                                <input v-bind:style="{width:(part.length -4)+'ch'}" class="typeBInput" type="text"
                                    v-model="e.ans" v-bind:ref="'input-' + index">
                            </div> -->
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
            showInfo: true,
            checked: {}
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
        doubleCheck(text, index) {
            this.clearSelectedDivs();
            this.columnA[index] += ' ' + text;
            this.$set(this.checked, index, text);
        },
        unDoubleCheck(text, index) {
            let colBText = this.checked[index];
            this.columnA[index] = text.replace(colBText, '').trim();
            this.$set(this.checked, index, '');
        },
        setFocus(index) {
            let t = 'input-' + index;
            this.$refs[t][0].focus();
        },
        clickk(e) {
            e.target.classList.toggle('selectedDiv');
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
        clearSelectedDivs() {
            const elems = document.querySelectorAll('.selectedDiv');
            elems.forEach(el => {
                el.classList.remove('selectedDiv');
            });
            this.selected = null;
        },
        switch(id1, id2) {
            this.clearSelectedDivs();
            let copy = this.columnB;
            let place1 = this.columnB.indexOf(id1);
            let place2 = this.columnB.indexOf(id2);

            this.$set(this.columnB, place1, id2);
            this.$set(this.columnB, place2, id1);
            this.$store.dispatch('changeColB', copy);
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
            this.checked = {};
            this.clearSelectedDivs();
        }
    },
    props: ['exercise']
};
</script>


<style lang="scss" scoped>
@import '../mystyles.scss';

.double-check {
    color: lightgrey;
    position: absolute;
    right: 0;
}

.checkie {
    //position: absolute;
    margin-right: 5px;
    //margin-top: 5px;
    font-size: 0.5rem;
    color: lightgreen;
}

.double-check:hover {
    color: lightgreen;
}

.undo-double-check {
    color: lightgrey;
    position: absolute;
    cursor: pointer;
    right: 0; //-50px;
}

.undo-double-check:hover {
    color: lightcoral;
}

.selectedDiv {
    background: lightblue !important;
}

.typeBInput {
    display: inline-block;
    border: none;
    border-bottom: 2px solid lightblue;
    outline: none;
    font-size: 1rem;
    text-align: center;
    padding: 0px 2px;
}

.partA {
    min-height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.partB {
    min-height: 72px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.partB:hover {
    color: $purple;
    background: #f3fcff;
}

.doubleChecked.partA {
    width: 200%;
    //position: relative;
}

.doubleChecked.partB {
    opacity: 0;
    // width: 0;
    pointer-events: none;
}

.exB {
    cursor: pointer;
}
</style>
