<template lang="html">
    <section class="confirm landing">
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
        <section class="container section">
            <div class="columns">
                <div class="column is-offset-6 is-one-fifth">

                    <div class="box is-radiusless">
                        <form @submit.prevent="confirm">
                            <div class="field">
                                <label class="label" for="email">Code</label>
                                <div class="control">
                                    <input class="input is-radiusless" v-model="confirmCode" type="text" name="confirm"
                                        id="confirm">
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <button type="submit" class="button is-link is-radiusless">Confirm</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
export default {
    data() {
        return {
            confirmCode: ''
        };
    },
    methods: {
        confirm() {
            this.$store.dispatch('confirmUser', {
                code: this.confirmCode
            });
        }
    }
};
</script>

<style>
</style>
