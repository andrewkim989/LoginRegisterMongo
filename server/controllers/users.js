const mongoose = require("mongoose");
var User = mongoose.model("User");

const bcrypt = require("bcrypt");

module.exports = {
    signin: function(req, res) {
        res.render("login");
    },

    register: function(req, res) {
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var email = req.body.email;
        var password = req.body.password;
        var birthday = req.body.birthday;
    
        var user = new User({first_name: first_name, last_name: last_name, email: email,
        password: password, birthday: birthday});
    
        user.save(function (err, user) {
            if (err) {
                for(var key in err.errors){
                    req.flash("register", err.errors[key].message);
                }
                res.redirect("/");
            }
            else {
                var sess = req.session;
                let hash = bcrypt.hashSync(password, 10);
                user.password = hash;
                user.save();
    
                sess.email = user.email;
                sess.login = true;
                res.redirect("/home");
            }
        })
    },

    login: function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
    
        User.findOne({email: email}, function(err, user) {
            if (user == null) {
                req.flash("login", "Cannot find email. Please register for an account.");
                res.redirect("/");
            }
            else {
                if(bcrypt.compareSync(password, user.password)) {
                    var sess = req.session;
    
                    sess.email = user.email;
                    sess.login = true;
                    res.redirect("/home");
                }
                else {
                    req.flash("login", "Incorrect password.");
                    res.redirect("/");
                }
            }
        })
    },

    home: function (req, res) {
        var sess = req.session;
        if (sess.login != true) {
            res.redirect("/");
        }
        else {
            var email = sess.email;
            User.findOne({email: email}, function (err, user) {
                if (err) {
                    console.log("Cannot find user.");
                }
                else {
                    res.render("home", {user: user});
                }
            })
        }
    },

    logout: function(req, res) {
        req.session.destroy();
        res.redirect("/");
    }
}