<template>
    <section class="container section">
        <div class="columns">
            <div class="column is-one-fifth">

                <aside class="menu">
                    <p class="menu-label">
                        Create Exercises
                    </p>
                    <ul class="menu-list">
                        <li>
                            <a @click="adminPage = 'typeA'" :class="adminPage === 'typeA' ? 'is-active':''">Type A</a>
                        </li>
                        <li>
                            <a @click="adminPage = 'typeB'" :class="adminPage === 'typeB' ? 'is-active':''">TypeB</a>
                        </li>
                    </ul>
                </aside>
            </div>
            <div class="column">

                <section>
                    <CreateExA v-if="adminPage === 'typeA'"/>
                </section>
            </div>
        </div>
    </section>

</template>

<script>
import CreateExA from "./../components/CreateExA.vue";
export default {
  data() {
    return {
      adminPage: "typeA"
    };
  },
  components: {
    CreateExA
  }
};
</script>

<style>
</style>
