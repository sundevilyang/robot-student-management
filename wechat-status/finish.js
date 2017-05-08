const UserStatus = require('../model/userStatus');

class finish {

  showText() {
    return {type: 'Text', info: '您已完成信息录入，请输入英文字母q退出'};
  }

  handler(userId, message, callback) {
      UserStatus.update({userId: userId}, {status: 'change'}, (err) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, this.showText());
      });
    }
}

module.exports = finish;
