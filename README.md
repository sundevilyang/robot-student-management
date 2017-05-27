
## 运行方式
1. 检查 config/default.json 中参数配置，确保能连接到指定的数据库
2. 在命令行中执行如下命令
   bash```
   npm start
   ```
3.若数据库连接失败，请确保本地数据库服务开启
    bash```
        service mongod start
    ```

## 接口测试
1. 在postman测试接口： POST http://localhost:3000/wechat
    body传参

    用户和机器人私聊参数形式

    ```
        {
	        "sender_puid":"gfg",
	        "message":{"type":"Text", "text": "北京", "file_path":"dfghjkj"}
        }
    ```
    用户和机器人群聊参数形式
    ```
        {
    	    "sender_puid":"gfg",
    	    "message":{"type":"Text", "text": "北京", "file_path":"dfghjkj"},
            "member_puid":"rfg",
        }
    ```
2. 微信测试 ： 加机器人好友并且功能正常使用

## 接口返回数据

       {
          type: String, //type的三种类型：['Text', 'Null', add_member']
          info: String
       }

a. type为Text，info为向用户展示的信息，表示直接向用户发送文字信息

b. type为Null，info为空字符串，表示什么也不用做

c. type为add_member，info为群名，表示将用户拉进群

## 文件结构

1. app.js:接口的入口文件

2. wechat-status文件夹下的文件表示用户或者群的不同状态

** 每个状态下的handler函数做的处理就是存储数据，更新用户或群的状态，返回数据三个模块

*私聊状态变更流程*
* 我要当学员：info -> choice -> information -> input_gender -> input_city -> finish -> change -> choice
* 我要当助教：info -> choice -> assistant -> language -> assistant_city -> finish -> change -> choice
* 我想合作：info -> choice -> finish -> change -> choice

*群聊状态变更流程*
* 创建主题收集回答：group -> topic -> collect -> topic

3. model文件夹下的文件表示数据库模型实体类

用户信息类：包括用户通过机器人完善的个人信息

用户或群状态类：包括用户或群的唯一标识和用户或群当前的状态

话题类：包括某个人在某个群发表的主题内容

话题回答类：包括某个人对某个主题的回答内容


4. tool文件下的文件表示一些用于验证用户输入格式或正确性的方法

5. config文件夹下的文件包括表示一些常量的文件和默认的数据库配置的文件

