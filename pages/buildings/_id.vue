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
  padding: 30px 0;
  padding-bottom: 100px;

  &__title {
    font-size: 30px;
  }
}

.el-aside {
  position: relative;
  z-index: 1;
  background: #FFF;
  margin-top: -30px;
  padding: 10px 30px;
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

    <el-dialog title="提示" :visible.sync="contributeDialog.visible">
      <el-form :model="contribute" label-width="100px">
        <el-form-item label="图片">
          <el-upload :on-success="uploadSuccess" class="upload-demo" :data="{'token': token}" drag action="https://upload.qiniup.com">
            <img v-if="contribute.picUrl" :src="contribute.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="contribute.content">
          </el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker v-model="contribute.date" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="contribute.type" size="small">
            <el-radio v-for="(item, index) in CONTRIBUTE_TYPE_DETAIL" :key="index" :label="item.id" border>{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="contributeDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddContribute">确 定</el-button>
      </span>
    </el-dialog>

    <div class="nb-header">
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
            {{process}}
          </div>
        </el-aside>

        <el-main>
          <div class="nb-main">
            <el-button @click="processDialog.visible = true">添加进度</el-button>
            <el-button @click="contributeDialog.visible = true">添加贡献</el-button>
            <process-list @click="handleClickProcesses" :data="processes"></process-list>
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

          console.log(diff)

          const bBasicStep = (basic - bBasic) / diff
          const bLayersStep = (layers - bLayers) / diff
          const bSecondsStep = (seconds - bSeconds) / diff

          for (let i = 1; i < diff; i++) {
            const _date = moment(bDate).add(i, 'month').format('YYYY-MM')
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

      console.log(list)
      this.processes = list

    }
  }
}
</script>
