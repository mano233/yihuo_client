<template>
  <div style="display: flex;flex: 1;justify-content: space-between;padding: 0 16px">
    <div @click="$router.push({name:'home'})" class="item"><i class="iconfont icon-shouye1"></i>首页</div>
    <div @click="$router.push({name:'publish'})" class="item"><i class="iconfont icon-bianji"></i>发布</div>
    <div @click="$router.push({name:'chat'})" class="item"><i class="iconfont icon-wodekefu"></i>消息</div>
    <div @click="$router.push({name:'profile'})" class="item"><i class="iconfont icon-zhengquanzhanghu"></i>我的</div>
  </div>
</template>

<script>
export default {
  name: "nav_bar",
  methods:{
  }
}
</script>

<style scoped>
.item{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #2b2b2b;
}
.iconfont{
  font-size: 20px;
  color: #e1251b;
  margin-bottom: 4px;
}
</style>
