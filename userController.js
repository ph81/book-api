// Import User Model
const User = require('./userModel');

//Handling index actions
exports.index = function(req, res) {
    User.find()
    .exec()
    .then(data => res.status(200).json(data));
}

// Create user
exports.new = function (req, res) {
    let user = new User();
    user.name = req.body.name ? req.body.name : user.name;
    user.email = req.body.email;
    user.avatar = req.body.avatar;

    //saving user and checking for errors
    user.save(function (err) {
        res.json({
            message: 'New user created!',
            status: 'ok',
            data: user
        });
    });
};


// Handle view user info
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'user details loading..',
            data: user
        });
    });
};

// Handle update user info
exports.update = function (req, res) {

    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);

        user.name = req.body.name ? req.body.name : user.name;
        user.email = req.body.email;
        user.avatar = req.body.avatar;
 

        // save the user and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'User Info updated',
                status: "ok",
                data: user
            });
        });
    });
};


// Handle delete user
exports.delete = function (req, res) {
    User.deleteOne({
        _id: req.params.user_id
    }, function (err, user) {
        if (err)
            res.send(err);

        res.json({
            status: "ok",
            message: 'User deleted'
        });
    });
};