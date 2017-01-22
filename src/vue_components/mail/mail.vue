<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="mail-box">
        <div>
            <chat-box></chat-box>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import ChatBox from './chat-box.vue';
    import MessageBox from './message-box.vue';
    export default {
        beforeMount:function(){

        },
        components:{
            'chat-box': ChatBox,
            'message-list': MessageBox
        },
        sockets:{
        },
        data () {
            return {
            }
        },
        methods: {
        }
    }
</script>

<style>
</style>