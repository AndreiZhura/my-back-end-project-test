const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        minlenght: 2,
        maxlenght: 50,

    },
    password: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
        minlenght: 2,
        maxlenght: 50,
    },
    role: {
        type: String,
        default: 'admin'
    },
})

adminSchema.statics.findUserByCredentials = function(email, password){
    return this.findOne({ email })
      .then((user) => {
        if (!user) {
          return Promise.reject(new Error('Неправильные почта или пароль'));
        }
  
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              return Promise.reject(new Error('Неправильные почта или пароль'));
            }
  
            return user;
          });
      });
  };

module.exports = mongoose.model('admins', adminSchema);