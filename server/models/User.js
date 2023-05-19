const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');



const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    feelings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Feeling',
      },
    ],
    emotionHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Feeling',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

const feelingSchema = new Schema(
  {
    emotion: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    recommendations: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    }
);

const Feeling = model('Feeling', feelingSchema);

module.exports = { User, Feeling };
