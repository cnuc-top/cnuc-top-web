<style lang='stylus'>
@require '../../styles/cnuc/var/color.styl';

.build-list {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 30px;

  .build-item {
    margin-bottom: 24px;
    cursor: pointer;
    transition: 0.15s;
    border-radius: 2px;
    overflow: hidden;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  }
}
</style>
<template>
  <div class="build-list">
    <el-row :gutter="24">

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
