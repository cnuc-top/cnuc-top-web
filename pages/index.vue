<style lang='stylus'>
.list-loading {
  height: 300px;
}

.page-index {
  margin-top: 30px;
}
</style>
<template>
  <div class="container page-index">
    <build-list v-if="list" :data="list"></build-list>
    <div v-else v-loading="true" class="list-loading"></div>
  </div>
</template>

<script>
import BuildList from '@/components/BuildList/BuildList'
import BTL from '@/common/api/btl'
export default {
  components: { BuildList },

  data() {
    return {
      city: '宁波',
      list: [],
      page: 1,
      limit: 10,
      total: null,
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      const { city, page, limit } = this
      const params = {
        city,
        page,
        limit
      }
      const { data } = await BTL.buildingList(params)
      const { list, total } = data
      this.total = total

      setTimeout(() => {
        this.list = list
      }, 500)
    }
  }
}
</script>
