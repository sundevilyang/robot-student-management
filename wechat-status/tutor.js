const UserStatus = require('../model/userStatus');
const User = require('../model/user');
const constant = require('../config/constant');
const Validate = require('../tool/validate');
const async = require('async');

class Tutor {
  constructor() {
    this.validate = new Validate();
    this.realType = [{type: 'Text'}];
  }

  showText() {
    return {type:'Text', info: '你都会哪些编程语言？(如会多种编程语言，请用空格隔开)'};
  }

  handler(userId, message, callback) {
    async.waterfall([
      (done) => {
        if (this.validate.check(message.type, this.realType) && message.text === 'q'){
          UserStatus.update({userId: userId},{status: 'choice'}, (err) => {
            done(null, {text: constant.validate.info});
          });
        } else if (this.validate.check(message.type, this.realType)) {
          User.create({userId: userId, name: message.text}, done);
        } else {
          done(null, {text: constant.validate.err});
        }
      },
      (data, done) => {
        if(data.text) {
          done(null, data);
        } else {
          UserStatus.update({userId: userId},{status:'language'}, done);
        }
      }
    ],(err, data) => {
      if (err) {
        return callback(err, null);
      }
      if (data.text) {
        return callback(null, data.text);
      }
      return callback(null, this.showText());
    });
  }
}

module.exports = Tutor;
