<template>
  <div style="padding: 0 16px;">
    <ul style="display: flex;flex-direction: column-reverse;">
      <li v-for="(msg,index) in msgs" :key="index" :class="['cell',isMe(msg.uid)?'cell-revers':'']">
        <div style="border-radius: 12px 12px 0 12px;padding:8px;background: aquamarine;margin-top: 8px">
          {{msg.msg}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "chatroom",
  data(){
    return {
    }
  },
  computed:{
    msgs(){
      this.$store.state.temp
      this.$root.bs.scrollTo(0,this.$root.bs.maxScrollY,300)
      if(this.$store.state.sessions.get(this.$route.params.sid)) {
        return this.$store.state.sessions.get(this.$route.params.sid).msgs
      }
      return []
    }
  },
  mounted () {
    setTimeout(()=>{
      this.$root.bs.scrollTo(0,this.$root.bs.maxScrollY,100)
    },300)


  },
  methods:{
    isMe(uid){
      return parseInt(localStorage.getItem('uid'))===uid
    },
  }
}
</script>

<style scoped>
.cell{
  display: flex;
}
.cell-revers{
  flex-direction: row-reverse;
}
</style>
