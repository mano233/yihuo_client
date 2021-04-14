<template>
  <div style="display: flex;align-items: center" @click="clickHandler(lastMsg.gid,sessionId)">
    <nut-avatar size="large" shape="square"></nut-avatar>
    <div style="flex: 1;display:flex;flex-direction: column;justify-content: space-between;">
      <div>{{title}}</div>
      <div style="font-size: 12px">{{ lastMsg.lastMsg }}</div>
    </div>
    <div style="width: 48px;height: 48px;">
      <img v-if="preImg" :src="preImg" style="object-fit: cover;background: black;width: inherit;height: inherit;border-radius: 7px" alt="img">
    </div>
  </div>
</template>

<script>
import {getGoodsPre} from "../api/API";

export default {
  name: "chat_list_item",
  props:['lastMsg','sessionId'],
  data(){
    return{
      preImg:'',
      uid:null,
      title:''
    }
  },
  created () {
    getGoodsPre(this.lastMsg.gid).then(e=>{
      this.uid = e.content.uid
      this.preImg = e.content.preImg
      this.title = e.content.title
    })
  },
  methods:{
    clickHandler(gid,sessionId){
      this.$router.push({ name: 'chatroom', params: { gid,sid:sessionId}})
    }
  }
}
</script>

<style scoped>

</style>
