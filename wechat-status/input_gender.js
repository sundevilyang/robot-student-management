const UserStatus = require('../model/userStatus');
const User = require('../model/user');
const constant = require('../config/constant');
const Validate = require('../tool/validate');
const async = require('async');

class InputGender {
  constructor() {
    this.validate = new Validate();
    this.realType = [{type: 'Text'}];
    this.realSex = [{sex: '男'}, {sex: '女'}];
  }

  showText() {
    return {type: 'Text', info: '请输入你所在的城市'};
  }

  handler(userId, message, callback) {
    async.waterfall([
      (done) => {
        if (this.validate.check(message.type, this.realType) && message.text === 'q'){
          UserStatus.update({userId: userId},{status: 'choice'}, (err) => {
            done(null, {text: constant.validate.info});
          });
        } else if (this.validate.check(message.type, this.realType) &&
            this.validate.sex(message.text, this.realSex)) {
          User.update({userId: userId}, {sex: message.text}, done);
        } else {
          done(null, {text: constant.validate.err});
        }
      },
      (data, done) => {
        if (data.text) {
          done(null, data);
        } else {
          UserStatus.update({userId: userId}, {status: 'input_city'}, done);
        }
      }
    ], (err, data) => {
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

module.exports = InputGender;