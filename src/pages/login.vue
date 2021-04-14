<template>
  <div style="margin-top: auto;margin-bottom: auto;padding: 0 16px;">
    <form>
      <div style="display: flex;align-items: center;margin-bottom: 8px">
        <span style="margin-right: 16px">账号</span>
        <nut-textinput
            style="flex: 1;"
            v-model="name"
            placeholder="请输入用户名"
            :clearBtn="true"
            :disabled="false"
        />
      </div>

      <div style="display: flex;align-items: center">
        <span style="margin-right: 16px">密码</span>
        <nut-textinput
            placeholder="请输入密码"
            style="flex: 1"
            v-model="pwd"
            type="password"
        />
      </div>

    </form>
    <router-link to="/register">没有账号？点击注册</router-link>
    <nut-button
        style="margin-top: 15px;"
        block
        @click="login"
        shape="circle"
    >
      登录
    </nut-button>
  </div>
</template>

<script>
import {login} from "../api/API";

export default {
  name: "login",
  data(){
    return{
      name:'',
      pwd:''
    }
  },
  methods:{
    async login(){
      let res = await login(this.name,this.pwd)
      if(res.code===5002){
        this.$toast.text('账号审核中，请稍后再试...')
        return
      }
      if(res.content){
        localStorage.setItem('token',res.content.token)
        localStorage.setItem('uid',res.content.uid)
        await this.$router.replace('/home')
      }
      console.log(res)
    }
  }
}
</script>

<style scoped>

</style>
