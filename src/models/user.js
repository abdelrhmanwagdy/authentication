
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const Types = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
  name: {
    type: Types.String,
    required: true
  },
  loginField: {
    type: Types.String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: Types.String,
    required: true,
    trim: true,
    minlength: 7,
    required: true
  }
})


// @return      return user Object without password
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()
  
  delete userObject.password

  return userObject
}


// @return      return token
userSchema.methods.generateAuthToken = async function () {
  let user = this

  const payload = { _id: user._id.toString(),name: user.name}
  const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn:3600})

  return token
}

// @desc        This method is used for authentication 
// @return      return user Object
userSchema.statics.findByCredentials = async (loginField, password) => {
  const user = await User.findOne({ loginField })

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login')
  }
  return user;
}

// @desc        This method will be excuted before any save operation to the DB  
userSchema.pre('save', async function (next) {
  let user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next();
})

const User = mongoose.model('user', userSchema)

module.exports = User
