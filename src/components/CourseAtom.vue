<template>
    <a v-if="course" :href="'#/course/' + course._id" class="box is-radiusless">
        <div class="img image is-3by1"
            :style="{ background:course.imgURL ? '':course.color, backgroundImage: `url('${course.imgURL}')` }">
        </div>
        <p class="title">{{course.title}}</p>
        <p class="level">{{course.description}}</p>
        <!-- <p class="level">{{ Math.floor(course.exercises.filter(x =>
                        x.total).length/course.exercises.filter(x => !x.delete).length * 100)}}%</p> -->
        <!-- <ul v-for="ex in course.exercises" :key="ex._id">
            <li>
                {{ex.title}} <span v-if="ex.total">score:({{ex.score}}/{{ex.total}})</span>
            </li>
        </ul> -->
    </a>
</template>

<script>
export default {
    watch: {
        course: function() {}
    },
    props: ['course']
};
</script>

<style>
</style>
