import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

var store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        user: {email: ""},
        nUnread: ''
    },
    mutations: {
        SETUSER(state,user){
            state.user = user;
            console.log(state.user);
        },
        SETUNREAD(state,count){
            state.nUnread = count;
        },
        INCREMENTUNREAD(state){
            state.nUnread++;
        }
    },
    actions: {
        setUser (context,user) {
            console.log("setting user in store");
            context.commit('SETUSER',user)
        },
        setUnreadMessages(context, count){
            console.log("setting unread messages in store");
            context.commit('SETUNREAD',count)
        },
        incrementUnread(context){
            console.log('incrementing unread state');
            context.commit('INCREMENTUNREAD');
        }
    },
    getters: {
        doneCounter: state => {
            return state.counter = 7;
        }
    }
});

export default store