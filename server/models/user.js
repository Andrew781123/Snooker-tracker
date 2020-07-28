const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userStatSchema = new mongoose.Schema(
  {
    cumulative: {
      match_won: {
        type: Number,
        default: 0
      },
      match_played: {
        type: Number,
        default: 0
      },
      frames_played: {
        type: Number,
        default: 0
      },
      centuries_num: {
        type: Number,
        default: 0
      },
      balls_potted: {
        type: Number,
        default: 0
      },
      attempts: {
        type: Number,
        default: 0
      }
    },
    best_record: {
      highest_break: {
        type: Number,
        default: 0
      }
    }
  },
  { toJSON: { virtual: true } }
);

userStatSchema.virtual("pot_success").get(function () {
  return (this.balls_potted / this.attempts).toString() + "%";
});

userStatSchema.virtual("win_rate").get(function () {
  return (this.match_won / this.match_played).toString() + "%";
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
  stats: userStatSchema,
  last_ten_stats: [userStatSchema],
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
