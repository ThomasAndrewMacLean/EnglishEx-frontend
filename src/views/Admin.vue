<template>
    <section class="container section">
        <div class="columns">
            <div class="column is-one-fifth">

                <aside class="menu">
                    <p class="menu-label">
                        Courses
                    </p>
                    <ul class="menu-list">
                        <li>
                            <a @click="adminPage = 'CreateNewCourse'" :class="adminPage === 'CreateNewCourse' ? 'is-active':''">Create Course</a>
                        </li>
                    </ul>
                    <p class="menu-label">
                        Exercises
                    </p>
                    <ul class="menu-list">
                        <li>
                            <a @click="adminPage = 'CreateExA'" :class="adminPage === 'CreateExA' ? 'is-active':''">Type A</a>
                        </li>
                    </ul>
                </aside>
            </div>
            <div class="column">

                <section>
                    <CreateExA v-if="adminPage === 'CreateExA'" />
                    <CreateNewCourse v-if="adminPage === 'CreateNewCourse'" />
                </section>
            </div>
        </div>
    </section>

</template>

<script>
import CreateExA from "./../components/CreateExA.vue";
import CreateNewCourse from "./../components/CreateNewCourse.vue";
export default {
  data() {
    return {
      adminPage: "CreateExA"
    };
  },
  components: {
    CreateExA,
    CreateNewCourse
  }
};
</script>

<style>
</style>
