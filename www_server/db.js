define(['mongoose'], function (mongoose) {
    console.log("db.js module loaded");
    mongoose.connect('mongodb://andrisole92:bayazeth1@ds141128.mlab.com:41128/heroku_fwpj43xj');
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("successfully connected to mongoDB");
    });

    var Schema = mongoose.Schema;
    var ObjectId = Schema.Types.ObjectId;

    var userSchema = Schema({
        email: String,
        password: String,
        dob: Date,
        type: String

    });


    var messageSchema = Schema({
        chatID: ObjectId,
        read: {type: Boolean, default: false},
        fromID: String,
        toID: String,
        email: String,
        message: String,
        date: { type: Date, default: Date.now }

    });

    var User = mongoose.model('User', userSchema);
    var Message = mongoose.model('Message', messageSchema);

    var chatSchema = Schema({
        patientID: ObjectId,
        doctorID: ObjectId,
        lastMessage: {msg: String, date: {type: Date, default: Date.now}}
    });
    var Chat = mongoose.model('Chat', chatSchema);


    function Db(){
    }
    Db.prototype = {
        constructor: Db,

        findUser: function(username){
            return User.findOne({ 'email': username }).then(function(user){
                return user;
            }).catch(function(err){
                console.log(err);
                return err;
            });
        },
        findUserById: function(userID){
            return User.findById(userID).then(function(user){
                return user;
            }).catch(function(err){
                console.log(err);
                return err;
            });
        },
        saveUser: function(data){
            var newUser = { email: data.username ,password: data.password ,dob: new Date(92, 8, 26), type: 'patient' };
            var user = new User(newUser);
            return user.save(user).then(function(user){
                return user;
            }).catch(function(err){
                console.log(err);
                return err;
            });
        },
        getUsers: function(userID){
            console.log("getting users from mongoDB");
            console.log(userID);
            return User.find({'_id': {$ne: userID}}).then(function(users){
                return users;
            }).catch(function(err){
                console.log(err);
                return err;
            });
        },
        addMessage: function(data){
            var newMessage;
            console.log("adding message");
            console.log(data);
            return Chat.findOne({$or:[{'patientID':data.toID, 'doctorID':data.fromID}, {'patientID':data.fromID, 'doctorID':data.toID}]}).
            then(function(chat){
                if (chat == undefined){
                    console.log("chat does not exist yet, need to create one");
                    var newChat = new Chat({patientID:data.toID,doctorID:data.fromID, lastMessage: {msg: data.message}});
                    return newChat.save(newChat).then(function(chat){
                        newMessage = new Message({chatID:chat.id, fromID:data.fromID, toID:data.toID, message:data.message, email:data.email});
                        console.log(newMessage);
                        return newMessage.save(newMessage).then(function(message){
                            return message;
                        }).catch(function(err){
                            console.log(err);
                            return err;
                        });
                    }).catch(function(err){
                        console.log(err);
                        return err;
                    });
                } else {
                    console.log("chat already exist");
                    console.log(chat.id);
                    newMessage = new Message({chatID:chat.id, fromID:data.fromID, toID:data.toID, message:data.message, email:data.email});
                    console.log(newMessage);
                    return Chat.update({ _id: chat.id },{lastMessage: {msg: data.message, date: Date.now()}}).then(function(result){
                        return newMessage.save(newMessage).then(function(message){
                            return message;
                        }).catch(function(err){
                            console.log(err);
                            return err;
                        });
                    }).catch(function(err){
                        console.log(err);
                        return err;
                    });

                }
            }).catch(function(err){
                console.log(err);
                return err;
            });
        },
        getUnreadMessagesCount: function(userID){
            console.log("getting unread messages");
            console.log(userID);
            return Message.count({$and:[{'toID':userID},{'read':false}]}).then(function(count){
                console.log("got unread messages");
                console.log(count);
                return count;
            }).catch(function(err){
                console.log(err);
                return err;
            });
        },
        getChats: function(userID){
            console.log("getting chats from MongoDB");
            return Chat.find({$or:[{'patientID':userID},{'doctorID':userID}]}).sort({ 'lastMessage.date' : -1}).then(function(chats){
                return chats;
            }).catch(function(err){
                console.log(err);
                return err;
            });
        },
        getUnreadCountForChat: function(userID,chatID){
            return Message.count({$and:[{'chatID':chatID},{'fromID':userID},{'read':false}]}).then(function(count){
                return count;
            }).catch(function(err){
                console.log(err);
                return err;
            });
        },
        getMessages: function(chatID){
            return Message.find({'chatID':chatID}).then(function(msgs){
                return msgs;
            }).catch(function(err){
                console.log(err);
                return err;
            });
        },
        readMessage: function(msgID){
            return Message.update({ _id: msgID },{read: true}).then(function(result){
                return result;
            }).catch(function(err){
                console.log(err);
                return err;
            });
        }
    };

    return Db;
});