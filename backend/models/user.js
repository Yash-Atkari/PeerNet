const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  bio: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.plugin(passportLocalMongoose);
// If you want to log in using email instead of username, you need to configure Passport Local Mongoose to treat email as the username field:
// userSchema.plugin(passportLocalMongoose, {
//   usernameField: "email"
// });

module.exports = mongoose.model("User", userSchema);
