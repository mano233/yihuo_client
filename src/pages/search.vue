<template>
  <div>
    <div>
      <div style="display: flex;justify-content: space-between;background: white;align-items: center;padding:8px 16px">
        <nut-searchbar placeText="右侧默认文字"
                       style="flex: 1"
                       :hasSearchButton="false"
                       ref="input"
                       :animation="false"
                       @submit="search"
                       v-model="searchStr">
        </nut-searchbar>
        <span class="iconfont icon-zhankai" style="font-size: 1.8em;margin-left: 0.2em" @click="showPop = true"></span>
      </div>

      <nut-popup v-model="showPop" position="right" style="width: 200px;height: 100vh">
        <div>
        </div>
      </nut-popup>

      <div style="padding: 16px;background: white">
        <goodslist :list="searchResult"/>
      </div>

    </div>

  </div>
</template>

<script>
import Goodslist from "../components/goodslist";
import {searchByEqual} from '../api/API'

export default {
  name: "search",
  components: {Goodslist},
  data () {
    return {
      searchStr: "",
      showPop:false,
      searchResult:{},
    }
  },

  mounted () {
    this.$nextTick(function () {
      this.$refs.input.focus()
    })
  },
  methods: {
    pullingDown(){
      console.log(222)
    },
    pullingUp(){
      console.log(111)
    },
    search () {
      searchByEqual(
          0,
          1,
          {
            title: this.searchStr
          }).then(e => {
            this.searchResult = e.content.list
      })
      return 1;
    }
  }
}
</script>

