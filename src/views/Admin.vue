<template>
  <section class="container section">
    <div class="columns">
      <div class="column is-one-fifth admin-menu">
        <aside class="menu">
          <div class="menu-div" v-for="m in menu" :key="m.title">
            <p class="menu-label">{{m.title}}</p>
            <ul class="menu-list">
              <li v-for="p in m.pages" :key="p.title">
                <a
                  @click="changeAdminPage(p.page)"
                  :class="adminPage === p.page ? 'is-active':''"
                >{{p.title}}</a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      <div class="column">
        <section>
          <LabelEditor v-if="adminPage === 'Labels'"/>
          <AddLabel v-if="adminPage === 'AddLabel'"/>
          <CreateNewCourse v-if="adminPage === 'CreateNewCourse'"/>
          <EditCourse ref="EditCourse" v-if="adminPage === 'EditCourse'"/>
          <CreateExA v-if="adminPage === 'CreateExA'"/>
          <CreateExB v-if="adminPage === 'CreateExB'"/>
          <CreateExC v-if="adminPage === 'CreateExC'"/>
          <CreateExD v-if="adminPage === 'CreateExD'"/>
          <EditEx v-if="adminPage === 'EditEx'"/>
          <Users v-if="adminPage === 'Users'"/>
          <DevPage v-if="adminPage === 'DevPage'"/>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import LabelEditor from './Admin/LabelEditor.vue';
import CreateExA from './Admin/CreateExA.vue';
import CreateExB from './Admin/CreateExB.vue';
import CreateExC from './Admin/CreateExC.vue';
import CreateExD from './Admin/CreateExD.vue';
import CreateNewCourse from './Admin/CreateNewCourse.vue';
import EditCourse from './Admin/EditCourse.vue';
import Users from './Admin/Users.vue';
import EditEx from './Admin/EditEx.vue';
import DevPage from './Admin/DevPage.vue';
import AddLabel from './Admin/AddLabel.vue';
export default {
    data() {
        return {
            adminPage: '',
            menu: [
                {
                    title: 'Labels',
                    pages: [
                        {
                            title: 'Change Labels',
                            page: 'Labels',
                            new: true
                        },
                        {
                            title: 'Add Label',
                            page: 'AddLabel',
                            new: true
                        }
                    ]
                },
                {
                    title: 'Courses',
                    pages: [
                        {
                            title: 'Create Course',
                            page: 'CreateNewCourse'
                        },
                        {
                            title: 'Edit Courses',
                            page: 'EditCourse'
                        }
                    ]
                },
                {
                    title: 'Exercises',
                    pages: [
                        {
                            title: 'Create Type A',
                            page: 'CreateExA'
                        },
                        {
                            title: 'Create Type B',
                            page: 'CreateExB'
                        },
                        {
                            title: 'Create Type C',
                            page: 'CreateExC'
                        },
                        {
                            title: 'Create Type D',
                            page: 'CreateExD'
                        },
                        {
                            title: 'Edit Exercises',
                            page: 'EditEx'
                        }
                    ]
                },
                {
                    title: 'Users',
                    pages: [
                        {
                            title: 'Users',
                            page: 'Users'
                        }
                    ]
                },
                {
                    title: 'Dev',
                    pages: [
                        {
                            title: 'Dev Page',
                            page: 'DevPage'
                        }
                    ]
                }
            ]
        };
    },
    created() {
        this.adminPage = this.$route.params.adminPage || 'Labels';
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
        AddLabel,
        LabelEditor,
        CreateNewCourse,
        EditCourse,
        CreateExA,
        CreateExB,
        CreateExC,
        CreateExD,
        EditEx,
        Users,
        DevPage
    }
};
</script>

<style scoped>
.admin-menu {
    border-right: 1px solid #ccc;
    margin-right: 1rem;
}

.menu-div {
    margin-top: 12px;
}
</style>
