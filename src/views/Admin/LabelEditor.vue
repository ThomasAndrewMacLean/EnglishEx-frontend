<template>
    <section>
        <h1 class="title">Label factory</h1>
        <p class="level"> Here we can change the labels for the website.
            <span class="icon has-text-info tooltip" data-tooltip="Tooltip Test">
                <i class="fas fa-info-circle"></i>
            </span>
        </p>
        <div class="field">
            <input @click="toggle" id="switchExample" type="checkbox" name="switchExample" class="switch is-rounded"
                :checked="!showLabels">
            <label for="switchExample">Toggle Label View</label>
        </div>

        Example:
        <pre id="example">
            <TextLabel label="testKey" />
        </pre>

        <div class="margin" v-for="label in labels" :key="label._id">
            <label class="label" :for="label.key">{{label.key}}:</label>
            <input @blur="updateLabel(label)" class="input is-radiusless" :id="label.key" type="text" :placeholder="label.key"
                v-model="label.label">
        </div>
    </section>
</template>

<script>
import TextLabel from './../../components/TextLabel.vue';
export default {
    data() {
        return {};
    },
    computed: {
        labels() {
            return this.$store.getters.getLabels;
        },
        showLabels() {
            return this.$store.getters.getShowLabels;
        }
    },
    methods: {
        toggle() {
            this.$store.dispatch('toggleShowLabels');
        },
        updateLabel(label) {
            this.$store
                .dispatch('updateLabel', {
                    label
                })
                .then(x => {
                    console.log(x);
                });
        }
    },
    components: {
        TextLabel
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
