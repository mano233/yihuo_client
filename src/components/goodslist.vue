<template>
  <div>
    <div v-if="rightList.length+leftList.length===0" style="color: #9b9b9b;height: 200px;display: flex;justify-content: center;align-items: center">
      这里空空如也～
    </div>
    <div style="display: flex;flex-direction: row" v-else>
      <div id="left" ref="left" style="flex: 1;overflow: hidden;margin-right: 20px" class="good_box">
        <good_card v-for="item in leftList" :key="item.goods.id" class="good_card" :goods="item.goods" :member="item.member"/>
      </div>
      <div id="right" ref="right" style="flex: 1;overflow: hidden;" class="good_box">
        <good_card v-for="item in rightList" :key="item.goods.id" class="good_card" :goods="item.goods" :member="item.member" />
      </div>
    </div>
  </div>

</template>

<script>
import good_card from "./good_card";
export default {
  name: "goodslist",
  components: {good_card},
  props:["list"],
  data(){
    return{
      leftList:[],
      rightList:[]
    }
  },
  watch:{
    list(val){
      this.leftList.splice(0,this.leftList.length);
      this.rightList.splice(0,this.rightList.length)
      this.add(val)
    }
  },
  methods:{
    add(items){
      if(Array.isArray(items)){
        for(let index in items){
          if(index%2===0){
            this.leftList.push(items[index]);
          }else{
            this.rightList.push(items[index]);
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.good_card {
  margin-top: 14px;
}
.good_box > :first-child {
  margin-top: 0;
}
</style>
