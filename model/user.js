/*创建数据库实体模型，存储用户个人信息*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
 userId: String,//存储微信用户的唯一标示
 name: String,//用户姓名
 city: String,//用户所在城市
 sex: String,//用户性别
 language: String//用户擅长的语言
});

module.exports = mongoose.model('User', UserSchema);