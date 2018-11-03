var mongoose = require("mongoose");

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

var birthdayVal = function(birthday) {
    var diff = Date.now() - birthday.getTime();
    var age = new Date(diff);
    var final = Math.abs(age.getUTCFullYear() - 1970);
    if (final < 13) {
        return false;
    }
    else {
        return true;
    }
}

var UserSchema = new mongoose.Schema({
    first_name: {type: String, required: [true, "Please type in your first name"],
    minlength: [2, "First name must be at least 2 characters long"]},

    last_name: {type: String, required: [true, "Please type in your last name"],
    minlength: [2, "Last name must be at least 2 characters long"]},

    email: {type: String, required: [true, "Please type in your email"],
    validate: [validateEmail, "Not a valid email address"], unique: true},

    password: {type: String, required: [true, "Please type in your password"],
    minlength: [5, "Password must be at least 5 characters long"]},

    birthday: {type: Date, required: [true, "Please enter your birthday"],
    validate: [birthdayVal, "You must be at least 13 years old to register"]}
}, {timestamps: true});

var uniqueValidator = require("mongoose-unique-validator");
UserSchema.plugin(uniqueValidator, {message: "Email already exists in the system"});
mongoose.model("User", UserSchema);