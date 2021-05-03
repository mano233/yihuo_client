<template>
  <div>
    <div v-if="sessions.length===0" style="color: #9b9b9b;height: 200px;display: flex;justify-content: center;align-items: center">
      这里空空如也～
    </div>
    <ul v-else style="padding: 16px;background: white">
      <li v-for="item in sessions" :key="item.id">
        <chat_list_item :lastMsg="item.value.lastMsg" :sessionId="item.id" style="margin-bottom: 12px;padding-top:12px;border-top: 1px solid #eee"/>
      </li>
    </ul>
  </div>

</template>

<script>

import chat_list_item from "../components/chat_list_item";
import {getSessionList} from "../api/API";
export default {
  name: "chat",
  components: {chat_list_item},
  data(){
    return {
      content:'',
      sendTo:''
    }
  },
  computed:{
    sessions(){
      this.$store.state.temp
      let arr = []
      for (let item of this.$store.state.sessions.entries()) {
        arr.push({
          id: item[0],
          value: item[1]
        })
      }
      return arr
    }
  },
  methods:{
    pullingDown () {
      getSessionList().then((e) => {
            this.$store.commit('refreshAllSession', e.content)
      })
    },
    pullingUp(){
      this.$root.bs.finishPullUp()
    },


  },
  mounted () {

  }
}
</script>

<style scoped>
>>>.nut-cell{
  padding: 0 16px;
}
</style>
