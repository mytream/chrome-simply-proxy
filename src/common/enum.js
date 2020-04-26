const ENUM = {};

// 通用错误码
ENUM.HTTP_CODE = {
  BAD_REQUEST: { code: 400, name: '非法参数' },
  NOT_FOUND: { code: 404, name: '该服务接口不存在' },
  SUCCESS: { code: 200, name: '请求成功' },
  EXCEPTION: { code: 500, name: '服务器异常' },
};
ENUM.RESULT_CODE = {
  BAD_REQUEST: { code: '-2', name: '您请求的参数不正确' },
  NOT_FOUND: { code: '-1', name: '该服务接口不存在' },
  SUCCESS: { code: '0', name: '请求成功' },
  EXCEPTION: { code: '1', name: '服务接口发生异常' },
  FORBIDDEN_OPERATION: { code: '2', name: '没有权限访问该接口' },
  NOT_BE_DESIGNER: { code: '3', name: '只有设计师才能访问该接口' },
  NOT_BE_CUSTOMER: { code: '4', name: '只有客户才能访问该接口' },
  ILLEGAL_USER: { code: '5', name: '这是一个非法的用户' },
  ILLEGAL_PROJECT: { code: '6', name: '这是一个非法的项目' },
};
ENUM.COMMON_CODE = {
  DATA_ERROR: {
    code: 'DATA-ERROR',
    name: '数据解析异常',
  },
  FETCH_ERROR: {
    code: 'FETCH-ERROR',
    name: '请求异常',
  },
};

export default ENUM;
