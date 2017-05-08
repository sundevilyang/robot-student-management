const UserStatus = require('../model/userStatus');
const User = require('../model/user');
const constant = require('../config/constant');
const Validate = require('../tool/validate');
const async = require('async');

class TutorCity {
  constructor() {
    this.validate = new Validate();
    this.realType = [{type: 'Text'}];
  }

  showText(city) {
    switch (city) {
      case '成都': return {type: 'add_member', info: '成都教练群'};
      case '北京': return {type: 'add_member', info: '北京教练群'};
      case '深圳': return {type: 'add_member', info: '深圳教练群'};
      case '上海': return {type: 'add_member', info: '上海教练群'};
      case '西安': return {type: 'add_member', info: '西安教练群'};
      case '武汉': return {type: 'add_member', info: '武汉教练群'};
      case '重庆': return {type: 'add_member', info: '重庆教练群'};
      case '广州': return {type: 'add_member', info: '广州教练群'};
      case '南京': return {type: 'add_member', info: '南京教练群'};
      case '杭州': return {type: 'add_member', info: '杭州教练群'};
      default: return {type: 'add_member', info: '全国教练群'};
    }
  }

  handler(userId, message, callback) {
    async.waterfall([
      (done) => {
        if (this.validate.check(message.type, this.realType) && message.text === 'q'){
          UserStatus.update({userId: userId},{status: 'choice'}, (err) => {
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
          UserStatus.update({userId: userId},{status:'finish'},done);
        }
      }
    ],(err, data) => {
      if (err) {
        return callback(err, null);
      }
      if (data.text) {
        return callback(null, data.text);
      }
      return callback(null, this.showText(message.text));
    });
  }
}

module.exports = TutorCity;
