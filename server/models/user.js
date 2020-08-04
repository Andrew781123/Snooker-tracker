const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userInfoSchema = new mongoose.Schema({
  isSet: {
    type: Boolean,
    default: false
  },
  experience: {
    type: Number,
    requried: true
  },
  favourite_player: {
    type: String
  },
  bio: {
    type: String
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  user_info: userInfoSchema,
  goals: [{ type: mongoose.Schema.Types.ObjectId, ref: "goal" }]
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hashedPw) => {
      if (err) return next(err);

      this.password = hashedPw;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

const User = mongoose.model("user", userSchema);

module.exports = User;
