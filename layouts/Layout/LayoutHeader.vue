<style lang='stylus'>
@require '../../styles/cnuc/var/color.styl';

$header-height = 64px;

.header {
  height: $header-height;
  width: 100%;
  position: relative;
  background: $color-primary;

  .logo-text {
    margin-top: 15px;
    svg{
      height: 28px
    }
    path {
      fill: rgba(255, 255, 255, .8);
    }
  }

  .container {
    height: 100%;
  }

  .logo {
    float: left;
    cursor: pointer;
  }

  .nav {
    float: right;
    background: transparent;
    padding: 0;
    margin: 0;
    z-index: 10;
  }
}
</style>
<template>
  <div class="header">
    <div class="container">
      <h1 class="logo">
        <el-tooltip effect="dark" content="返回首页" placement="bottom">
          <logo-text></logo-text>
        </el-tooltip>
      </h1>
      <ul class="nav">

      </ul>
    </div>
  </div>
</template>

<script>
import LogoText from './LogoText.vue'
export default {
  components: { LogoText },

  props: {
  },

  data() {
    return {
    }
  },

  computed: {},

  mounted() { },

  methods: {}
}
</script>
