<style lang='stylus'>
@require '../../styles/cnuc/var/color.styl';

.nb-header {
  background: #DDD;
  background-size: 100% auto;
  background-position: center;
  position: relative;

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
    background: linear-gradient(rgba(#000, 0.3) 50%, rgba(#000, 0.5) 0%);
    background-size: 100% 5px;
  }

  .container {
    height: 300px;
    position: relative;
  }
}

.item-move {
  transition: transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.nb-aside{
  padding 24px 0
}
.nb-main{
  padding-top 24px
}
</style>
<template>
  <div>
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

    <div class="nb-header" :style="{'background-image': 'url(' + data.picUrl + ')'}">
      <div class="cover"></div>
      <div class="container">
        <!-- <ContentLoader>
          <rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
        </ContentLoader> -->
      </div>
    </div>
    <el-container class="container">
      <el-aside class="nb-aside">
        <div :class="{'is-fixed': fixed}">
          <transition name="el-fade-in-linear">
            <div class="build-box nb-card">
              <build v-if="data && data.name" :data="data" :process="process"></build>
            </div>
          </transition>
          <transition name="el-fade-in-linear">
            <process-list @click="handleClickProcesses" :active="processesActive" :data="processesList"></process-list>
          </transition>
        </div>
      </el-aside>
      <el-main class="nb-main">
        <div class="nb-card nb-timeline">
          <div class="nb-card__title">{{data.name}}</div>
          <build-desc class="nb-card" :data="descList"></build-desc>
          <div class="form">
            <el-form label-position="left" label-width="120px">
              <el-form-item label="建造过程（月）">
                <el-slider show-input :format-tooltip="processTooltip" v-model="processNum" :max="processes.length - 1"></el-slider>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="nb-card nb-form">
          <el-button @click="processDialog.visible = true">添加进度</el-button>
          <el-button @click="contributeDialog.visible = true">添加贡献</el-button>
        </div>
        <waterfall class="post-water" :line-gap="412" :watch="contributesActiveList">
          <waterfall-slot v-for="(item, index) in contributesActiveList" :key="index" @click="handleClickContribute(item)" :width="item.width" :height="item.height" :order="index">
            <post-item :data="item"></post-item>
          </waterfall-slot>
        </waterfall>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Waterfall from '@/components/lib/waterfall'
import WaterfallSlot from '@/components/lib/waterfall-slot'
import { ContentLoader } from 'vue-content-loader'
import { CONTRIBUTE_TYPE, CONTRIBUTE_TYPE_DETAIL } from '@/common/const/cnuc'
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
    ContentLoader,
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
      fixed: false,
      id: null,
      data: {},
      descList: [],
      token: null,
      contributes: [],
      contributesCount: {},
      processesActive: '效果图',
      contributesActiveList: [],
      processDialog: {
        visible: false
      },
      processNum: null,
      yearRange: [],
      process: {},
      processes: [],
      processesList: [
        {
          year: null
        },
        {
          year: null
        },
        {
          year: null
        },
        {
          year: null
        },
        {
          year: null
        },
        {
          year: null
        },
        {
          year: null
        }
      ],

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
    },
  },

  computed: {

  },

  async mounted() {
    window.addEventListener('scroll', this.handleScroll)
    const { id } = this.$route.params
    this.id = id
    const data = await BTL.building(id)

    const descList = [
      {
        name: '高度',
        value: `${data.height}米`
      },
      {
        name: '层数',
        value: `${data.layers}层`
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
    handleClickContribute(data) {
      console.log(data)
    },
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 64) {
        this.fixed = true
      } else {
        this.fixed = false
      }
    },
    initContributeActiveList(val) {
      this.contributesActiveList = []

      setTimeout(() => {
        this.contributesActiveList = this.contributes.filter(_ => _.key === val)
        console.log(this.contributesActiveList)
      }, 0)
      // setTimeout(() => {
      //   this.contributesActiveList[0]['show'] = true
      // }, 1000)

    },
    async initContribute() {
      const data = await BTL.buildingContribute(this.id)
      const count = {
        demo: 0,
        finish: 0
      }
      const list = []

      data.forEach(item => {
        const { date, type } = item
        const year = moment(date).format('YYYY')
        if (type === CONTRIBUTE_TYPE.DESIGN) {
          item.key = '效果图'
          count.demo = count.demo + 1
        } else {
          if (year > this.yearRange[1]) {
            item.key = '已建成'
            count.finish = count.finish + 1
          } else {
            item.key = year
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
          item.show = false
          list.push(item)
        }
      })

      console.log(list)

      this.contributes = list
      this.contributesCount = count
    },

    processTooltip(val) {
      if (this.processes[val]) {
        return this.processes[val]['viewDate']
      }
    },
    handleClickProcesses(data) {
      this.initContributeActiveList(data.year)
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
          basic: 0,
          layers: 0,
          seconds: 0,
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
          basic: 100,
          layers: this.processes[this.processes.length - 1]['layers'],
          seconds: this.processes[this.processes.length - 1]['seconds'],
          count: count['finish']
        })
      }

      setTimeout(() => {
        this.processesList = processesList
      }, 1000)
      this.initContributeActiveList('效果图')
    }
  }
}
</script>
