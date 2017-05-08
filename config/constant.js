const constant = {
  httpCode: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    NOT_FOUND: 404,
    BAD_REQUEST: 400
  },
  validate: {
    info: {
      type: 'Text', info: `请选择您的角色[请输入序号]:
    1.我要当学员
    2.我要当助教
    3.我想合作`
    },
    err: {type: 'Text', info: '输入格式有误,请按要求重新输入；或输入q返回原点重新开始'},
    incorrect: {type: 'Text', info: '输入格式有误'},
    no: {type: 'Null', info: ''},
    end: {type: 'Text', info: '主题讨论终止'}
  }
};
module.exports = constant;
