const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validateRegisterInput } = require('../../utils/validators');
const { SECRET_KEY } = require('../../config');

const User = require('../../models/User');

module.exports = {
  Mutation: {
    async register(_, {registerInput : {username, email, password, confirmPassword}}, context, info) {
      const { errors, valid } = validateRegisterInput();
      if(!valid) {
        throw new UserInputError('Errors', { errors });
      }
      const passwordHash = await bcrypt.hash(password, 12);
      const user = await User.findOne({ username });
      if(user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken'
          }
        })
      }
      const newUser = new User({
        email,
        username,
        password: passwordHash,
        createdAt: new Date().toISOString()
      });

      const res = await newUser.save();

      const token = jwt.sign({
        id: res.id,
        email: res.email,
        username: res.username
      }, SECRET_KEY, { expiresIn: '1h'});

      return {
        ...res._doc,
        id: res._id,
        token
      }

    }
  }
}