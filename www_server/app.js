define(['express','module','path','body-parser','db','connect-history-api-fallback'],
    function (express, module, path,bodyParser, DB, history) {


    console.log("app.js module loaded");
    var db = new DB();
    var app = express();
    app.use(history());
    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));



    __dirname = path.resolve();

    app.use('/dist', express.static('dist'));
    app.use(express.static('./dist'));
    app.get('*', function(req, res){
        res.sendFile(__dirname + '/index.html');
    });

    app.post('/getUser', function (req, res) {
        var userID = req.body.userID;
        db.findUserById(userID).then(function(user){
            res.send(user);
        });
    });
    app.post('/getUsers', function (req, res) {
        var userID = req.body.userID;
        db.getUsers(userID).then(function(users){
            res.send(users);
        });
    });
    app.post('/register', function (req, res) {
        console.log("registering a user");
        db.saveUser(req.body).then(function(user){
            if (user != undefined){
                res.send(user);
            }
        });
    });
    app.post('/login', function (req, res) {
        console.log("logging in a user");
        db.findUser(req.body.username).then(function(user){
            if (user != undefined){
                res.send(user);
            }
        });
    });
    app.post('/getUnreadMessages', function (req, res) {
        var userID = req.body.userID;
        db.getUnreadMessagesCount(userID).then(function(count){
            res.send({count:count});
        });
    });
    app.post('/getChats', function (req, res) {
        console.log("getting chats");
        db.getChats(req.body.userID).then(function(chats){
            res.send(chats);
        });
    });
    app.post('/getUnreadMessagesForChat', function (req, res) {
        db.getUnreadCountForChat(req.body.userID,req.body.chatID).then(function(count){
            res.send({count:count});
        });
    });
    app.post('/getMessages', function (req, res) {
        db.getMessages(req.body.chatID).then(function(msgs){
            res.send(msgs);
        });
    });
    app.post('/sendMessage', function (req, res) {
        var data = req.body;
        db.addMessage(data).then(function(message){
            if (message != undefined){
                res.send(message);
            } else {
                res.send(false);
            }
        });
    });
    app.post('/readMessage', function (req, res) {
        console.log("messaged read: ");
        var msgID = req.body.msgID;
        db.readMessage(msgID).then(function(result){
            res.send(true)
        });
    });

    return app;
});