<template>
    <section>
        <h1 class="title">Users</h1>
        <p class="level"> A summary of all the users.
        </p>
        <table class="table is-fullwidth is-hoverable is-striped">
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Confirmed?</th>
                    <th>Admin?</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="u in users" :key="u._id">
                    <td @click="getPoints(u.email)">{{u.email}}</td>
                    <td>{{u.confirmed}}</td>
                    <td>{{u.isAdmin}}</td>
                </tr>

            </tbody>
        </table>


    </section>
</template>

<script>
export default {
    name: 'users',
    data() {
        return {
            users: []
        };
    },
    methods: {
        getPoints(id) {
            this.$store.dispatch('getMyPoints', id).then(r => {
                console.log(r);
            });
        }
    },
    computed: {},
    mounted() {
        //TODO: store in vuex store so we dont fetch them every time we visit homepage?
        this.$store
            .dispatch('getUsers')
            .then(x => (this.users = x))
            .catch(err => {
                console.log('err');
                console.log(err);

                this.$router.push('/');
            });
    }
};
</script>

<style>
.margin-delete-button {
    margin-top: 20px;
    position: absolute;
    right: 0;
}

#imgPreview {
    outline: 1px solid #ccc;
    height: 160px;
    width: 320px;
    position: absolute;
    top: 160px;
    margin-left: 21px;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>
