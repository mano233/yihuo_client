<template>
  <div style="margin-top: auto;margin-bottom: auto;padding: 0 16px;">
    <form>
      <div style="display: flex;align-items: center;margin-bottom: 8px;">
        <span class="required from-text">用户名</span>
        <nut-textinput
            style="flex: 1;"
            v-model="name"
            placeholder="请输入用户名"
            :clearBtn="true"
            :disabled="false"
        />
      </div>
      <div style="display: flex;align-items: center;margin-bottom: 8px;">
        <span class="required from-text">密码</span>
        <nut-textinput
            placeholder="请输入密码"
            style="flex: 1"
            v-model="pwd"
            type="password"
        />
      </div>
      <div style="display: flex;align-items: center;margin-bottom: 8px">
        <span class="required from-text">再次确认密码</span>
        <nut-textinput
            placeholder="请再次输入密码"
            style="flex: 1"
            v-model="rePwd"
            type="password"
        />
      </div>
      <div style="display: flex;align-items: center;margin-bottom: 8px">
        <span class="required from-text">手机号码</span>
        <nut-textinput
            placeholder="请输入手机号码"
            style="flex: 1"
            v-model="tel"
        />
      </div>
    </form>
    <nut-button
        style="margin-top: 15px;"
        block
        @click="submit"
        shape="circle"
    >
      注册
    </nut-button>
  </div>
</template>

<script>
import {register} from '../api/API'

function checkText (even) {
  let flag = new RegExp("[`~!@#$^&*()=|{}':;,\\[\\].<>《》/?！￥…（）—【】‘；：”“。，、？ ]")
  return flag.test(even)
}

function isPoneAvailable (val) {
  return !/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(val)
}

export default {
  name: "register",
  data () {
    return {
      name: '',
      pwd: '',
      rePwd: '',
      tel: ''
    }
  },
  methods: {
    submit () {
      if (this.name === '') {
        this.$toast.text('用户名不能为空！')
        return
      }
      if (this.pwd === '') {
        this.$toast.text('密码不能为空！')
        return
      }
      if (checkText(this.name)) {
        this.$toast.text('用户名不能包含特殊字符！')
        return
      }
      if (!this.pwd && checkText(this.pwd)) {
        this.$toast.text('密码不能包含特殊字符！')
        return
      }
      if (this.rePwd !== this.pwd) {
        this.$toast.text('两次密码不相同！')
        return
      }
      if(isPoneAvailable(this.tel)){
        this.$toast.text('手机号码格式不正确！')
        return
      }
      let that = this;
      register({name: this.name, pwd: this.pwd}).then(e => {
        if (e.code === 5001) {
          this.$toast.text(e.msg)
        } else {
          this.$dialog({
            content: e.msg,
            closeBtn: false,
            noCancelBtn: true,
            cancelAutoClose: false,
            onOkBtn () {
              this.close()
            },
            closeCallback () {
              //对话框关闭回调函数，无论通过何种方式关闭都会触发
              that.$router.replace('/login')
            }
          })
        }

      })
    }
  }
}
</script>

<style scoped>
.from-text{
  margin-right: 16px;width: 120px;
}
.required::before {
  content: "*";
  color: red;
}
</style>
