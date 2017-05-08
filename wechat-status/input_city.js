const UserStatus = require('../model/userStatus');
const User = require('../model/user');
const constant = require('../config/constant');
const Validate = require('../tool/validate');
const async = require('async');

class InputCity {
  constructor() {
    this.validate = new Validate();
    this.realType = [{type: 'Text'}];
  }

  showText(city, NumberSex) {
    let sex = '';
    if (NumberSex === '男') {
      return {type: 'add_member', info: '全国学员群👦'};
    } else {
      sex = '👧';
      switch (city) {
        case '成都':
          return {type: 'add_member', info: '女性编程日-成都群' + sex};
        case '北京':
          return {type: 'add_member', info: '女性编程日-北京群' + sex};
        case '深圳':
          return {type: 'add_member', info: '女性编程日-深圳群' + sex};
        case '上海':
          return {type: 'add_member', info: '女性编程日-上海群' + sex};
        case '西安':
          return {type: 'add_member', info: '女性编程日-西安群' + sex};
        case '武汉':
          return {type: 'add_member', info: '女性编程日-武汉群' + sex};
        case '杭州':
          return {type: 'add_member', info: '女性编程日-杭州群' + sex};
        case '广州':
          return {type: 'add_member', info: '女性编程日-广州群' + sex};
        case '南京':
          return {type: 'add_member', info: '女性编程日-南京群' + sex};
        case '重庆':
          return {type: 'add_member', info: '女性编程日-重庆群' + sex};

        default:
          return {type: 'add_member', info: '女性编程日-全国群' + sex};
      }
    }
  }

  handler(userId, message, callback) {
    async.waterfall([
      (done) => {
        if (this.validate.check(message.type, this.realType) && message.text === 'q') {
          UserStatus.update({userId: userId}, {status: 'choice'}, (err) => {
            done(null, {text: constant.validate.info});
          });
        } else if (this.validate.check(message.type, this.realType)) {
          User.update({userId: userId}, {city: message.text}, done);
        } else {
          done(null, {text: constant.validate.err});
        }
      },
      (data, done) => {
        if (data.text) {
          done(null, data);
        } else {
          UserStatus.update({userId: userId}, {status: 'finish'}, (err) => {
            if (err) {
              done(err, null);
            }
            User.findOne({userId: userId}, done);
          });
        }
      }
    ], (err, data) => {
      if (err) {
        return callback(err, null);
      }
      if (data.text) {
        return callback(null, data.text);
      }
      return callback(null, this.showText(message.text, data.sex));
    });
  }
}

module.exports = InputCity;
