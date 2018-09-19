<template>
    <div class="landing">
        <section class="hero is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        {{this.$store.getters.appName}}
                    </h1>
                    <h2 class="subtitle">
                        Log in or sign up
                    </h2>
                </div>
            </div>
        </section>
        <section class="container">
            <div class="columns">
                <div class="column"></div>
                <div class="column">

                    <div class="box is-radiusless">
                        <div class="tabs">
                            <ul>
                                <li :class="tab === 'signUp' ? 'is-active': ''">
                                    <a @click="tab = 'signUp'">Sign Up</a>
                                </li>
                                <li :class="tab === 'logIn' ? 'is-active': ''">
                                    <a @click="tab = 'logIn'">Log In</a>
                                </li>
                            </ul>
                        </div>
                        <form @submit.prevent="signUserUp" v-if="tab === 'signUp'">
                            <div class="field">
                                <label class="label" for="email">Email</label>
                                <div class="control">
                                    <input autocomplete="email" class="input is-radiusless" v-model="email" type="email"
                                        name="email" id="email">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label" for="password">Password</label>
                                <div class="control">
                                    <input autocomplete="password" class="input is-radiusless" v-model="password" type="password"
                                        name="password" id="password">
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <button type="submit" class="button is-link is-radiusless">Sign Up</button>
                                </div>
                            </div>
                        </form>
                        <form @submit.prevent="logUserIn" v-if="tab === 'logIn'">
                            <div class="field">
                                <label class="label" for="email">Email</label>
                                <div class="control">
                                    <input autocomplete="email" class="input is-radiusless" v-model="email" type="email"
                                        @blur="onBlurEmail" name="email" id="email">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label" for="password">Password</label>
                                <div class="control">
                                    <input autocomplete="password" class="input is-radiusless" v-model="password" type="password"
                                        @blur="onBlurPassword" name="password" id="password">
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <button type="submit" class="button is-link is-radiusless">Log In</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="notification is-radiusless is-danger" v-if="message">
                        <button class="delete" @click="$store.dispatch('clearErrorMessage')"></button>
                        {{message}}
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'landing',
    components: {},
    data() {
        return {
            email: '',
            password: '',
            tab: localStorage.getItem('token') ? 'logIn' : 'signUp'
        };
    },
    methods: {
        onBlurPassword(event) {
            if (event && this.password !== event.target.value)
                this.password = event.target.value;
        },
        onBlurEmail(event) {
            if (event && this.email !== event.target.value)
                this.email = event.target.value;
        },
        signUserUp() {
            this.$store.dispatch('signUserUp', {
                email: this.email,
                password: this.password
            });
        },
        logUserIn() {
            this.$store.dispatch('logUserIn', {
                email: this.email,
                password: this.password
            });
        }
    },
    computed: {
        message() {
            if (this.$store.getters.errorMessage !== null)
                return this.$store.getters.errorMessage;
        }
    }
};
</script>


<style>
.landing {
    height: 100vh;
    background-image: url('./../assets/bookshop.jpg');
    filter: grayscale(30%);
    background-size: cover;
    /* filter: blur(5px);
  filter: hue-rotate(90deg); */
}

.box {
    margin-top: 3rem;
}
</style>
