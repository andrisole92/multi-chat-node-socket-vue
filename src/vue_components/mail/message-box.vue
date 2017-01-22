<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="message-box">
        <div>
            <p>Message Box {{ $route.params.chatID}}</p>
        </div>
        <div id="all-messages">
            <template v-for="msg in messages">
                <div v-if="msg.fromID == userID">
                    <message :msg="msg" cl="msg-to"></message>
                </div>
                <div v-else>
                    <message :msg="msg" cl="msg-from"></message>
                </div>
            </template>
        </div>
        <div class="send-message">
            <form>
                <input type="text" v-model="message"/>
                <input type="submit" value="send" v-on:click="sendMessage">
                <p class="success">{{status}}</p>
            </form>
        </div>
    </div>
</template>

<script>
    import Message from './message.vue';
    import store from '../../store/store';
    export default {
        beforeMount:function(){
            this.getMessages();
        },
        components:{
            'message': Message
        },
        sockets:{
            newMessage(data){
                console.log("New Message!");
                data.read = false;
                if (data.chatID == this.$route.params.chatID){
                    this.messages.push(data);
                }
            }
        },
        data () {
            return {
                messages: [],
                message: '',
                status: '',
                bCanSend: true
            }
        },
        methods: {
            getMessages(){
                this.status = '';
                this.message = '';
                this.bCanSend = true;
                this.$http.post('/getMessages',{chatID: this.$route.params.chatID
                }).then(function(response) {
                    this.messages = response.body;
                });
            },
            sendMessage(e){
                e.preventDefault();
                console.log("sending: '"+this.message+"' to: "+this.$route.params.user2ID+", from: "+store.state.user._id);
                if (this.bCanSend){
                    this.bCanSend = false;
                    var msg = {fromID: store.state.user._id, toID: this.$route.params.user2ID, message: this.message, email:store.state.user.email, date: Date.now()};
                    this.$http.post('/sendMessage',msg).then(function(response) {
                        if (response != false){
                           msg = response.body;
                           this.onSentMessage(msg);
                        } else {
                            this.status = 'cant send message';
                        }
                    });
                }
            },
            onSentMessage(msg){

                this.messages.push(msg);
                this.$events.$emit('shiftChat', this.$route.params.chatID);
                this.$socket.emit('message_sent', msg);
                this.message = '';
                this.bCanSend = true;
                this.status = 'message sent';
            }
        },
        computed: {
            userID(){
                return store.state.user._id
            }
        },
        watch: {
            '$route' (to, from) {
                this.getMessages();
            }
        }
    }
</script>

<style scoped>
    .message-box {
        width: 80%;
        float: right;
    }
    #all-messages{
        height:auto !important;
        max-height: 60vh;
        overflow-y: scroll;
        overflow-x: hidden;
        display: block;
    }
</style>