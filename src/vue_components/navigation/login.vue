<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="login-form">
        <form>
            <input autocomplete="on" v-model="username" v-on:input="checkUserExists($event.target.value)" placeholder="enter username">
            <button type="submit" v-if="userFound" v-on:click="login">Login</button>
        </form>
    </div>
</template>

<script>
    import cookieMixin from '../../mixins_vue/cookies';
    import store from '../../store/store';

    export default {
        mixins: [cookieMixin],
        sockets:{
            userFound: function(user){
                console.log(user);
                this.userFound = user != null;
            }
        },
        data () {
            return {
                username: "",
                userFound: false
            }
        },
        methods: {
            checkUserExists (value) {
                this.$socket.emit('check_user', {username: value});
            },
            login(e){
                e.preventDefault();
                this.$http.post('/login',{username: this.username}).then(function(response) {
                    this.loggedIn(response.body)
                });
            },
            loggedIn(data){
                if (data != undefined){
                    store.dispatch('setUser',data);
                    this.setCookie("userID="+data._id, 1);
                    this.$socket.emit('logged_in', store.state.user);
                    window.location = "./";
                }
            }
        }
    }
</script>

<style>
</style>