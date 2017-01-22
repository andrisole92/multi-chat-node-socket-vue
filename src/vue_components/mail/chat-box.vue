<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="chat-list">
        <div>
            <template v-for="chat in chats">
                <div v-if="chat.patientID == userID">
                    <chat :userid="chat.doctorID" :chat="chat" :nunread="chat.nUnread"></chat>
                </div>
                <div v-else>
                    <chat :userid="chat.patientID" :chat="chat" :nunread="chat.nUnread"></chat>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import Chat from './chat.vue';
    import Todo from './todo-item.vue';
    import VueResource from 'vue-resource';
    import store from '../../store/store';

    export default {
        beforeMount:function(){
            this.getChats();
        },
        mounted: function(){
            this.$events.listen('shiftChat', function(chatID){
                this.shiftOneToTop(chatID);
            }.bind(this));
        },
        components:{
            'chat': Chat,
            'todo': Todo
        },
        sockets:{
        },
        data () {
            return {
                chats: [],
                newTodoText: '',
            }
        },
        methods: {
            addNewTodo: function () {
                this.todos.push(this.newTodoText);
                this.newTodoText = ''
            },
            getChats(){
                this.$http.post('/getChats',{userID: store.state.user._id}).then(function(response) {
                    this.chats = response.body;
                });
            },
            shiftOneToTop(chatID){



                for (var a = 0; a < this.chats.length; a++){
                    var chat = this.chats[a];
                    console.log("searching");
                    console.log(chat._id);
                    console.log(chatID);
                    if (chat._id == chatID){
                        console.log("found one");
                        this.chats.splice(this.chats.indexOf(chat),1);

                        console.log(this.chats);

                        this.chats.unshift(chat);
                        console.log(this.chats);
                        break;
                    }
                }

            },
        },
        computed: {
            userID(){
                return store.state.user._id;
            }
        },
        watch: {

        }
    }
</script>

<style scoped>
    .chat-list{
        width: 20%;
        float: left;
    }
</style>