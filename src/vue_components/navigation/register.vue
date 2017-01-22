<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="login-form" >
        <form>
            <p v-if="userFound">{{message}}</p>
            <input v-model="username" v-on:input="checkUserExists($event.target.value)" placeholder="enter username">
            <p>min 1 characters</p>
            <br>
            <button type="submit" v-if="bCanSubmit" v-on:click="register">register</button>
        </form>
    </div>
</template>

<script>
    import cookieMixin from '../../mixins_vue/cookies';
    import VueResource from 'vue-resource';
    import store from '../../store/store';
    import Vue from 'vue';
    import VueRouter from 'vue-router';
    Vue.use(VueRouter);

    const router = new VueRouter({

    });

    export default {
        mixins: [cookieMixin],
        sockets:{
            userFound: function(user){
                if (user != undefined){
                    this.bCanSubmit = false;
                    this.message = "Sorry, username with this e-mail already exists";
                    console.log(user);
                } else if(this.username.length >= 1){
                    this.bCanSubmit = true;
                } else  {
                    this.bCanSubmit = true;
                }
            },
            successfulyRegistered: function(data){

            }
        },
        data () {
            return {
                username: "",
                password: "",
                bCanSubmit: false,
                userFound: false,
                message: ""
            }
        },
        methods: {
            checkUserExists (value) {
                this.$socket.emit('check_user', {username: value});
            },
            register (e) {
                e.preventDefault();
                var data = {};
                data.username = this.username;
                data.password = this.password;
                this.$http.post('/register',data).then(function(response) {
                    this.finishRegistration(response.body)
                });
            },
            finishRegistration(data){
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