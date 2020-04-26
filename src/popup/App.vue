<template>
  <div id="app" class="popup-page">
    <h2>
      <span>老干爹HOSTS切换器</span>
      <el-switch v-model="enable" :active-text="$t('Enable')"></el-switch>
    </h2>

    <div class="mt-10">
        <div v-for="env in ENVS" class="mt-4">
          <el-radio :label="env.name" v-model="selectedEnv">{{env.name}}</el-radio>
        </div>
    </div>
  </div>
</template>

<style>
  .mt-4 {
    margin-top: 4px;
  }
  .mt-10 {
    margin-top: 10px;
  }
  .mt-20 {
    margin-top: 20px;
  }
</style>

<script>
import { Storage, setProxy, decodeRules} from '../utils'
import {ENVS, ENV_MAP} from '../common/constants'
import http from '../common/http'
import RuleList from '../components/list'

const tmp_hosts = `
# ------- 大平台 env 2 ----------------------
39.105.117.47 service.tezign.com
39.105.117.47 tezign.com
39.105.117.47 www.tezign.com
39.105.117.47 m.tezign.com
39.105.117.47 pro.tezign.com
39.105.117.47 top.tezign.com
39.105.117.47 cal.tezign.com
39.105.117.47 event.tezign.com
39.105.117.47 job.tezign.com
39.105.117.47 cal.tezign.com
39.105.117.47 demo.tezign.com
39.105.117.47 mind.tezign.com

# ------- 数据智能 env 6 ----------------------
47.94.216.194 itg-static.tezign.com
47.94.216.194 vms-service.tezign.com

47.94.216.194 unilever.tezign.com
47.94.216.194 unilever-top.tezign.com
47.94.216.194 alipurchase.tezign.com
47.94.216.194 alipurchase-top.tezign.com
47.94.216.194 express.tezign.com
47.94.216.194 express-top.tezign.com
47.94.216.194 alibaba.tezign.com
47.94.216.194 vms-t2.tezign.com
47.94.216.194 vms-t2-top.tezign.com
47.94.216.194 ef-test.tezign.com
47.94.216.194 ef-test-top.tezign.com
47.94.216.194 nio.tezign.com
47.94.216.194 nio-top.tezign.com

47.94.216.194 dam
47.94.216.194 dsp
47.94.216.194 general
47.94.216.194 h5ubt-logserver
47.94.216.194 message
47.94.216.194 mini-admin
47.94.216.194 message
47.94.216.194 mini-app
47.94.216.194 ms-alipurchase
47.94.216.194 pdf2img
47.94.216.194 portfolio
47.94.216.194 product
47.94.216.194 rule-checker
47.94.216.194 search
47.94.216.194 smart
47.94.216.194 tenant
47.94.216.194 tenant-manager
47.94.216.194 top2
47.94.216.194 tracking
47.94.216.194 user
47.94.216.194 web-service

# ------- 公共资源 ----------------------
# ES
123.57.137.216 tech-esv5-dev.tezign.com

#数据中台
123.57.23.218 data-analysis.tezign.com
# 搜多多
123.57.23.218 search.tezign.com
# 服务注册中心
172.17.58.212 eureka-server
`;

export default {
  name: 'app',
  components: {
    RuleList,
  },
  data() {
    let isEnable = Storage.get('enable')
    let selectedEnv = Storage.get('selectedEnv')
    return {
      ENVS,
      selectedEnv: selectedEnv || ENVS[0].name,
      enable: isEnable === '' ? true : isEnable,
    }
  },

  refreshEnv() {
    const {rawInfo} = ENV_MAP[this.selectedEnv];
    http.get(rawInfo).then(hosts => {
      console.log('------>>>> hosts \n', hosts);

      let hostInfos = decodeRules(tmp_hosts);
      hostInfos.forEach(item => {
        item.enable = true;
        const tmp = item.domain + ':443';
        item.domain = item.target;
        item.target = tmp;
      });
      console.log('------>>>> hosts \n', hosts);

      setProxy(true, hostInfos);
    });
  },

  watch: {
    selectedEnv() {
      Storage.set('selectedEnv', this.selectedEnv);

      // 不启用
      if(!this.enable) {
        return;
      }

      // 启用
      const {rawInfo} = ENV_MAP[this.selectedEnv];
      http.get(rawInfo).then(hosts => {
        console.log('------>>>> hosts \n', hosts);

        let hostInfos = decodeRules(tmp_hosts);
        hostInfos.forEach(item => {
          item.enable = true;
          const tmp = item.domain + ':443';
          item.domain = item.target;
          item.target = tmp;
        });
        console.log('------>>>> hostInfos \n', hostInfos);

        setProxy(true, hostInfos);
      });
    },

    enable() {
      // 不启用
      if(!this.enable) {
        setProxy(false, []);
        return;
      }

      // 启用
      const {rawInfo} = ENV_MAP[this.selectedEnv];
      http.get(rawInfo).then(hosts => {
        console.log('------>>>> hosts \n', hosts);

        let hostInfos = decodeRules(tmp_hosts);
        hostInfos.forEach(item => {
          item.enable = true;
          const tmp = item.domain + ':443';
          item.domain = item.target;
          item.target = tmp;
        });
        console.log('------>>>> hostInfos \n', hostInfos);

        setProxy(true, hostInfos);
      });
    },
  },
  methods: {
    gotoSettingPage() {
      window.open('/setting.html')
    },
  },
}
</script>

<style lang='scss'>
.popup-page { padding: 20px; min-width: 600px; background: $white;
  .el-button--mini { padding: 5px 10px; }
}
</style>
