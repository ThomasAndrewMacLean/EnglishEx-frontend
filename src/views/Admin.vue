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
                            <a @click="changeAdminPage('CreateNewCourse')" :class="adminPage === 'CreateNewCourse' ? 'is-active':''">Create
                                Course</a>
                        </li>
                        <li>
                            <a @click="changeAdminPage('EditCourse')" :class="adminPage === 'EditCourse' ? 'is-active':''">Edit
                                Courses</a>
                        </li>
                    </ul>
                    <p class="menu-label">
                        Exercises
                    </p>
                    <ul class="menu-list">
                        <li>
                            <a @click="changeAdminPage('CreateExA')" :class="adminPage === 'CreateExA' ? 'is-active':''">Create
                                Type
                                A</a>
                        </li>
                        <li>
                            <a @click="changeAdminPage('CreateExB')" :class="adminPage === 'CreateExB' ? 'is-active':''">Create
                                Type
                                B</a>
                        </li>
                        <li>
                            <a @click="changeAdminPage('EditEx')" :class="adminPage === 'EditEx' ? 'is-active':''">EditEx</a>
                        </li>
                    </ul>
                    <p class="menu-label">
                        Users
                    </p>
                    <ul class="menu-list">
                        <li>
                            <a @click="changeAdminPage('Users')" :class="adminPage === 'Users' ? 'is-active':''">Users</a>
                        </li>
                    </ul>
                    <p class="menu-label">
                        Dev
                    </p>
                    <ul class="menu-list">
                        <li>
                            <a @click="changeAdminPage('DevPage')" :class="adminPage === 'DevPage' ? 'is-active':''">Dev
                                page</a>
                        </li>
                    </ul>
                </aside>
            </div>
            <div class="column">
                <section>
                    <CreateNewCourse v-if="adminPage === 'CreateNewCourse'" />
                    <EditCourse ref="EditCourse" v-if="adminPage === 'EditCourse'" />
                    <CreateExA v-if="adminPage === 'CreateExA'" />
                    <CreateExB v-if="adminPage === 'CreateExB'" />
                    <EditEx v-if="adminPage === 'EditEx'" />
                    <Users v-if="adminPage === 'Users'" />
                    <DevPage v-if="adminPage === 'DevPage'" />
                </section>
            </div>
        </div>
    </section>

</template>

<script>
import CreateExA from './../components/CreateExA.vue';
import CreateExB from './../components/CreateExB.vue';
import CreateNewCourse from './../components/CreateNewCourse.vue';
import EditCourse from './../components/EditCourse.vue';
import Users from './../components/Users.vue';
import EditEx from './../components/EditEx.vue';
import DevPage from './../components/DevPage.vue';

export default {
    data() {
        return {
            adminPage: ''
        };
    },
    created() {
        this.adminPage = this.$route.params.adminPage || 'CreateNewCourse';
    },
    methods: {
        changeAdminPage(newPage) {
            if (this.adminPage === newPage) {
                //send clear to children;
                if (newPage === 'EditCourse') {
                    this.$refs.EditCourse.clearCourse();
                }
                return;
            }
            this.$router.push({
                name: 'admin',
                params: {
                    adminPage: newPage
                }
            });
            this.adminPage = newPage;
        }
    },
    components: {
        CreateNewCourse,
        EditCourse,
        CreateExA,
        CreateExB,
        EditEx,
        Users,
        DevPage
    }
};
</script>

<style>
.admin-menu {
    border-right: 1px solid #ccc;
    margin-right: 1rem;
}
</style>
