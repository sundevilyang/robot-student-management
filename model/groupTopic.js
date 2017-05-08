/*创建数据库实体模型，存储群里的话题*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupTopicSchema = new Schema({
  topic: String,//话题内容
  userId: String,//发表话题的人
  groupId: String//话题所属群
});

module.exports = mongoose.model('GroupTopic', GroupTopicSchema);