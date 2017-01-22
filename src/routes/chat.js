import MessageBox from '../vue_components/mail/message-box.vue'
import Todo from '../vue_components/mail/todo-item.vue'

export const routes = [
    {
        path: 'chat/:user2ID/:chatID',
        name: 'chat',
        component: MessageBox
    }
];