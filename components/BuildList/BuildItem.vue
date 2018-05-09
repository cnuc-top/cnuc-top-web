<style lang='stylus'>
@require '../../styles/cnuc/var/color.styl';

.build-item {
  position: relative;
  overflow: hidden;

  &:hover {
    .build {
      opacity: 1;
    }

    .build-item__box {
      opacity: 1;
    }
  }

  &__img {
    vertical-align: bottom;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  &__box {
    position: absolute;
    z-index: 1;
    background: rgba(255, 255, 255, 0.8);
    right: 0px;
    top: 0px;
    bottom: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: 0.15s;
  }

  .build {
    height: auto;
    // opacity: 0;
    transform: scale(0.6);
  }

  &__meta {
    background: rgba($color-primary, 0.7);
    padding: 10px 15px;
    color: #FFF;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  &__title {
    font-weight: 500;
    font-size: 18px;
  }

  &__height {
    margin-top: 5px;
    font-weight: 500;
    font-size: 17px;
  }
}
</style>
<template>
  <div class="build-item">
    <img class="build-item__img" :src="data.picUrl" alt="">
    <div class="build-item__meta">
      <h2 class="build-item__title">{{data.name}}</h2>
      <h3 class="build-item__height">{{data.height}}M</h3>
    </div>
    <div class="build-item__box">
      <build :data="data" :visibles="visibles"></build>
    </div>
  </div>
</template>

<script>
import Build from '@/components/Build/Build'

export default {
  components: { Build },

  props: {
    data: Object,

  },

  data() {
    return {
      visibles: {
        showFrame: true,
        showBase: true,
        showStructure: true
      }
    }
  },

  computed: {},

  mounted() { },

  methods: {}
}
</script>
