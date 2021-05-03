<template>
  <div style="display: flex;align-items: center;padding: 0 16px;height: 100%;width: 100%" v-if="!isLoading">
    <nut-textinput
        style="flex: 1;"
        v-model="text"
        placeholder="请输入内容"
        :clearBtn="true"
        :disabled="false"
    />
    <nut-button
        v-if="text.length!==0"
        type="primary"
        shape="circle"
        style="margin-left: 8px"
        small
        @click="send"
    >
      发送
    </nut-button>

    <nut-button
        v-else-if="showJYButton"
        type="primary"
        shape="circle"
        style="margin-left: 8px"
        small
        @click="deal"
    >
      确认交易
    </nut-button>
  </div>
</template>

<script>
import main from "../main";
import {dealGood} from '../api/API'
export default {
  name: "chat_input",
  data(){
    return{
      text:'',
      isLoading:true,
      gid:null,
      showJYButton:false
    }
  },
  created () {
    main.$on('chat_user_inited',(fromId,gid)=>{
      this.isLoading = false
      this.gid = gid
      this.showJYButton = fromId+''!==localStorage.getItem('uid')
    })
  },
  methods:{
    deal(){
      let that = this
      this.$dialog({
        title:'确认这次交易吗?',
        content: "请注意线下交易安全。点击确认后，会将该商品置为售出状态",
        closeBtn:false,
        onOkBtn() {
          dealGood(that.gid).then(e=>{
            if(e.code===200){
              console.log('goto')
              that.$router.push('/goods/'+that.gid)
              this.close()
            }else{
              this.$toast.fail('操作失败！code:'+e.code+'msg:'+e.msg)
              this.close()
            }
          })
        },
        closeCallback() {
        }
      });
    },
    send(){
      if(this.$route.params.gid&&this.$route.params.sid&&this.text){
        this.$root.$ws.send( JSON.stringify({
          msg:this.text,
          gid:this.$route.params.gid,
          sid:this.$route.params.sid
        }))
      }
      this.text = ""
      // setTimeout(()=>{
      //   this.$root.bs.scrollTo(0,this.$root.bs.maxScrollY,300)
      // },20)
    }
  }
}
</script>

<style scoped>

</style>
