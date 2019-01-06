<template>
    <section>
        <div v-if="exercise" class="wrap">
            <div v-if="error" class="notification is-danger">
                <button @click="error = ''" class="delete"></button>
                {{error}}
            </div>
            <div v-if="exercise.info" class="notification is-link">
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
                            <div v-if="answers && answers[index] !== ''" class="margin-left corrected-answer-c">{{answers[index]}}</div>
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
                            <div v-if="answers" class="corrected-answer">{{answers[index]}}</div>
                            <div v-if="answers && answers[index] === ''" class="good-answer"><i class="far fa-check-circle"></i></div>
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
            <div v-if="exercise.type==='C'">
                <div v-if="showInfo" class="notification">
                    <button @click="showInfo = false" class="delete"></button>
                    <TextLabel label="explanationTypeC" />

                </div>
                <div class="columns">
                    <div class="column">
                        <div class="partA exC" v-for="(e, index) in columnA" :key="e.ex">
                            <div @click="clickOnSpaceOldSkool($event, e)" v-html="'<span class=\'space\'></span>' +(e.ex.split('[[')[0] + e.ex.split(']]')[1].split('[[')[0]).('  ',' ').trim().split(' ').join('<span class=\'space\'></span>')+'<span class=\'space\'></span>'">
                            </div>
                            <div>

                            </div>
                            <input v-bind:style="{width:e.ex.split('[[')[1].split(']]')[0].length+1 +'ch'}" class="typeBInput"
                                type="text" v-model="e.ans" v-bind:ref="'input-' + index">
                            <div v-if="answers" class="corrected-answer-c">{{answers[index]}}</div>
                            <div v-if="answers && answers[index] === ''" class="good-answer-c"><i class="far fa-check-circle"></i></div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="exercise.type==='D'">
                <div v-if="showInfo" class="notification">
                    <button @click="showInfo = false" class="delete"></button>
                    <TextLabel label="explanationTypeD" />

                </div>
                <div class="columns">
                    <div class="column">
                        <div class="partA exD" v-for="(e, index) in columnA" :key="e">
                            <div> {{e}}
                                <button :class="{ 'is-primary': answerButtonsTypeD[index] === b }" @click="clickButton(index,b)"
                                    class="button is-radiusless" v-for="b in columnB[index]" v-if="b" :key="b">{{b}}</button>
                            </div>

                            <div v-if="answers" class="corrected-answer-c">{{answers[index]}}</div>

                            <div v-if="answers && answers[index] === ''" class="good-answer-d"><i class="far fa-check-circle"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button @click="sendExToServer" class="button is-primary is-radiusless">Submit</button>
        <button v-if="exHasBeenSubmitted" @click="getAnswer" class="button is-radiusless margin-left">Check</button>
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
            checked: {},
            error: '',
            answers: null,
            answerButtonsTypeD: [],
            exHasBeenSubmitted: false
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
        clickOnSpaceOldSkool(e, ex) {
            let counter = 0;
            if (e.target.className === 'space') {
                e.target.parentNode.childNodes.forEach(c => {
                    if (c === e.target) {
                        counter++;
                        c.classList.add('clicked');
                        ex.ans1 = counter;
                        console.log(counter);
                    } else {
                        if (c.classList) {
                            counter++;
                            c.classList.remove('clicked');
                        }
                    }
                });
            }
        },
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
        clickButton(index, button) {
            this.$set(this.answerButtonsTypeD, index, button);
        },
        getAnswer() {
            this.$store
                .dispatch('getAnswer', {
                    exId: this.exercise._id,
                    data: this.columnA
                })
                .then(re => {
                    if (this.exercise.type === 'C') {
                        this.answers = re;
                    }
                    if (this.exercise.type === 'B') {
                        console.log(re);
                        const answers = re[0].exercise; // the array of ex, we have to extract the words from quotes

                        this.answers = [];
                        this.columnA.forEach((e, index) => {
                            let corrAnswers = answers[index].partA.match(
                                /\[\[(.+?)\]\]/g
                            );
                            console.log(corrAnswers);

                            if (`[[${e.ans}]]` === corrAnswers[0]) {
                                console.log('okkk');
                                this.answers.push('');
                            } else {
                                this.answers.push(
                                    corrAnswers[0]
                                        .replace('[[', '')
                                        .replace(']]', '')
                                );
                            }
                        });
                    }
                    if (this.exercise.type === 'A') {
                        const answers = re[0].exercise;
                        console.log(answers);
                        this.answers = [];
                        this.columnB.forEach((e, index) => {
                            if (e === answers[index].partB) {
                                console.log('okkk');
                                this.answers.push('');
                            } else {
                                this.answers.push(answers[index].partB);
                            }
                        });
                    }
                    if (this.exercise.type === 'D') {
                        const answersFromServer = re[0].exercise;
                        console.log(answersFromServer);
                        console.log(this.columnB);
                        console.log(this.answerButtonsTypeD);

                        this.answers = [];
                        answersFromServer.forEach((e, index) => {
                            let correct =
                                (e.button1 &&
                                    e.button1.includes('[') &&
                                    e.button1) ||
                                (e.button2 &&
                                    e.button2.includes('[') &&
                                    e.button2) ||
                                (e.button3 &&
                                    e.button3.includes('[') &&
                                    e.button3);

                            if (
                                correct ===
                                '[' + this.answerButtonsTypeD[index] + ']'
                            ) {
                                this.answers.push('');
                            } else {
                                this.answers.push(
                                    correct
                                        .toString()
                                        .replace('[', '')
                                        .replace(']', '')
                                );
                            }
                        });
                    }
                });
        },
        setScoreAndSubmitted(score) {
            this.score = score;
            this.exHasBeenSubmitted = true;
        },
        sendExToServer() {
            if (this.exercise.type === 'A') {
                this.$store
                    .dispatch('sendExToServer', {
                        exId: this.exercise._id,
                        data: this.columnB
                    })
                    .then(re => this.setScoreAndSubmitted(re));
                return;
            }
            if (this.exercise.type === 'D') {
                this.$store
                    .dispatch('sendExToServer', {
                        exId: this.exercise._id,
                        data: this.answerButtonsTypeD
                    })
                    .then(re => this.setScoreAndSubmitted(re));
                return;
            }
            if (this.exercise.type === 'B') {
                this.$store
                    .dispatch('sendExToServer', {
                        exId: this.exercise._id,
                        data: this.columnA
                    })
                    .then(re => this.setScoreAndSubmitted(re));
                return;
            }
            if (this.exercise.type === 'C') {
                this.error = '';
                this.columnA.forEach((c, index) => {
                    if (!c.ans1) {
                        this.error =
                            'Please click the location of the missing word in sentence ' +
                            (index + 1);
                        return;
                    }
                });

                if (!this.error) {
                    this.$store
                        .dispatch('sendExToServer', {
                            exId: this.exercise._id,
                            data: this.columnA
                        })
                        .then(re => this.setScoreAndSubmitted(re));
                }
                return;
            }
        }
    },
    watch: {
        exercise: function() {
            this.score = null;
            this.answers = null;
            this.checked = {};
            this.clearSelectedDivs();
            this.answerButtonsTypeD = [];
            this.exHasBeenSubmitted = false;
        }
    },
    props: ['exercise']
};
</script>


<style lang="scss">
@import '../mystyles.scss';

.good-answer {
    position: absolute;
    right: 40px;
    color: lightgreen;
}

.corrected-answer {
    position: absolute;
    right: 40px;
    background: lightpink;
    color: darkred;
}

.good-answer-c {
    color: lightgreen;
}

.corrected-answer-c {
    background: lightpink;
    color: darkred;
}

.margin-left {
    margin-left: 1rem;
}

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
    //justify-content: center;
    align-items: center;
}

.partB {
    min-height: 72px;
    cursor: pointer;
    display: flex;
    //justify-content: center;
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

.exC {
    display: flex;
    justify-content: space-around;
}

.space {
    height: 12px;
    display: inline-block;
    // background: red;
    padding: 5px;
    cursor: pointer;
}

.space:hover {
    display: inline-block;
}

.space:hover::before {
    position: absolute;
    margin-top: -10px;
    margin-left: -3px;
    content: '';
    height: 6px;
    width: 6px;
    border-radius: 6px;
    background: $grey;
}

.space.clicked::before {
    position: absolute;
    margin-top: -10px;
    margin-left: -3px;
    content: '';
    height: 6px;
    width: 6px;
    border-radius: 6px;
    background: $purple;
}
</style>
