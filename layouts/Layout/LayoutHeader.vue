<style lang='stylus'>
$header-height = 72px;

.header {
  height: $header-height;
  width: 100%;
  position: relative;
  background: #EEE;

  .logo-text {
    margin-top: 15px;
    height: 50px;

    path {
      fill: $color-primary;
    }
  }

  .container {
    height: 100%;
  }

  .logo {
    margin: 0;
    float: left;
    font-size: 32px;
    font-weight: 400;
    cursor: pointer;
    margin-top: 15px;

    svg {
      width: 100px;
    }
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
