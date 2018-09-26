<template>
    <section>
        <h1 class="title">Label factory</h1>
        <p class="level"> Here we can change the labels for the website. Every change you make is directly saved in the
            database.
            If you toggle the switch, you can navigate around the site and you will see the keys instead of the labels.
            This can help you visualize where the text will be.
            <span class="icon has-text-info tooltip is-tooltip-multiline" data-tooltip="Labels are saved after you changed the text, and clicked outside of the input bar.">
                <i class="fas fa-info-circle"></i>
            </span>
        </p>
        <div class="field">
            <input @click="toggle" id="switchExample" type="checkbox" name="switchExample" class="switch is-rounded"
                :checked="!showLabels">
            <label for="switchExample">Toggle Label View</label>
        </div>
        <p class="level">
            You can test this on the testKey
        </p>

        Example:
        <pre id="example">
            <TextLabel label="testKey" />
        </pre>

        <div class="margin" v-for="label in labels" :key="label._id">
            <label class="label" :for="label.key">{{label.key}}:</label>
            <input @change="updateLabel(label)" class="input is-radiusless" :id="label.key" type="text" :placeholder="label.key"
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
            this.$store.dispatch('updateLabel', {
                label
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
