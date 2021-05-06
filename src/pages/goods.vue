<template>
  <div class="content">
    <nut-skeleton v-if="loading" style="height: 100vh">
      <row>
        <skeleton-circle diameter="50px"></skeleton-circle>
        <column>
          <skeleton-square width="275px" :count="2" margin="5px 10px 5px 10px"></skeleton-square>
          <skeleton-square width="200px" margin="5px 10px 5px 10px"></skeleton-square>
        </column>
      </row>

      <div style="display: flex;flex-direction: column">
        <column style="margin: 24px 0">
          <skeleton-square
              width="275px"
              :count="2"
              margin="5px 10px 5px 10px"
          ></skeleton-square>
          <skeleton-square
              width="100px"
              margin="5px 10px 5px 10px"
          ></skeleton-square>
        </column>
        <div style="height: 400px;background: rgb(239, 239, 239);border-radius: 7px"></div>
      </div>
    </nut-skeleton>
    <div style="background: white;border-bottom: 1px #eee solid;display: flex;align-items: center;padding: 16px" @click="goProfile">
      <nut-avatar size="large" shape="square"></nut-avatar>
      <div>
        <div>
          <span>{{ member.name }}</span>
        </div>
        <div style="color:#9b9b9b;font-size: 12px">57天前来过</div>
      </div>
    </div>
    <div style="position:relative;">
      <div style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;background: rgba(0,0,0,.3);
      display: flex;align-items: center;justify-content: center" v-if="isSold">
        <div style="color: white;transform: rotate(-30deg)">
          已出售
        </div>
      </div>
      <div style="padding: 16px;background: white;">

        <p style="margin: 0">
          <span style="padding: 2px;border-radius: 4px;background: #e1251b;color: white;font-size: 13px;margin: 0 4px">{{cateLogDes.describle}}</span>
          <span>{{ title }}</span>
        </p>
        <p/>
        <nut-price
            class="price"
            style="color: rgb(225, 37, 27);"
            :price="goods.price"
            :needSymbol="true"
            :thousands="false"
        />
        <p style="font-size: 14px">

          {{ content.text }}
        </p>
        <img alt="img" v-for="(val,index) in content.imgs" :key="index" :src="val" style="object-fit: cover;width: 100%"
             @load="onImgLoad"/>
        <div style="display: flex;font-size: 12px;align-items: center;color: #9b9b9b;margin-top: 24px">
          <span style="margin-right: 8px">发布时间：{{this.goods.ctime|fromNow}}</span>
          <span>浏览人数：88</span>
        </div>
      </div>
    </div>

    <div
        style="margin-top:15px;background: white;padding-right: 15px;padding-left: 15px;display: flex;flex-direction: column">
      <p>全部留言 - {{comments.length}}</p>
      <div style="display: flex;align-items: center;margin-bottom: 12px">
        <nut-avatar size-num="28"></nut-avatar>
        <input style="border: none;background: #eee;flex: 1;outline: none;
    border-radius: 24px;
    padding: 8px;" placeholder="看中了，就留言吧～" v-model="commentInput"/>
        <span @click="commentHandler">发送</span>
      </div>
      <ul>
        <li v-for="item in comments" :key="item.id">
          <div style="display: flex;">
            <nut-avatar size-num="28"></nut-avatar>
            <div style="font-weight: bold">{{ item.userInfo.name }}</div>
            <span style="flex: 1"></span>
            <div style="font-size: 12px;color: #9b9b9b;">
              {{item.comment.rTime|fromNow}}
            </div>
          </div>
          <div style="padding-left: 36px;margin-bottom: 8px;font-size: 14px">
            {{item.comment.content}}
          </div>

        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import {getGoodsDetail,getComment,comment} from "../api/API";
import main from "../main"

export default {
  name: "goods",
  data () {
    return {
      loading: true,
      title: '',
      member: {},
      goods: {},
      commentInput:'',
      content: {},
      isSold:true,
      comments:[]
    }
  },
  computed:{
    cateLogDes(){
      let ret = this.$store.getters.getCateLogName(this.goods.catelogId)
      return ret?ret:'';
    }
  },
  created () {
    this.$store.commit('setGoodsId', this.$route.params.id)
    this.getDetail(this.$route.params.id)
    this.getComment()
  },
  beforeDestroy () {
    main.$off('goodsLoadFin')
  },
  methods: {
    getComment(){
      console.log('get com')
      getComment(this.$route.params.id).then((data)=>{
        this.comments = data.content
      })
    },
    commentHandler(){
      comment(this.$route.params.id,this.commentInput).then(()=>{
        this.commentInput = ''
        this.getComment()
      })
    },
    goProfile(){
      this.$router.push('/profile/'+this.goods.uid)
    },
    getDetail(gid){
      getGoodsDetail(gid).then((e) => {
        main.$emit('goodsLoadFin', e.content)
        this.title = e.content.goods.title
        this.content = JSON.parse(e.content.goods.contnet);
        this.goods = e.content.goods
        this.member = e.content.member
        this.isSold = e.content.goods.state === 1
        this.loading = false
      })
    },
    pullingDown () {
      this.$store.commit('setGoodsId', this.$route.params.id)
      this.getDetail(this.$route.params.id)
    },
    pullingUp () {
      console.log(111)
    },
  },
  mounted () {
    // setTimeout(() => {
    //   this.$root.bs.scrollTo(0, 0, 100)
    // }, 200)
  }
}
</script>

<style scoped>
.price >>> .price-big {
  font-size: 20px;
}

li {
  padding: 8px 0;
  border-top: 1px solid #eee;
  list-style: none;
}

ul {
  padding: 0;
}

.content >>> .vue-skeleton-loading {
  position: absolute;
}
</style>
