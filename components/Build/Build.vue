<style lang='stylus'>
.build {
  display: flex;
  flex-direction: column;
}

.build-top {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.build-main {
  position: relative;
  margin: 0 auto;

  .build-structure, .build-secound, .build-frame {
    position: absolute;
    bottom: 0px;
  }

  .build-frame {
    z-index: 1;
  }

  .build-secound {
    z-index: 2;
    opacity: 0.8;
  }
}
</style>
<template>
  <div class="build" v-if="data">
    <div class="build-top">
      <div class="build-main" :style="{width: data.width + 'px', height: data.height + 'px'}">
        <build-structure :code="data.code" v-show="visibles.showStructure" :path="structure" :width="data.width" :height="data.height" :layers="data.layers" :layersNow="process.layers"></build-structure>
        <build-secound :width="data.width" :height="data.height" :layers="data.layers" :secounds="secounds" :process="process.seconds"></build-secound>
        <build-frame v-show="visibles.showFrame" :width="data.width" :height="data.height" :secounds="secounds"></build-frame>
      </div>
    </div>
    <build-base v-show="visibles.showBase" :process="process.basic" :width="data.width" :height="data.height"></build-base>
  </div>
</template>

<script>
import BuildBase from '@/components/Build/BuildBase'
import BuildStructure from '@/components/Build/BuildStructure'
import BuildSecound from '@/components/Build/BuildSecound'
import BuildFrame from '@/components/Build/BuildFrame'
import { SVGFILE_TYPE } from '@/common/const/cnuc'


export default {
  components: { BuildBase, BuildStructure, BuildSecound, BuildFrame },

  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      }
    },
    visibles: {
      type: Object,
      default: function () {
        return {
          showFrame: true,
          showBase: true,
          showStructure: true
        }
      }
    },
    process: {
      type: Object,
      default: function () {
        return {
          basic: 100
        }
      }
    }
  },

  data() {
    return {
    }
  },


  computed: {
    structure() {
      if (this.data && this.data.svgfiles) {
        const svg = this.data.svgfiles.find(_ => _.type === SVGFILE_TYPE.STRUCTURE)
        return svg ? svg['content'] : ''
      }
    },
    secounds() {
      if (this.data && this.data.svgfiles) {
        return this.data.svgfiles.filter(_ => _.type === SVGFILE_TYPE.SCOUNDS)
      }
    }
  },

  mounted() {
  },

  methods: {}
}
</script>
