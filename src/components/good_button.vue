<template>
  <div style="flex:1;height:100%;display: flex;align-items: center;padding: 0 16px;flex-direction: row-reverse" v-if="gid&&uid">
    <nut-button shape="circle" v-if="canEdit" :disabled="disable" @click="showAction=true">商品操作</nut-button>
    <nut-button shape="circle" v-else @click="chat" :disabled="disable">{{sessionId?'继续沟通':'沟通一下吧'}}</nut-button>
    <nut-popup round position="bottom" v-model="showAction" get-container="#app">
      <div style="padding: 20px">
        <div>编辑商品</div>
        <div>删除商品</div>
      </div>
    </nut-popup>
  </div>
</template>

<script>
import {createSession, getSessionId} from "../api/API";
import main from "../main";
export default {
  name: "good_button",
  data(){
    return {
      sessionId:null,
      gid:null,
      uid:null,
      showAction:true,
      disable:true,
    }
  },
  beforeCreate () {
    getSessionId(this.$route.params.id).then(e=>{
      this.sessionId = e.content
    })
  },
  computed:{
    canEdit(){
      return parseInt(localStorage.getItem('uid'))===parseInt(this.uid)
    }
  },
  beforeDestroy () {

  },
  created () {
    main.$on('goodsLoadFin',(e)=>{
      this.disable = e.goods.state===1
      this.gid = e.goods.id
      this.uid = e.goods.uid
    })
  },
  methods:{
    chat(){
      if(this.sessionId){
        this.$router.push({ name: 'chatroom', params: { gid: this.$route.params.id,sid:this.sessionId}})
      }else{
        createSession(this.$route.params.id).then((e)=>{
          this.$store.commit('addNewSession',{k:e.content.id,v:{lastMsg:{gid:e.content.gid,uid:e.content.fromUid,sessionId:e.content.id},msgs:[]}})
          this.$router.push({ name: 'chatroom', params: { gid: e.content.gid,sid:e.content.id}})
        })
      }
    },
  }
}
</script>

<style scoped>

</style>
