<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <p>username: <a href="#">{{user.email}}</a></p>
</template>

<script>
    import store from '../../store/store';

    export default {
        created: function(){
        },
        sockets:{
        },
        data () {
            return {
            }
        },
        methods: {
        },
        computed:{
            user() {
                return store.state.user
            }
        }
    }
</script>

<style scoped>
    a {
    }

    p {
        display: inline-block;
        margin: 0;
        line-height: 0;
        padding:0 20px;
    }
</style>