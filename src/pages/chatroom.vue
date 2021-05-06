<template>
  <div style="padding:16px;">
    <ul style="display: flex;flex-direction: column-reverse;" v-if="!isLoading">
      <li v-for="(msg,index) in msgs" :key="index" :class="['cell',isMe(msg.uid)?'cell-revers':'']">
        <nut-avatar size="normal" shape="square"></nut-avatar>
        <div style="margin: 0 8px;">
          <!--<div class="name">{{fromUserInfo.id === msg.uid?fromUserInfo.name:toUserInfo.name}}</div>-->
          <div class="msg" style="padding:8px;background: rgba(255,37,27,.8)">
            {{msg.msg}}
          </div>
          <div class="date">{{msg.ctime|fromNow}}</div>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
import main from "../main"
// import chat_good_card from "../components/chat_good_card";
import {getSessionInfo,getUserInfo } from '../api/API'
export default {
  name: "chatroom",
  data(){
    return {
      fromUserInfo:{},
      toUserInfo:{},
      gid:{},
      isLoading:true,
    }
  },
  beforeCreate () {
    if(Object.keys(this.$route.params).length===0){
      this.$router.go(-1)
    }
  },
  computed:{
    msgs(){
      this.$store.state.temp
      if(this.$root.bs){
        this.$root.bs.scrollTo(0,this.$root.bs.maxScrollY-51,300)
      }
      if(this.$store.state.sessions.get(this.$route.params.sid)) {
        return this.$store.state.sessions.get(this.$route.params.sid).msgs
      }
      return []
    }
  },
  created () {
    let toast = this.$toast.loading('加载中...', {coverColor: "rgba(0,0,0,0.5)",})
    getSessionInfo(this.$route.params.sid).then(e=>{
      let fromUid = e.content.fromUid
      let toUid = e.content.toUid
      let gid = e.content.gid
      getUserInfo(fromUid).then((e)=>{
        this.fromUserInfo = e.content
        getUserInfo(toUid).then((e)=>{
          this.toUserInfo = e.content
          toast.hide()
          this.isLoading = false
          main.$emit('chat_user_inited',fromUid,gid)
          if(this.$root.bs){
            setTimeout(()=>{
              this.$root.bs.scrollTo(0,this.$root.bs.maxScrollY,100)
            },300)
          }
        })
      })
    })
  },
  mounted () {
    // var instance = new Vue({
    //   el:document.createElement("div"),
    //   render:h=>h(chat_good_card)
    //
    // });

    // document.body.appendChild(instance.$el);
  },
  beforeDestroy () {
    main.$off('chat_user_inited')
  },
  methods:{
    pullingDown () {},
    pullingUp(){
      this.$root.bs.finishPullUp()
    },
    isMe(uid){
      return parseInt(localStorage.getItem('uid'))===uid
    },
  }
}
</script>

<style scoped>
.cell{
  display: flex;
  margin-top: 8px;
}
.date{
  text-align: left;
  font-size: 12px;
  color: #9b9b9b;
}
.cell-revers{
  flex-direction: row-reverse;
}
.msg{
  border-radius: 12px;
  color: #2b2b2b;
  /*color: white;*/
}
.cell-revers .name{
  text-align: right;
}
.cell-revers .date{
  text-align: right;
}
.nut-avatar{
  margin: 0;
}
</style>
