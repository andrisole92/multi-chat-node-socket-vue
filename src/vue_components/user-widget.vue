<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="user-widget">
        <p>username: {{email}} <button v-on:click="show = !show">Send Message</button> </p>
        <transition name="fade">
            <div v-if="show">
                <form>
                    <input type="text" v-model="message"/>
                    <input type="submit" value="send" v-on:click="sendMessage">
                    <p class="success">{{status}}</p>
                </form>
            </div>
        </transition>
    </div>

</template>

<script>
    import store from '../store/store'

    export default {
        components:{
        },
        sockets:{
            messageSent: function(){
                this.message = '';
                this.bCanSend = true;
            }
        },
        props: ['email', 'uid'],
        data () {
            return {
                show: false,
                message: '',
                status: '',
                bCanSend: true
            }
        },
        methods: {
            sendMessage(e){
                e.preventDefault();
                console.log("sending: '"+this.message+"' to: "+this.uid+", from: "+store.state.user._id);
                if (this.bCanSend){
                    this.bCanSend = false;
                    this.$http.post('/sendMessage',{fromID: store.state.user._id, toID: this.uid, message: this.message, email:store.state.user.email}).then(function(response) {
                        if (response != false){
                            var mesg = response.body;
                            this.onSentMessage(mesg);
                        } else {
                            this.status = 'cant send message';
                        }
                    });
                }
            },
            onSentMessage(msg){
                this.$socket.emit('message_sent', msg);
                this.message = '';
                this.bCanSend = true;
                this.status = 'message sent';
            }

        }

    }
</script>

<style scoped>
    p {
        display: inline-block;
        padding-left: 12px;
    }
    button{
        padding-left: 12px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .1s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>