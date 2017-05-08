/*用户加机器人好友状态：数据库创建用户新状态，并给用户返回文本信息*/
const UserStatus = require('../model/userStatus');

class Info {
  showText() {
    return {
      type: 'Text', info: `您好，请选择您的角色[请回复数字]:
    1.我想当学员
    2.我想当助教
    3.我想合作`
    };
  }

  handler(userId, message, callback) {
    UserStatus.create({userId: userId, status: 'choice'}, (err) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, this.showText());
    });
  }
}

module.exports = Info;
