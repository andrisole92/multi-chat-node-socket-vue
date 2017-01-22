<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="application">
    </div>
</template>

<script>
    import cookieMixin from '../mixins_vue/cookies'
    export default {
        mixins: [cookieMixin],
        sockets:{
        },
        data () {
            return {
                username: "",
                userFound: false
            }
        },
        methods: {
        }
    }
</script>

<style>
</style>