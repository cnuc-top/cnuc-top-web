<style lang='stylus'>
@require '../../styles/cnuc/var/color.styl';

.build-list {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 30px;

  .build-item {
    margin-bottom: 30px;
    cursor: pointer;
    border: 1px solid $color-light-grey-sss;
    transition: 0.15s;

    &:hover {
      border-color: $color-primary;
    }
  }
}
</style>
<template>
  <div class="build-list">
    <el-row :gutter="20">

      <el-col :span="12" v-for="(item, index) in data" :key="index">
        <router-link :to="'./buildings/' + item.id">
          <build-item :data="item"></build-item>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import BuildItem from '@/components/BuildList/BuildItem'

export default {
  components: { BuildItem },

  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
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
