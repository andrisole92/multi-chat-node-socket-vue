<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="chat" v-bind:class="{ active: isActive }">
        <router-link tag="div" :to="{name: 'chat', params: { chat: chat, user2ID: user._id , chatID: chat._id }}"><a>chatting with: {{user.email}}<span> (new: {{nUnread}})</span></a></router-link>

        <!--<router-link tag="div" :to="{name: 'chat', params: { chatID: chat._id, user2ID: user._id }}"><a>chatting with: {{user.email}}<span v-if="nUnread > 0"> (new: {{nUnread}})</span></a></router-link>-->

        <!--{{userid}}-->
        <!--<div>-->
        <!--</div>-->

    </div>
</template>

<script>
    import store from '../../store/store';
    export default {
        mounted() {
            this.$events.listen('readMessage', function(msg){
                if (this.chat._id == msg.chatID){
                    console.log("Message Read");
                    this.nUnread -= 1;
                    store.state.nUnread -= 1;
                }
            }.bind(this));

        },

        beforeMount: function(){
            this.GetChatPerson(this.userid);
            this.GetUnreadMessagesCount(this.userid);
        },
        props: ['userid','chat'],
        sockets:{
            newMessage(data){
                console.log('received new message');
                console.log(data);
                console.log(this.user._id);
                console.log(data.fromID);
                if (data.fromID == this.user._id){
                    this.nUnread++;
                    this.$events.$emit('shiftChat', data.chatID);

                }
            }
        },
        data () {
            return {
                user: {email:""},
                isActive: true,
                nUnread: 0
            }
        },
        methods: {
            GetChatPerson(userID){
                this.$http.post('/getUser', {userID: userID}).then(function (response) {
                    this.user = response.body;
                });
            },
            GetUnreadMessagesCount(userID){
                this.$http.post('/getUnreadMessagesForChat', {
                    userID: userID,
                    chatID: this.chat._id
                }).then(function (response) {
                    console.log("Unread: " + response.body.count);
                    this.nUnread = response.body.count;
                });
            }
        },
        watch:{
            userid: function(newVal){
                console.log("new user id here");
                this.GetChatPerson(newVal);
                this.GetUnreadMessagesCount(newVal);
            }
        },
        computed:{
            chatLink(){
                return "/messages/chat/"+this.chat._id;
            },
            userID(){
                return store.state.user._id;
            }
        }
    }
</script>

<style scoped>
    .active{
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>