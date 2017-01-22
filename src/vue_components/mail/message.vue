<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <div class="message">
        <div v-bind:class="[cl]" class="msg">
            <p>{{msg.fromID}}, {{msg.date}}</p>
            <p>{{msg.message}}</p>
        </div>
        <br/>
    </div>
</template>

<script>
    import inViewport from 'vue-in-viewport-mixin';
    import scrollMonitor from 'scrollmonitor';
    import store from '../../store/store';

    export default {
        mounted: function(){
            var containerElement = document.getElementById('all-messages');
            containerElement.scrollTop = containerElement.scrollHeight;
            var containerMonitor = scrollMonitor.createContainer(containerElement);
            var childElement = this.$el;
            var elementWatcher = containerMonitor.create(childElement);

            elementWatcher.enterViewport(function() {
                if (this.msg.read == false && store.state.user._id == this.msg.toID){
                    this.msg.read = true;
                    this.readMessage();
                }
            }.bind(this));
        },
        props: ['msg', 'cl'],
        sockets:{
        },
        data () {
            return{

            }
        },
        methods:{
            readMessage(){
                console.log("reading a message");
                this.$http.post('/readMessage', {
                    msgID: this.msg._id
                }).then(function (response) {
                    if (response){
                        this.$events.$emit('readMessage', this.msg);
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .msg-to{
        text-align: right;
    }
</style>