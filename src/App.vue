<template>
  <div id="app" style="height: 100vh;background-color: #eee">
    <div style="position: fixed;top:10px;z-index: 999"
         v-if="$store.state.socketState==='error'||$store.state.socketState==='close'">聊天系统连接失败
    </div>
    <div style="position: fixed;width:100%;z-index: 99;">
      <nut-navbar :close-show="false" :search-show="false" :more-show="false" @on-click-back="$router.go(-1)">
        <slot name="title">异或app</slot>
      </nut-navbar>
    </div>

      <div ref="box" id="box">
        <keep-alive include="search">
          <router-view/>
        </keep-alive>
      </div>

    <!--<div style="position: absolute;bottom: 0;height: 68px;width: 100vw;background: white;display: flex;">-->
    <!--  <div style="flex: 1;display: flex;justify-content: center;align-items: center;flex-direction: column;color: red;">-->
    <!--    <div class="iconfont icon-shouye" style="display: block;font-size: 32px;"></div>-->
    <!--    <div style="font-size: 12px;margin-top: 4px">首页</div>-->
    <!--  </div>-->
    <!--  <div style="flex: 1;display: flex;justify-content: center;position: relative">-->
    <!--    <div style="position: absolute;top:-20px;width: 68px;height: 68px;border-radius: 50%;background: red;line-height: 68px;text-align: center">-->
    <!--      +-->
    <!--    </div>-->
    <!--  </div>-->
    <!--  <div style="flex: 1;display: flex;justify-content: center;align-items: center;flex-direction: column">-->
    <!--    <div class="iconfont icon-wode" style="display: block;color: red"></div>-->
    <!--    <div style="font-size: 14px">首页</div>-->
    <!--  </div>-->
    <!--</div>-->
    <div
        style="position: fixed;bottom: 0;left:0;height: 58px;width: 100%;background: white;border-top:1px solid #ccc;display: flex;background: #f5f5f5">
      <component :is="bottomCom"></component>
    </div>
  </div>
</template>

<script>
import {getSessionList,getCateLog} from './api/API'
import BScroll from 'better-scroll'
import Chat_input from "./components/chat_input"
import good_button from "./components/good_button"
import nav_bar from "./components/nav_bar";

export default {
  name: 'App',
  components: {Chat_input, good_button, nav_bar},
  data () {
    return {}
  },
  watch: {},
  updated () {
    if (this.$root.bs) {
      return;
    }
    this.$root.bs = new BScroll(this.$refs.box, {
      click: true,
      pullUpLoad: true,
      pullDownRefresh: true,
      eventPassthrough:'horizontal'
    });
  },
  beforeCreate () {
    this.$nextTick(() => {
      getCateLog().then(e=>{
        this.$store.commit('setCateLogs',e.content)
      })
      getSessionList().then((e) => {
        this.$store.commit('refreshAllSession', e.content)
        this.$root.$ws = new WebSocket('ws://localhost:8080/chat/' + localStorage.getItem('token'))
        this.$root.$ws.onopen = () => {
          this.$store.commit('changeSocketState', 'open')
        }
        this.$root.$ws.onmessage = (e) => {
          this.$store.commit('newMsg', JSON.parse(e.data))
        }
        this.$root.$ws.onclose = () => {
          this.$store.commit('changeSocketState', 'close')
        }
        this.$root.$ws.onerror = () => {
          this.$store.commit('changeSocketState', 'error')
        }
      })
    })
  },
  mounted () {

  },
  computed: {
    bottomCom () {
      switch (this.$route.name) {
        case 'goods':
          return 'good_button'
        case 'chatroom':
          return 'Chat_input'
        default:
          return 'nav_bar'
      }
    }
  }

}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}


.nut-tab-item {
  display: none;
}

#box {
  position: absolute;
  left: 0;
  top: 40px;
  right: 0;
  bottom: 58px;
  display: flex;
  flex-direction: column;
  width: 100vw;
  overflow: hidden;
}
</style>
