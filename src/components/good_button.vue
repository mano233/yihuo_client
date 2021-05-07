<template>
  <div style="flex:1;height:100%;display: flex;align-items: center;padding: 0 16px;flex-direction: row-reverse" v-if="gid&&uid">
    <nut-button shape="circle" v-if="canEdit" :disabled="disable" @click="showAction=true">商品操作</nut-button>
    <nut-button shape="circle" v-else @click="chat" :disabled="disable">{{sessionId?'继续沟通':'沟通一下吧'}}</nut-button>
    <nut-popup position="bottom" v-model="showAction" get-container="#app" v-if="showAction">
      <div style="font-size: 18px;">
        <div style="border-bottom: 1px solid #cccccc;">
          <div style="padding: 10px 20px;" @click="editGoods">修改商品</div>
        </div>
        <div @click="deleteGood">
          <div style="padding: 10px 20px;">下架商品</div>
        </div>
      </div>
    </nut-popup>
  </div>
</template>

<script>
import {createSession, getSessionId,deleteGood} from "../api/API";
import main from "../main";
export default {
  name: "good_button",
  data(){
    return {
      sessionId:null,
      gid:null,
      uid:null,
      showAction:false,
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
    document.getElementsByClassName('popup-bottom')[0].remove()
  },
  created () {
    main.$on('goodsLoadFin',(e)=>{
      this.disable = e.goods.state===1
      this.gid = e.goods.id
      this.uid = e.goods.uid
    })
  },
  methods:{
    editGoods(){
      this.$router.push('/editor/'+this.$route.params.id)
    },
    deleteGood(){
      deleteGood(this.$route.params.id).then(e=>{
        if(e.code===6001){
          this.$toast.fail(e.msg)
        }
        this.showAction=false
        this.$router.go(-1);
      })
    },
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
