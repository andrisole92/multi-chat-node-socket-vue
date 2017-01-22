import Vue from 'vue'
import Vuex from 'vuex'
import App from './vue_components/app.vue'
import Home from './vue_components/home.vue'
import Mail from './vue_components/mail/mail.vue'
import MessageBox from './vue_components/mail/message-box.vue'
import Todo from './vue_components/mail/todo-item.vue'
import Users from './vue_components/users.vue'
import Routes from './vue_components/navigation/routes.vue'
import Register from './vue_components/navigation/register.vue'
import Login from './vue_components/navigation/login.vue'
import VueSocketio from 'vue-socket.io';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueViewport from 'vue-viewport'
import VueEvents from 'vue-events';
import store from './store/store'
import cookieMixin from './mixins_vue/cookies'
import loginMixin from './mixins_vue/login'

import {routes as ChatRoutes} from './routes/chat'


Vue.use(VueSocketio, 'http://localhost:3000',store);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueViewport);
Vue.use(VueEvents);

//const Home = { template: '<div>home</div>' }

// 3. Create the router
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/logout', component: Home },
        { path: '/users', component: Users,
            children: [
                {
                    path: 'users/todo',
                    component: Todo
                }
            ]
        },
        { path: '/messages', component: Mail,
            children: ChatRoutes
        }
    ]
});

var app = new Vue({
    router,
    created: function(){
        this.initUserDataIfExists();
    },
    mixins: [cookieMixin,loginMixin],
    el: '#app',
    components: { Register,App,Routes },
    sockets: {
        connect: function () {
            console.log('socket connected');
            this.$socket.emit('userID', this.getCookie('userID'));

        }
    },
    methods: {
        test () {
            console.log("test app");
            console.log(store.state.counter);
        },
        changeStore(n){
            store.dispatch('increment',n);
        },
        initUserDataIfExists(){
            console.log("initiating user data 1");
            var userID = this.getCookie("userID");
            if (userID != ""){
                this.initUserData(userID);
            }

        }
    }
});

app.$on('eve', function (id) {
    console.log("coutght");
});
