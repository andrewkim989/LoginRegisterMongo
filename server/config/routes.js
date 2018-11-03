var users = require("../controllers/users.js");

module.exports = function(app) {
    app.get("/", function(req, res) {
        users.signin(req, res);
    });
    
    app.post("/register", function(req, res) {
        users.register(req, res);
    });
    
    app.post("/login", function(req, res) {
        users.login(req, res);
    });
    
    app.get("/home", function(req, res) {
        users.home(req, res);
    });
    
    app.get("/logout", function(req, res) {
        users.logout(req, res);
    });
}