<style lang='stylus'>
@require '../../styles/cnuc/var/color.styl';

.nb-form {
  &--process {
    width: 400px;
    background: #EEE;
  }
}

.nb-header {
  background: #DDD;
  background-size: 100% auto;
  background-position: center;
  overflow: hidden;
  position: relative;

  &__title {
    position: absolute;
    bottom: 300px;
    left: 0px;
    z-index: 100;
    color: #FFF;
    font-size: 35px;
    letter-spacing: 5px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
  }

  .cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(#333, 0.4) 50%, rgba(#333, 0.5) 0%);
    background-size: 100% 5px;
  }

  .container {
    height: 500px;
    position: relative;
  }
}

.el-aside {
  position: relative;
  height: auto;
  z-index: 1;
  background: #FFF;
  margin-top: -250px;
  padding: 30px 10px;
  border: 2px solid $color-primary;
}
</style>
<template>
  <div>
    <el-dialog title="提示" :visible.sync="processDialog.visible">
      <div class="nb-form--process">
        <el-form :model="processForm" label-width="100px">
          <el-form-item label="基础结构">
            <el-slider v-model="processForm.basic"></el-slider>
          </el-form-item>
          <el-form-item label="主体结构">
            <el-slider v-model="processForm.layers" :min="0" :max="data.layers"></el-slider>
          </el-form-item>
          <el-form-item label="二次结构">
            <el-slider v-model="processForm.seconds" :min="0" :max="data.layers"></el-slider>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker v-model="processForm.date" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <build v-if="data && data.name" :data="data" :process="processForm"></build>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="processDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddProcess">确 定</el-button>
      </span>
    </el-dialog>

    <div class="nb-header" :style="{'background-image': 'url(' + data.picUrl + ')'}">
      <div class="cover"></div>
      <div class="container">
        <div class="nb-header__title">
          {{data.name}}
        </div>
      </div>
    </div>

    <div class="container">
      <el-container>
        <el-aside>
          <div class="nb-aside">
            <build v-if="data && data.name" :data="data" :process="process"></build>
          </div>
        </el-aside>
        <el-main>
          <div class="nb-main">
            <el-slider :format-tooltip="processTooltip" v-model="processNum" :max="processes.length - 1"></el-slider>
            <el-button @click="processDialog.visible = true">添加进度</el-button>
            <el-button @click="contributeDialog.visible = true">添加贡献</el-button>
            <!-- <process-list @click="handleClickProcesses" :data="processes"></process-list> -->
            <post-list :data="contributes"></post-list>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import { CONTRIBUTE_TYPE_DETAIL } from '@/common/const'
import BTL from '@/common/api/btl'
import Build from '@/components/Build/Build'
import ProcessList from '@/components/Process/ProcessList'
import PostList from '@/components/Post/PostList'
import moment from 'moment'
export default {
  components: { Build, ProcessList, PostList },

  props: {
  },

  data() {
    return {
      CONTRIBUTE_TYPE_DETAIL,
      id: null,
      data: {},
      token: null,
      contributes: [],
      processDialog: {
        visible: false
      },
      processNum: null,
      process: {},
      processes: [],

      contributeDialog: {
        visible: false
      },
      processForm: {
        basic: 0,
        layers: 0,
        seconds: 0,
        date: null
      },
      contribute: {
        type: 1,
        picUrl: null,
        date: null,
        content: null
      }
    }
  },

  watch: {
    processNum: function (val) {
      this.process = this.processes[val]
    }
  },

  computed: {},

  async mounted() {
    const { id } = this.$route.params
    this.id = id
    const data = await BTL.buildingId(id)

    this.data = data
    this.initProcesses(data.processes)
    this.contributes = await BTL.buildingIdContribute(id)

    const { uploadToken } = await BTL.uploadToken()
    this.token = uploadToken
  },

  methods: {
    processTooltip(val) {
      if (this.processes[val]) {
        return this.processes[val]['viewDate']
      }
    },
    handleClickProcesses(data) {
      this.process = data
    },
    async handleAddProcess() {
      const form = this.processForm
      form.bid = this.id
      const ret = await BTL.addProcess(form)
    },
    async handleAddContribute() {
      const form = this.contribute
      form.bid = this.id
      const ret = await BTL.addContribute(form)
    },
    uploadSuccess(res) {
      this.contribute.picUrl = `http://cdn.cnuc.top/${res.hash}`
    },

    initProcesses(data) {
      const list = []
      data.forEach((item, index) => {

        if (index > 0) {
          const { date, basic, layers, seconds, } = item
          const { date: bDate, basic: bBasic, layers: bLayers, seconds: bSeconds } = data[index - 1]
          const diff = moment(date).diff(moment(bDate), 'month')
          const bBasicStep = (basic - bBasic) / diff
          const bLayersStep = (layers - bLayers) / diff
          const bSecondsStep = (seconds - bSeconds) / diff

          for (let i = 1; i < diff; i++) {
            const _date = moment(bDate).add(i, 'month').format('YYYY年MM月')
            list.push({
              viewDate: _date,
              basic: Math.round(bBasic + bBasicStep * i),
              layers: Math.round(bLayers + bLayersStep * i),
              seconds: Math.round(bSeconds + bSecondsStep * i)
            })
          }
          list.push(item)
        } else {
          list.push(item)
        }
      })
      this.processes = list
    }
  }
}
</script>
