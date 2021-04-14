<template>
  <div>
    <div style="background: white;padding-bottom: 16px">
      <div style="display: flex;padding: 16px;background: white;align-items: center">
        <nut-avatar style="width: 52px;height: 52px" shape="square"></nut-avatar>
        <div>
          <div style="font-size: 18px;font-weight: bold">
            {{userInfo.name}}
          </div>
          <div style="color: #9b9b9b;font-size: 14px">
            用户id：#{{userInfo.id}}
          </div>
        </div>
      </div>
      <div style="display: flex;">
        <div style="flex: 1;display: flex;flex-direction: column;align-items: center;margin-bottom: 16px">
          <div style="font-size: 16px;font-weight: bold">
            {{list1.length}}
          </div>
          <div style="color: #9b9b9b;font-size: 14px">
            正在出售数
          </div>

        </div>
        <div style="flex: 1;display: flex;flex-direction: column;align-items: center">
          <div style="font-size: 16px;font-weight: bold">
            {{list2.length}}
          </div>
          <div style="color: #9b9b9b;font-size: 14px">
            已出售商品数
          </div>

        </div>

      </div>

      <table style="padding: 0 16px;width: 100%;font-size: 14px">
        <tr>
          <td>创建时间</td>
          <td> <span style="color: #9b9b9b">{{userInfo.ctime}}</span></td>
        </tr>
        <tr>
          <td>QQ</td>
          <td><span style="color: #9b9b9b">{{userInfo.qq?userInfo.qq:'用户没有填写'}}</span></td>
        </tr>
        <tr>
          <td>微信</td>
          <td><span style="color: #9b9b9b">{{userInfo.wechat?userInfo.wechat:'用户没有填写'}}</span></td>
        </tr>
        <tr>
          <td>联系方式</td>
          <td><span style="color: #9b9b9b">{{userInfo.telPhone?userInfo.telPhone:'用户没有填写'}}</span></td>
        </tr>
      </table>

    </div>
    <nut-tab @tab-switch="tabSwitch">
      <nut-tab-panel tab-title="正在出售"/>
      <nut-tab-panel tab-title="已经出售"/>
    </nut-tab>
    <goodslist :list="index===0?list1:list2" style="background: white;padding: 16px"/>
  </div>

</template>

<script>
import Goodslist from "../components/goodslist"
import {getGoodsByState,getUserInfo} from '../api/API'
export default {
  name: "profile",
  components: {Goodslist},
  data(){
    return{
      userInfo:{},
      list1:[],
      list2:[],
      index:0,
    }
  },
  created () {
    getGoodsByState(0).then(({content})=>{
      this.list1 = content
    })
    getGoodsByState(1).then(({content})=>{
      this.list2 = content
    })
    this.getUserInfo()
  },
  methods:{
    getUserInfo(){
      getUserInfo(localStorage.getItem('uid')).then(e=>{
        console.log(e)
        this.userInfo = e.content
      })
    },
    pullingDown () {
    },
    pullingUp () {

    },
    tabSwitch(i){
      this.index = i
    }
  }
}
</script>

<style scoped>
>>>.nut-tab{
  padding: 0;
}
</style>
