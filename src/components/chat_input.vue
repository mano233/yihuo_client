<template>
  <div style="display: flex;align-items: center;padding: 0 16px;height: 100%">
    <input v-model="text" style="padding: 8px;flex: 1"/>
    <button @click="send">发送</button>
  </div>
</template>

<script>
export default {
  name: "chat_input",
  data(){
    return{
      text:''
    }
  },
  methods:{
    send(){
      if(this.$route.params.gid&&this.$route.params.sid&&this.text){
        this.$root.$ws.send( JSON.stringify({
          msg:this.text,
          gid:this.$route.params.gid,
          sid:this.$route.params.sid
        }))
      }
      setTimeout(()=>{
        this.$root.bs.scrollTo(0,this.$root.bs.maxScrollY,100)
      },200)
    }
  }
}
</script>

<style scoped>

</style>
