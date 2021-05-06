<template>
  <div class="home">
    <div>

      <div style="padding: 8px 16px;background: white">
        <nut-searchbar placeText="搜搜看吧～" :hasSearchButton="true" :animation="false" v-model="searchText" @submit="submitFun"></nut-searchbar>
      </div>

      <p style="margin-left: 16px;margin-bottom: 4px;margin-top:4px;font-size: 14px;color: #666666">热门商品</p>
      <div class="wrapper">
        <div class="slide-box">
          <div slot="list" v-for="item of hotList" :key="item.id"
               @click.once="goDetail(item.id)"
               style="width: 200px;height: 64px;background: white;margin:0 16px;border-radius: 14px;overflow:hidden;display: flex;padding: 8px">
            <img :src="item.preImg"
                 style="height: 100%;width:64px;object-fit: cover;border-radius: 14px;overflow: hidden">
            <div style="flex: 1;margin-left: 10px;display: flex;flex-direction: column;justify-content: space-between">
              <div style="-webkit-box-orient: vertical;
      display: -webkit-box;-webkit-line-clamp: 2;font-size: 14px;overflow: hidden">{{ item.title }}
              </div>
              <nut-price
                  style="color: #e1251b"
                  :price="item.price"
                  :needSymbol="true"
                  :thousands="false"
              />
            </div>
          </div>
        </div>
      </div>

      <!--<div style="padding: 0 15px">-->
      <!-- -->
      <!--  &lt;!&ndash;<div style="height: 60px;width: 100%;background-color: white;margin: 14px 0;border-radius: 7px"></div>&ndash;&gt;-->

      <!--</div>-->
      <div>
        <nut-tab :is-scroll="true" :initData="tabs" @tab-switch="tabSwitch">
          <nut-tab-panel
              v-for="value in tabs"
              v-bind:key="value.id"
              :tab-title="value.describle"
          >
          </nut-tab-panel>
        </nut-tab>
        <goodslist style="background: white;padding: 8px 15px" :list="list"/>
      </div>
    </div>
  </div>
</template>

<script>
import goodslist from "../components/goodslist";
import {getGoods, getHot} from '../api/API'
import BScroll from '@better-scroll/core'

let horBs;
const pageSize = 10;
export default {
  name: "home",
  components: {
    goodslist,
  },
  data () {
    return {
      list: [],
      pageNum: 1,
      searchText:'',
      isLastPage: false,
      hotList: [],
      selCateLogIndex: 0
    }
  },
  computed: {
    tabs () {
      return this.$store.state.cateLogs
    }
  },
  mounted () {
    let typeId = 1
    if (typeId) {
      getGoods(typeId, pageSize, 1).then(e => {
        this.list = e.content.list
        this.isLastPage = e.content.isLastPage
      })
    }
  },
  beforeCreate () {
    getHot().then(e => {
      this.hotList = e.content
      this.$nextTick(() => {
        horBs = new BScroll('.wrapper', {
          scrollX: true,
          click: true
        })
      })
    })
  },
  methods: {
    goDetail (gid) {
      this.$router.push('/goods/' + gid)
    },
    tabSwitch (index) {
      this.selCateLogIndex = index
      let typeId = this.tabs[index].id
      if (typeId) {
        getGoods(typeId, pageSize, 1).then(e => {
          this.list = e.content.list
          this.isLastPage = e.content.isLastPage
        })
      }
    },
    pullingUp () {
      if (this.isLastPage) {
        this.$root.bs.finishPullUp()
        return;
      }
      let typeId = this.tabs[this.selCateLogIndex].id
      if (typeId) {
        getGoods(typeId, pageSize, this.pageNum + 1).then(e => {
          this.pageNum = this.pageNum + 1;
          this.list = this.list.concat(e.content.list)
          this.isLastPage = e.content.isLastPage
          this.$root.bs.finishPullUp()
          this.$nextTick(() => {
            this.$root.bs.refresh()
          })
        })
      }

    },
    pullingDown () {
      this.pageNum = 1
      getHot().then(e => {
        this.hotList = e.content
        this.$nextTick(() => {
          horBs.refresh();
        })
      })
      let typeId = this.tabs[this.selCateLogIndex].id
      if (typeId) {
        getGoods(typeId, pageSize, this.pageNum).then((e) => {
          this.list = e.content.list
          this.isLastPage = e.content.isLastPage
          this.$root.bs.finishPullDown()
          this.$nextTick(() => {
            this.$root.bs.refresh();
          })
        })
      }

    },
    submitFun () {
      this.$router.push('/search/'+this.searchText)
    }

  }
}
</script>

<style scoped>
h5{
  margin: 0 0 12px;
  padding: 0 16px;
}
.home >>> .nut-tab {
  padding: 0;
}

.wrapper {
  overflow-x: hidden;
  margin-bottom: 12px;
}

.slide-box {
  display: flex;
  width: fit-content;
}
</style>
