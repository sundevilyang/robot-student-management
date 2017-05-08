/*创建数据库实体模型，存储群里的用户对话题的讨论*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicAnswerSchema = new Schema({
  answer: String,//讨论内容
  userId: String,//内容发出者
  topicId: String//某一个话题
});

module.exports = mongoose.model('TopicAnswer', TopicAnswerSchema);