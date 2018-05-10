<style lang='stylus'>
@require '../../styles/cnuc/var/color.styl';

.nb-header {
  background: #DDD;
  background-size: 100% auto;
  background-position: center;
  position: relative;
  height: 300px;

  &__title {
    position: absolute;
    bottom: 130px;
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
    position: relative;
  }
}

.post-water {
  margin: 0 -12px;
  margin-top: -12px;
}
</style>
<template>
  <div class="container">
    <el-dialog title="进度" :visible.sync="processDialog.visible">
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="processDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddProcess">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加贡献" width="600px" :visible.sync="contributeDialog.visible">
      <el-form :model="contribute" label-width="100px">
        <el-form-item label="图片">
          <el-upload :on-success="uploadSuccess" class="upload-demo" :data="{'token': token}" drag action="https://upload.qiniup.com">
            <img v-if="contribute.picUrl" :src="contribute.picUrl" class="avatar">
          </el-upload>
        </el-form-item>

        <el-form-item label="类型">
          <el-radio-group v-model="contribute.type">
            <el-radio v-for="(item, index) in CONTRIBUTE_TYPE_DETAIL" :key="index" :label="item.id" border>{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="contribute.type === CONTRIBUTE_TYPE.PROCESS" label="时间">
          <el-date-picker v-model="contribute.date" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="进度简介">
          <el-input type="textarea" :rows="1" placeholder="进度简介" v-model="contribute.content">
          </el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="contributeDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddContribute">确 定</el-button>
      </span>
    </el-dialog>

    <el-container>
      <el-aside>
        <div class="nb-aside">
          <h1 class="nb-aside__title">{{data.name}}</h1>
          <build v-if="data && data.name" :data="data" :process="process"></build>
          <build-desc :data="descList"></build-desc>
          <process-list @click="handleClickProcesses" :active="processesActive" :data="processesList"></process-list>
        </div>
      </el-aside>
      <el-main>
        <div class="nb-main">
          <!-- <div class="nb-card nb-header" :style="{'background-image': 'url(' + data.picUrl + ')'}">
            <div class="cover"></div>
          </div> -->
          <div class="nb-card nb-timeline">
            <div class="nb-card__title">建设进度</div>
            <div class="form">
              <el-slider :format-tooltip="processTooltip" v-model="processNum" :max="processes.length - 1"></el-slider>
            </div>
          </div>
          <div class="nb-card nb-form">
            <el-button @click="processDialog.visible = true">添加进度</el-button>
            <el-button @click="contributeDialog.visible = true">添加贡献</el-button>
          </div>
          <waterfall class="post-water" :line-gap="412" :watch="contributes">
            <waterfall-slot :width="item.width" :height="item.height" v-for="(item, index) in contributes" :order="index" :key="index">
              <post-item :data="item"></post-item>
            </waterfall-slot>
          </waterfall>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Waterfall from '@/components/lib/waterfall'
import WaterfallSlot from '@/components/lib/waterfall-slot'

import { CONTRIBUTE_TYPE, CONTRIBUTE_TYPE_DETAIL } from '@/common/const'
import BTL from '@/common/api/btl'
import Build from '@/components/Build/Build'
import BuildDesc from '@/components/Build/BuildDesc'
import ProcessList from '@/components/Process/ProcessList'
import PostList from '@/components/Post/PostList'
import PostItem from '@/components/Post/PostItem'
import moment from 'moment'
import { thisExpression } from 'babel-types';
export default {
  components: {
    Build,
    BuildDesc,
    ProcessList,
    PostList,
    PostItem,
    Waterfall,
    WaterfallSlot
  },
  props: {
  },

  data() {
    return {
      wHeight: null,
      CONTRIBUTE_TYPE,
      CONTRIBUTE_TYPE_DETAIL,
      id: null,
      data: {},
      descList: [],
      token: null,
      contributes: [],
      contributesCount: {},
      processesActive: 'demo',
      processDialog: {
        visible: false
      },
      processNum: null,
      yearRange: [],
      process: {},
      processes: [],
      processesList: [],

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

    const descList = [
      {
        name: '高度',
        value: `${data.height}米`
      },
      {
        name: '层数',
        value: `${data.layers}层`
      },
      {
        name: '设计',
        value: `${data.company}`
      }
    ]
    this.descList = descList

    this.data = data
    await this.initProcesses(data.processes)
    await this.initContribute()

    this.initProcessesList()

    const { uploadToken } = await BTL.uploadToken()
    this.token = uploadToken
  },

  methods: {
    async initContribute() {
      const data = await BTL.buildingIdContribute(this.id)
      const count = {
        demo: 0,
        finish: 0
      }
      const list = []

      data.forEach(item => {
        const { date, type } = item
        const year = moment(date).format('YYYY')
        if (type === 1) {
          count.demo = count.demo + 1
        } else {
          if (year > this.yearRange[1]) {
            count.finish = count.finish + 1
          } else {
            if (count[year]) {
              count[year] = count[year] + 1
            } else {
              count[year] = 1
            }
          }
        }

        const image = new Image()
        image.src = item.picUrl
        image.onload = function () {
          const { width, height } = image
          item.width = width
          item.height = height + 58
          list.push(item)
        }
      })

      this.contributes = list
      this.contributesCount = count
      this.wHeight = document.body.clientHeight
    },

    processTooltip(val) {
      if (this.processes[val]) {
        return this.processes[val]['viewDate']
      }
    },
    handleClickProcesses(data) {
      this.processesActive = data.year
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
      const startYear = moment(data[0]['date']).format('YYYY')
      const endYear = moment(data[data.length - 1]['date']).format('YYYY')

      this.descList.push({
        name: '周期',
        value: `${startYear}年 - ${endYear}年`
      })


      data.forEach((item, index) => {
        if (index > 0) {
          const { date, basic, layers, seconds, } = item
          const { date: bDate, basic: bBasic, layers: bLayers, seconds: bSeconds } = data[index - 1]
          const diff = moment(date).diff(moment(bDate), 'month')
          const bBasicStep = (basic - bBasic) / diff
          const bLayersStep = (layers - bLayers) / diff
          const bSecondsStep = (seconds - bSeconds) / diff

          for (let i = 1; i < diff; i++) {
            const _date = moment(bDate).add(i, 'month').format('YYYY年MM月01日')
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
      this.yearRange = [startYear, endYear]
      this.processes = list
    },

    initProcessesList() {
      const processesList = []
      const { contributesCount: count, processes } = this


      if (count['demo'] > 0) {
        processesList.push({
          year: '效果图',
          count: count['demo']
        })
      }
      const map = new Set()

      processes.forEach(item => {
        const { viewDate } = item
        const year = moment(viewDate, 'YYYY年MM月DD日').format('YYYY')
        item.year = year
        item.count = count[year] || 0

        if (!map.has(year)) {
          processesList.push(item)
          map.add(year)
        }
      })

      if (count['finish'] > 0) {
        processesList.push({
          year: '已建成',
          count: count['finish']
        })
      }
      console.log(processesList)

      this.processesList = processesList



    }

  }
}
</script>
