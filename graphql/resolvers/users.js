const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');
const { SECRET_KEY } = require('../../config');

const User = require('../../models/User');

const generateToken = (res) =>
  jwt.sign(
    {
      id: res.id,
      email: res.email,
      username: res.username
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

module.exports = {
  Mutation: {
    async login(_, { username, password }, context, info) {
      const { errors, valid } = validateLoginInput(username, password);
      if(!valid){
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({username});
      if(!user){
        errors.general = 'User not fund';
        throw new UserInputError('User not fund', { errors });
      }

      const matchPassword = await bcrypt.compare(password, user.password);
      if(!matchPassword) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }
      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      }

    },

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

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token
      }

    }
  }
}