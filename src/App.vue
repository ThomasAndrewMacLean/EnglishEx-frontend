<template>
    <div id="app">
        <div class="navbar is-primary" v-if="user">
            <div class="navbar-brand">
                <a class="navbar-item" @click="showNav = false" href="#/">English Exercises</a>
                <div class="navbar-item is-right" @click="showNav = false">{{user}}</div>
                <div class="navbar-burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </div>
            </div>

            <div class="navbar-menu" :class="{ 'is-active': showNav }">
                <div class="navbar-end">
                    <a @click="showNav = false" class="navbar-item" href="#/admin">
                        admin
                    </a>
                    <a @click="showNav = false" class="navbar-item" href="#/home">
                        home
                    </a>
                    <a @click="showNav = false" class="navbar-item" href="#/settings">
                        settings
                    </a>

                </div>
            </div>
        </div>
        <router-view/>
    </div>
</template>


<script>
export default {
  data() {
    return {
      //user: this.$store.user,
      showNav: false
    };
  },
  computed: {
    user() {
      if (this.$store.getters.user !== null)
        return (
          this.$store.getters.user.username || this.$store.getters.user.email
        );
    }
  }
};
</script>
