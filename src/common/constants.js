const BASE_ENV_URL = 'https://git.tezign.com/lihuawei/host/raw/master';

export const ENVS = [{
  name: '测试环境A-2+6',
  rawInfo: `${BASE_ENV_URL}/测试环境A-2+6`,
  hosts: ''
},{
  name: '测试环境B-3+1',
  rawInfo: `${BASE_ENV_URL}/测试环境B-3+1`,
  hosts: ''
},{
  name: '测试环境C-7+4',
  rawInfo: `${BASE_ENV_URL}/测试环境C-7+4`,
  hosts: ''
},{
  name: '测试环境D-8+5',
  rawInfo: `${BASE_ENV_URL}/测试环境D-8+5`,
  hosts: ''
},{
  name: '预发环境',
  rawInfo: `${BASE_ENV_URL}/预发环境`,
  hosts: ''
},];

export const ENV_MAP = ENVS.reduce((prev, curr, index) => {prev[curr.name] = curr; return prev;}, {});

const constants = {};

// 用户验证信息KEY值
constants.X_TOP_USER_ID = "X-Top-User-Id";
constants.X_TOP_TOKEN = "X-Top-Token";
constants.C_TOP_XTOKEN = "xtoptoken";
constants.C_TOP_XUID = "xtopuid";

constants.COOKIE_DOMAIN = 'top.tezign.com';
constants.API_ORIGIN = 'https://service.tezign.com';

export const FAVORITE_BUCKET = "favorite_bucket_";
constants.FAVORITE_BUCKET = FAVORITE_BUCKET;
export const FAVORITE_LIST = "favorite_list_";
constants.FAVORITE_LIST = FAVORITE_LIST;

export default constants;
