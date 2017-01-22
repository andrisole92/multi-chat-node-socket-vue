import store from '../store/store';

var cookies = {
    created: function () {
    },
    methods: {
        initUserData: function(userID){
            console.log("2");
            this.$http.post('/getUser',{userID: userID}).then((response) => {
                var user = response.body;
                console.log(user);
                store.dispatch('setUser',user);
            }, (response) => {
                console.log(response);
            });

            this.$http.post('/getUnreadMessages',{userID: userID}).then((response) => {
                console.log("got unread");
                console.log(response.body);
                store.dispatch('setUnreadMessages',response.body.count);
            }, (response) => {
                console.log(response);
            });

        }
    }
};

export default cookies