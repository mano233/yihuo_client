<template>
  <div style="border-radius: 8px;overflow:hidden;display: flex;flex-direction: column;width: 100%;position: relative" @click="redirect">
    <div style="position: absolute;left: 0;top: 0;height: 100%;width: 100%;display: flex;align-items: center;justify-content: center;
    background: rgba(0,0,0,0.3);" v-if="goods.state === 1">
      <div style="color: white;transform: rotate(-30deg)">
        已出售
      </div>
    </div>
    <img alt="src" :src="goods.preImg"
         style="width: 100%;object-fit: contain;min-height: 120px;max-height: 260px;background: black"
         @load="onImgLoad">
    <div style="padding:8px 12px;">
      <p style="text-overflow:ellipsis;white-space: normal;overflow: hidden;-webkit-box-orient: vertical;
      display: -webkit-box;-webkit-line-clamp: 2;font-size: 14px">
        {{ goods.title }}
      </p>
      <p style="color: #e1251b;margin-top: 12px;">
        <nut-price
            :price="goods.price"
            :needSymbol="true"
            :thousands="false"
        />
      </p>
      <div style="font-size: 12px;display: flex;align-items: center;margin-top: 8px">
        <nut-avatar bg-icon style="width: 20px;height: 20px" :bg-image="member.avatarImg"></nut-avatar>
        <span style="overflow: hidden;text-overflow: ellipsis;width: 60%;color: #666666">{{ member.name }}</span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "good_card",
  props: ['goods', 'member'],
  data(){
    return {
    }
  },
  mounted () {
  },
  methods: {
    redirect () {
      console.log('/goods/' + this.goods.id)
      this.$router.push('/goods/' + this.goods.id)
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
}
</style>
