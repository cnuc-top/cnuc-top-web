<style lang='stylus'>
.nb-form {
  &--process {
    width: 400px;
  }
}
</style>
<template>

  <div class="container">
    <div class="nb-header">
      {{data.name}}
    </div>

    <el-container>
      <el-aside>
        <build v-if="data && data.name" :data="data" :process="processForm"></build>
      </el-aside>

      <el-main>
        <div class="nb-main">
          <!-- <el-button>我要贡献</el-button> -->
          <div class="nb-form--process">
            <el-button @click="handleClickAddProcess">更新进度</el-button>
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
          </div>

          <div class="nb-form--contribute">
            <el-button @click="handleClickAddContribute">提交更新</el-button>
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
          </div>

          <!-- <nb-process :data="data.processes"></nb-process> -->

        </div>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import { CONTRIBUTE_TYPE_DETAIL } from '@/common/const'
import BTL from '@/common/api/btl'
import Build from '@/components/Build/Build'
import NbProcess from '@/components/NbProcess/NbProcess'
export default {
  components: { Build, NbProcess },

  props: {
  },

  data() {
    return {
      CONTRIBUTE_TYPE_DETAIL,
      id: null,
      data: {},
      token: null,
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
    this.data = await BTL.buildingId(id)

    const { uploadToken } = await BTL.uploadToken()
    this.token = uploadToken
  },

  methods: {
    async handleClickAddProcess() {
      const form = this.processForm
      form.bid = this.id
      const ret = await BTL.addProcess(form)
    },
    async handleClickAddContribute() {
      const form = this.contribute
      form.bid = this.id
      const ret = await BTL.addContribute(form)
    },
    uploadSuccess(res) {
      this.contribute.picUrl = `http://cdn.cnuc.top/${res.hash}`
    }
  }
}
</script>
