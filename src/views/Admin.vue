<template>
    <section class="container section">
        <div class="columns">
            <div class="column is-one-fifth admin-menu">

                <aside class="menu">
                    <p class="menu-label">
                        Courses
                    </p>
                    <ul class="menu-list">
                        <li>
                            <a @click="adminPage = 'CreateNewCourse'" :class="adminPage === 'CreateNewCourse' ? 'is-active':''">Create Course</a>
                        </li>
                        <li>
                            <a @click="adminPage = 'EditCourse'" :class="adminPage === 'EditCourse' ? 'is-active':''">Edit Courses</a>
                        </li>
                    </ul>
                    <p class="menu-label">
                        Exercises
                    </p>
                    <ul class="menu-list">
                        <li>
                            <a @click="adminPage = 'CreateExA'" :class="adminPage === 'CreateExA' ? 'is-active':''">Type A</a>
                        </li>
                        <li>
                            <a @click="adminPage = 'CreateExB'" :class="adminPage === 'CreateExB' ? 'is-active':''">Type B</a>
                        </li>
                    </ul>
                </aside>
            </div>
            <div class="column">

                <section>
                    <CreateExA v-if="adminPage === 'CreateExA'" />
                    <CreateExB v-if="adminPage === 'CreateExB'" />
                    <CreateNewCourse v-if="adminPage === 'CreateNewCourse'" />
                    <EditCourse v-if="adminPage === 'EditCourse'" />
                </section>
            </div>
        </div>
    </section>

</template>

<script>
import CreateExA from "./../components/CreateExA.vue";
import CreateExB from "./../components/CreateExB.vue";
import CreateNewCourse from "./../components/CreateNewCourse.vue";
import EditCourse from "./../components/EditCourse.vue";

export default {
  data() {
    return {
      adminPage: "CreateExA"
    };
  },
  components: {
    CreateExA,
    CreateExB,
    EditCourse,
    CreateNewCourse
  }
};
</script>

<style>
.admin-menu {
  border-right: 1px solid #ccc;
  margin-right: 1rem;
}
</style>
