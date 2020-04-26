import _ from 'lodash';
import ENUM from './enum';
import constants from '../common/constants';
import chromep from 'chrome-promise';

function http(url, options) {
  // info 由于使用公用的 login 页面 此项目不会调用 login 接口 && url.indexOf('/login') !== -1
  // return chromep.cookies.getAll({ domain: constants.COOKIE_DOMAIN }).then((cookies) => {
  //   let token, uid;
  //   _.forEach(cookies, (cookie) => {
  //     if (cookie.name === constants.C_TOP_XTOKEN) token = cookie.value;
  //     if (cookie.name === constants.C_TOP_XUID) uid = cookie.value;
  //   });
  //
  //   token && (options.headers[constants.X_TOP_TOKEN] = token);
  //   uid && (options.headers[constants.X_TOP_USER_ID] = uid);
  //
  //   // 如果没有登录，则无需请求
  //   if(!token || !uid){
  //     return;
  //   }
  //
  //   options.headers["service-name"] = 'top2';
    return fetch(url, options).then((response) => {
      // HTTP请求异常
      if (response.status !== ENUM.HTTP_CODE.SUCCESS.code) {
        http.trigger(response.status);
        throw response;
      }

      // 业务数据正常返回
      return response.text().then((res) => {
        // 业务逻辑
        // if (res.code !== ENUM.RESULT_CODE.SUCCESS.code) {
        //   http.trigger(res.code);
        //   throw res;
        // }

        return res;
      }, (err) => {
        http.trigger(ENUM.COMMON_CODE.DATA_ERROR.code);
        throw err;
      });
    }, (err) => {
      http.trigger(ENUM.COMMON_CODE.FETCH_ERROR.code);
      throw err;
    });
  // });
}

http.trigger = function(err) {
  console.error('请求异常', err);
};

http.defaults = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
};

http.get = function (url, options) {
  options = options || {};
  options.method = 'GET';
  options = _.merge({}, http.defaults, options);
  return http(url, options);
};

http.post = function (url, data, options) {
  options = options || {};
  options.body = JSON.stringify(data);
  options.method = 'POST';
  options = _.merge({}, http.defaults, options);
  return http(url, options);
};

export default http;
