<template>
    <div id="app">
        <div class="navbar is-primary" v-if="user">
            <div class="navbar-brand">
                <a class="navbar-item" @click="showNav = false" href="#/home">End Training</a>
                <div class="navbar-item is-right" @click="showNav = false">{{user.username || user.email}}</div>
                <div class="navbar-burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </div>
            </div>

            <div class="navbar-menu" :class="{ 'is-active': showNav }">
                <div class="navbar-end">
                    <a v-if="user.isAdmin" @click="showNav = false" class="navbar-item" href="#/admin">
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
        <router-view />
        <div :class="loading ? 'show-loader loading' : 'loading'">
            <div class="load-wrap">
                <div class="load-spinner"></div>
            </div>
        </div>
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
    beforeCreate() {
        console.log('GET LABELS');

        this.$store.dispatch('getLabels');
    },
    computed: {
        user() {
            if (this.$store.getters.user !== null)
                return this.$store.getters.user;
        },
        isAdmin() {
            if (this.$store.getters.user !== null)
                return this.$store.getters.user.isAdmin;
        },
        loading() {
            return this.$store.getters.loading;
        }
    }
};
</script>

<style scoped>
.loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.show-loader {
    display: flex !important;
}

.load-spinner {
    height: 10rem;
    width: 10rem;
    border-radius: 30rem;
    border: 1rem solid rgba(255, 255, 255, 0.1);
    border-left: 1rem solid white;
    -webkit-animation: load8 1.1s infinite ease-in-out;
    animation: load8 1.1s infinite ease-in-out;
}

.load-wrap::before {
    content: 'loading';
    font-size: 3rem;
    color: white;
}

@-webkit-keyframes load8 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes load8 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>
