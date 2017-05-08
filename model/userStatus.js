/*创建数据库实体模型，存储用户或者群当前的状态*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserStatusSchema = new Schema({
 userId: String,//群或者用户的唯一标识
 status: String,//群或者用户当前的状态
});

module.exports = mongoose.model('UserStatus', UserStatusSchema);