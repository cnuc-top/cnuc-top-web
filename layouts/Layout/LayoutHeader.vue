<style lang='stylus'>
@require '../../styles/cnuc/var/color.styl';

$header-height = 64px;

.header {
  height: $header-height;
  width: 100%;
  position: relative;
  background: $color-primary-s;
  z-index: 1;
  // border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  padding: 0 16px;

  .logo-text {
    margin-top: 15px;

    svg {
      height: 28px;
    }

    path {
      fill: rgba(255, 255, 255, 0.9);
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
        <router-link to="/">
          <el-tooltip effect="dark" content="返回首页" placement="bottom">
            <logo-text></logo-text>
          </el-tooltip>
        </router-link>
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
