<template>
    <section class="section container">
        <h1 class="title">Confirm</h1>
        <p class="level">You will receive an email with your secret code. Please fill it in to complete your registration.

        </p>
        <div class="columns">
            <div class="column is-one-fifth">

                <form @submit.prevent="confirm">
                    <div class="field">
                        <label class="label" for="email">Code</label>
                        <div class="control">
                            <input class="input is-radiusless" v-model="confirmCode" type="text" name="confirm" id="confirm">
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
    </section>
</template>

<script>
export default {
  data() {
    return {
      confirmCode: ""
    };
  },
  methods: {
    confirm() {
      this.$store.dispatch("confirmUser", {
        code: this.confirmCode
      });
    }
  }
};
</script>

<style>
</style>
