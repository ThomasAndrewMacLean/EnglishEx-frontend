<template>
    <section>
        <h1 class="title">Add Label</h1>
        <p class="level"> Here we can add labels for the website. Each label should have a unique key. A key can not
            contain spaces.
            <span class="icon has-text-info tooltip is-tooltip-multiline" data-tooltip="Remember to alert the webmaster if you added a new label, to describe where it should go.">
                <i class="fas fa-info-circle"></i>
            </span>
        </p>
        <form @submit.prevent="addLabel">
            <div class="field">
                <div class="control">
                    <label class="label" for="key">key:</label>
                    <div v-if="error" class="notification is-danger">
                        <button @click.prevent="error = null" class="delete"></button>
                        {{error}}</div>
                    <input @blur="checkKey" class="input is-radiusless" id="key" type="text" placeholder="key" v-model="label.key"
                        required>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <label class="label" for="label">label:</label>
                    <input class="input is-radiusless" id="label" type="text" placeholder="label" v-model="label.label"
                        required>
                </div>
            </div>
            <button type="submit" class="button is-primary is-radiusless">Add Label</button>

        </form>
        <table class="table table is-bordered is-hoverable is-pulled-right">
            <thead>
                <tr>
                    <th>Existing Keys</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="label in labels" :key="label.key">
                    <td>{{label.key}}</td>

                </tr>

            </tbody>
        </table>
    </section>
</template>

<script>
export default {
    data() {
        return {
            label: {},
            error: null
        };
    },
    methods: {
        addLabel() {
            this.$store
                .dispatch('addLabel', {
                    label: this.label
                })
                .then(x => {
                    console.log(x);
                });
            this.label = {};
        },
        checkKey() {
            if (this.label.key) {
                this.label.key = this.label.key.split(' ').join('');
                if (
                    this.labels.filter(l => l.key === this.label.key).length > 0
                ) {
                    this.error = `The key ${this.label.key} is not unique!`;
                    this.label.key = null;
                    document.getElementById('key').focus();
                    return;
                }
                this.error = null;
            }
        }
    },
    computed: {
        labels() {
            return this.$store.getters.getLabels;
        }
    }
};
</script>

<style scoped>
pre {
}

.margin {
    margin-top: 1rem;
}
</style>
