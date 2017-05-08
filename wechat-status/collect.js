const UserStatus = require('../model/userStatus');
const TopicAnswer = require('../model/topicAnswer');
const GroupTopic = require('../model/groupTopic');
const constant = require('../config/constant');
const Validate = require('../tool/validate');
const async = require('async');

class Collect {
  constructor() {
    this.validate = new Validate();
    this.realType = [{type: 'Text'}, {type: 'Picture'}, {type: 'Attachment'},
      {type: 'Recording'}, {type: 'Video'}];
  }

  showText() {
    return {type: 'Null', info: ''};
  }

  handler(groupId, message, userId, callback) {
    async.waterfall([
      (done) => {
        if (this.validate.check(message.type, this.realType)) {
          GroupTopic.find({groupId}, done);
        } else {
          done(null, {text: constant.validate.incorrect});
        }
      },
      (data, done) => {
        if (data.text) {
          done(null, data);
        } else {
          if (message.type === 'Text' && message.text === '#') {
            UserStatus.update({userId: groupId}, {status: 'topic'}, (err)=> {
              done(null, {text: constant.validate.end})
            });
          } else {
            const topicId = data[data.length - 1]._id;
            const answer = message.type === 'Text' ? message.text : message.file_path;
            TopicAnswer.create({answer: answer, topicId: topicId, userId: userId}, done);
          }
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

module.exports = Collect;