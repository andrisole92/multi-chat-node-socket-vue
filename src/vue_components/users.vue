<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div>
        <p>users: {{users.length}}</p>
        <template v-for="user in users">
            <user-widget :email="user.email" :uid="user._id"></user-widget>
        </template>
    </div>

</template>

<script>
    import AccountNav from './navigation/account-nav.vue';
    import UserWidget from './user-widget.vue';
    import cookieMixin from '../mixins_vue/cookies'
    import store from '../store/store'
    import VueResource from 'vue-resource';

    export default {
        mixins: [cookieMixin],
        beforeMount: function(){
            this.getUsers();
        },
        components:{
            'account-nav': AccountNav,
            'user-widget': UserWidget
        },
        sockets:{
            connect: function(){
                console.log('socket connected')
            }
        },
        data () {
            return {
                users: []
            }
        },
        methods: {
            getUsers(){
                var userID = store.state.user._id;
                this.$http.post('/getUsers',{userID: userID}).then(function(response) {
                    this.users = response.body;
                });
            }
        },
        computed:{
        }
    }
</script>

<style scoped>
    button{
        padding-left: 12px;
    }
</style>