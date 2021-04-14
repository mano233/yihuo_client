<template>
  <div style="padding: 16px 16px 0 16px;background: white">
    <h5>标题</h5>
    <nut-textbox v-model="title" class="content" place-text="输入一个标题吧～" style="margin-bottom: 8px"></nut-textbox>
    <h5>描述</h5>
    <nut-textbox :txtAreaH="140" :max-num="300" v-model="content" class="content" place-text="描述越详细越容易被购买～" style="margin-bottom: 8px;"/>
    <span style="font-size: 14px;font-weight: bold">图片</span>
    <span style="font-size: 12px;color: #9b9b9b;margin-bottom: 8px">(最多只能选9张)</span>
    <div style="margin-top: 8px">
      <nut-imagepicker :imgList.sync="imgList" @imgMsg="imgMsg" autoUpload="true" :width="72" :height="72" :max="9"/>
    </div>
    <div style="display: flex;align-items: center;width: 100%;margin-top: 42px">
      <span style="white-space:nowrap;font-size: 14px;font-weight: bold">分类</span>

      <div style="flex: 1;overflow-x: hidden;" id="wrapper">
        <div style="display: flex;width: fit-content;">
          <div slot="list" v-for="val in tabs" :key="val.id"
               @click="cateLogId = val.id"
               :class="[val.id === cateLogId?'select':'','tag']">
            {{ val.describle }}
          </div>
        </div>

      </div>

    </div>
    <div style="display: flex;align-items: center;margin-top: 12px">
      <span style="font-size: 14px;font-weight: bold">价格</span>
      <div style="flex: 1"></div>
      <input type="text" v-model="price" class="payInput" @input="oninput" :maxlength="moneyMaxLeng" style="text-align: right;font-size: 16px;color: #e1251b"/>
    </div>


    <nut-button block @click="onClick" style="margin-top: 12px">点击发布</nut-button>
  </div>
</template>

<script>
import {publishGoods,uploadImg} from '@/api/API'
import BScroll from "@better-scroll/core";

export default {
  name: "publish",
  data () {
    return {
      price: "0.0",
      state: "error",
      content: "",
      title: "",
      cateLogId:null,
      moneyMaxLeng: 8,//规定最大可输入的长度
      imgList: [],
      preImg:[]
    }
  },
  mounted () {
  },
  watch: {
    imgList () {
      this.$nextTick(() => {
        this.$root.bs.refresh();
      })
    }
  },
  computed: {
    tabs () {
      this.$nextTick(()=>{
        new BScroll('#wrapper', {
          scrollX: true,
          click: true
        })
      })
      return this.$store.state.cateLogs
    }
  },
  methods: {
    oninput (e) {
      this.$nextTick(() => {
        let val = e.target.value.toString();
        val = val.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
        val = val.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        val = val.replace(/^0+\./g, '0.');
        val = val.match(/^0+[1-9]+/) ? val = val.replace(/^0+/g, '') : val
        val = (val.match(/^\d*(\.?\d{0,2})/g)[0]) || ''

        if (val.includes(".")) {
          let numDian = val.toString().split(".")[1].length;
          if (numDian === 2) {
            this.moneyMaxLeng = val.length;
          }
        } else {
          this.moneyMaxLeng = 8;
        }
        this.writeMoney = val;
      });
    },
    beforeCheck(){
      return this.cateLogId&&this.content.length>0&&this.title.length>0
    },
    imgMsg (data) {
      if (data.code === 1) {
        let formData = new FormData()
        formData.append('file',data.msg[0])
        uploadImg(formData).then(e=>{
          this.imgList.push({
            id:this.imgList.length,
            src:'http://localhost:8888/'+e.content[0]+'/'+e.content[1]
          })
        })
      }
    },
    onClick () {
      let imgs = []
      for (let item of this.imgList) {
        imgs.push(item.src)
      }
      if(this.beforeCheck()) {
        publishGoods({
          price: this.price,
          content: this.content,
          title: this.title,
          cateLogId:this.cateLogId,
          imgs,
        }).then(e => {
          this.$toast.success('发布成功！')
          this.$router.replace('/goods/' + e.content)
        })
      }else{
        this.$dialog({
          content: "内容不得为空！请检查标题、描述与分类。",
          noFooter:true,

        });
      }
    },
    check () {
      if (/^(([1-9]\d*)|\d)(\.\d{1,2})?$/.test(this.price)) {
        this.state = ""
      } else {
        this.state = "error"
      }
    }
  }
}
</script>

<style scoped>
h5 {
  margin: 0;
  padding: 0;
}

.payInput {
  border: none;
}

.payInput:focus {
  border: none;
  outline: none;
}
.tag{
  width: 80px;
  margin:0 8px;
  line-height:32px;
  text-align: center;
  background: #e9e9e9;
  height: 32px;
  color: #2b2b2b;
  border-radius: 4px;
  font-size: 14px;
}
.select{
  background: #e1251b;
  color: white;
}
>>> textarea{
  font-size: 14px;
  font-family: Arial,sans-serif;
}
.content >>> .txt-area {
  border: none;
  padding: 0;
  font-family: sans-serif;
}

</style>
