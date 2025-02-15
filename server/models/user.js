const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: "A username is required",
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: "An email is required",
      unique: true,
      trim: true,
      match: [/.+@.+\..+/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    //CLASSCODE
    //UofW-VIRT-BO-FSF-PT-02-2022-U-B-TTH
    classCode: {
      type: String,
      required: 'A class code is required.',
      match: [/.+-.+-.+-.+-.+-.+-.+-.+-.+-/, 'Needs to be valid class code.']
    },

    //reference Message model
    messages: [{
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }]

  },
  // verification code required here!!!!!
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
