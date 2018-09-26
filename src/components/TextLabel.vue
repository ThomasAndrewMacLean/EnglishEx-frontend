<template>
    <p :class="{'adminMode' : !showLabels}" v-if="labels.length > 0"> {{showLabels ? labels.find(l => l.key ===
        label).label:
        labels.find(l => l.key === label).key}}</p>
</template>

<script>
export default {
    computed: {
        labels() {
            return this.$store.getters.getLabels;
        },
        showLabels() {
            return this.$store.getters.getShowLabels;
        }
    },
    props: {
        label: {
            type: String,
            required: true
        }
    }
};
</script>

<style scoped>
.adminMode {
    outline: tomato 1px solid;
}

p {
    display: inline-block;
}
</style>
