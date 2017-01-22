<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div>

        <div v-if="getCookie('userID') == ''" class="routes">
            <router-link to="/login" active-class="router-link-active">login</router-link>
            <router-link to="/register"  active-class="router-link-active">register</router-link>
        </div>
        <div v-else class="routes">
            <router-link to="/messages" active-class="router-link-active">Messages<span v-if="newMessages > 0"> (new: {{newMessages}})</span></router-link>
            <router-link to="/users" active-class="router-link-active">Users</router-link>
            <account-nav></account-nav>
            <a href="#" v-on:click='logout'>logout</a>
        </div>
        <router-view></router-view>

    </div>

</template>

<script>
    import AccountNav from './account-nav.vue';
    import cookieMixin from '../../mixins_vue/cookies';
    import store from '../../store/store';
    export default {
        mixins: [cookieMixin],
        components:{
            'account-nav': AccountNav
        },
        sockets:{
            newMessage(data){
                console.log('received new message');
                store.dispatch('incrementUnread');
            }
        },
        data () {
            return {
            }
        },
        methods: {
            logout(){
                console.log("logging out");
                this.removeCookie("userID");
                this.$socket.emit('logged_out',store.state.user._id);
                window.location = "/";
            }

        },
        computed:{
            newMessages(){
                return store.state.nUnread;
            }
        }
    }
</script>

<style>
</style>