<template>
  <div style="display: flex;align-items: center;" @click="clickHandler(lastMsg.gid,sessionId);">
    <nut-avatar size="large" shape="square"></nut-avatar>
    <div style="flex: 1;display:flex;flex-direction: column;justify-content: space-between;z-index: 9">
      <div style="font-size: 16px;font-weight: bold">{{title?title:'商品已删除'}}</div>
      <div style="font-size: 14px;color: #9b9b9b">{{ lastMsg.lastMsg }}</div>
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
