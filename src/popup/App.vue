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
import { Storage } from '../utils'
import {ENVS} from '../common/constants'
import RuleList from '../components/list'

export default {
  name: 'app',
  components: {
    RuleList,
  },
  data() {
    let isEnable = Storage.get('enable')
    return {
      ENVS,
      selectedEnv: ENVS[0].name,
      enable: isEnable === '' ? true : isEnable,
    }
  },
  watch: {
    enable() {
      this.$refs.list.setProxy(this.enable)
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
