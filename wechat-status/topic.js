const UserStatus = require('../model/userStatus');
const GroupTopic = require('../model/groupTopic');
const constant = require('../config/constant');
const Validate = require('../tool/validate');
const async = require('async');

class Topic {
  constructor() {
    this.validate = new Validate();
  }

  showText() {
    return {type: 'Text', info: '主题创建成功，宝宝们开始畅所欲言吧'};
  }

  handler(groupId, message, userId, callback) {
    async.waterfall([
      (done) => {
        if (message.type === 'Text' && message.text.match(/^#/)) {
          GroupTopic.create({topic: message.text, groupId: groupId, userId: userId}, done);
        } else {
          done(null, {text: constant.validate.no});
        }
      },
      (data, done) => {
        if (data.text) {
          done(null, data);
        } else {
          UserStatus.update({userId: groupId}, {status: 'collect'}, done);
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

module.exports = Topic;