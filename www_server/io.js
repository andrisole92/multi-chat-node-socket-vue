define(['socket.io','app','http','db'], function(socketio, App, http, Db) {
    console.log("io.js module loaded");
    var db = new Db();
    var http = require('http').Server(App);

    var onlineUsers = [];

    http.listen(3000, function(){
        console.log('listening on *:3000');
    });

    var io = socketio(http);
    io.on('connection', function(socket){
        var user = {};
        console.log('a user connected: '+socket.id);
        socket.on('check_user',function(data){
            db.findUser(data.username).then(function(user){
                socket.emit('userFound',user);
            });
        });
        socket.on('logged_in',function(data){
            console.log("a user is logged in");
            console.log(data);
        });

        socket.on('logged_out',function(userID){
            console.log("user logged out: ");
            console.log(userID);
        });
        socket.on('getUserByID',function(data){
            db.findUserById(data.userID).then(function(user){
                socket.emit('userFoundById',user);
            });
        });
        socket.on('userID',function(data){
            console.log(user);
            console.log('userID: ');
            console.log(data);
            user = new User(data,socket.id);
            console.log(user);
            onlineUsers.push(user);
            console.log(onlineUsers);

        });
        socket.on('message_sent',function(data){
            console.log('socket: Message sent');
            console.log(data);
            var toID = data.toID;
            for (var a = 0; a<onlineUsers.length;a++){
                var u = onlineUsers[a];
                console.log(u.userID);
                if (u.userID == toID){
                    socket.to(u.socketID).emit("newMessage", data);
                    console.log('user2 is online, can emit a Scoket');
                }
            }

        });
        socket.on('disconnect',function(){
            console.log("before");
            console.log(socket.id);
            console.log(onlineUsers);

            for (var a = 0; a<onlineUsers.length;a++){
                var u = onlineUsers[a];
                console.log(u.userID);
                if (u.socketID == socket.id){
                    onlineUsers.splice(a,1);
                }
            }
            console.log("after");
            console.log(onlineUsers)
        });


    });

    function User(userID,socketID){
        this.userID = userID;
        this.socketID = socketID;
    }


    return io;
});