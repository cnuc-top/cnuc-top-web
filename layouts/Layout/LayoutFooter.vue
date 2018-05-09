<style lang='stylus'>
@require '../../styles/cnuc/var/color.styl';

.chart {
  width: 100%;
  height: 400px;

  .inner {
    height: 400px;
  }
}

.wxapp-list {
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  transition: 0.15s;

  .is-blur {
    filter: blur(3px);
  }

  &-item {
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    padding: 16px;
    margin: 0 20px;
    border: 1px solid rgba(0, 0, 0, 0);
    transition: 0.15s;
    cursor: pointer;

    &:hover {
      filter: blur(0px);
      border-color: $color-primary;
      box-shadow: 0 0 0.5em hsla(0, 0%, 0%, 0.25), 0 0.25em 0.25em hsla(0, 0%, 0%, 0.1);
    }

    &__img {
      width: 100px;
    }

    &__name {
      font-size: 12px;
      color: $color-light-grey-s;
      margin-top: 8px;
    }

    &__desc {
      font-size: 15px;
      color: $color-grey;
    }
  }
}

.footer {
  .logo-text {
    margin: 0 auto;

    svg {
      height: 30px;
    }

    path {
      fill: #444 !important;
    }
  }
}

.footer {
  margin-top: 32px;
  background: #f6f5f2;

  .nav-list {
    margin: 0px;
    padding: 0px;

    .nav-item {
      list-style: none;
      color: #777;

      &.is-title {
        font-weight: 600;
        margin-bottom: 10px;
      }
      margin-bottom: 5px;

      a {
        text-decoration: none;
        transition: 0.15s;
        font-size: 14px;

        &:hover {
          color: $color-primary;
        }
      }
    }
  }

  &__main {
    padding: 20px 0;
  }

  &__end {
    padding: 30px 0;
    color: #666;
    font-size: 13px;
    background: #edede9;
  }
}
</style>
<template>
  <div>

    <div class="footer">
      <div class="footer__main">
        <div class="container">

          <el-row :gutter="20">
            <el-col :span="6">

              <ul class="nav-list">
                <li class="nav-item is-title">高楼时间轴</li>
                <li class="nav-item">
                  <a>宁波</a>
                </li>
                <li class="nav-item">
                  <a>上海</a>
                </li>
                <li class="nav-item">
                  <a>北京</a>
                </li>
                <li class="nav-item">
                  <a>深圳</a>
                </li>
              </ul>
            </el-col>
            <el-col :span="6">
              <ul class="nav-list">
                <li class="nav-item is-title">城建论坛</li>
                <li class="nav-item">
                  <a>宁波城建论坛</a>
                </li>
                <li class="nav-item">
                  <a>高楼迷</a>
                </li>
                <li class="nav-item">
                  <a>嘉兴城建论坛</a>
                </li>
              </ul>
            </el-col>
            <el-col :span="6">
              <logo-text></logo-text>
            </el-col>
            <el-col :span="6">
            </el-col>
          </el-row>

          <!-- <div class="wxapp-list">
        <el-tooltip effect="dark" :content="item.name" placement="bottom" v-for="(item, index) in qrList" :key="index">
          <div :class="{ 'is-blur': qrHover}" class="wxapp-list-item" @mouseenter="qrEnter" @mouseleave="qrLeave">
            <img class="wxapp-list-item__img" :src="item.picUrl" :alt="item.desc">
            <div class="wxapp-list-item__desc">{{item.desc}}</div>
          </div>
        </el-tooltip>
      </div> -->
        </div>
      </div>
      <div class="footer__end">
        <div class="container">
          <div class="footer__text">
            ©2018 CNUC · 第一城建网
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LogoText from './LogoText'
export default {
  components: { LogoText },

  props: {
  },

  data() {
    return {
      qrHover: false,
      navList: [
        {
          name: '一起神奇吧',
          url: 'http://www.17shenqi.com'
        },
        {
          name: '一起迪士尼',
          url: 'http://www.17disney.com'
        }
      ],
      qrList: [
        {
          name: '微信小程序',
          desc: '17俱乐部',
          picUrl: '//17disney.com/static/wxapp_17disney.jpg'
        },
        {
          name: '公众号',
          desc: '一起神奇',
          picUrl: '//17disney.com/static/wx_17shenqi.jpg'
        },
        {
          name: '微信小程序',
          desc: '乐园时间表',
          picUrl: '//17disney.com/static/wxapp_timesguide.jpg'
        }
      ]
    }
  },

  computed: {},

  mounted() { },

  methods: {
    qrEnter() {
      this.qrHover = true
    },
    qrLeave() {
      this.qrHover = false
    }
  }
}
</script>
