<template>
  <div>
    <van-nav-bar class="page-nav-bar" title="登录/注册" />
    <!-- 这个是登录表单 -->
    <van-form @submit="postUserMsg" ref="loginForm">
      <van-field
        v-model="userLogin.mobile"
        name="mobile"
        placeholder="输入手机号"
        :rules="userFormRules.mobile"
        maxlength="11"
        type="number"
      >
        <template v-slot:left-icon>
          <i class="toutiao toutiao-shouji iconfontsize"></i>
        </template>
      </van-field>
      <van-field
        v-model="userLogin.code"
        name="code"
        placeholder="输入验证码"
        :rules="userFormRules.code"
        maxlength="6"
        type="number"
      >
        <template v-slot:left-icon>
          <i class="toutiao toutiao-yanzhengma iconfontsize"></i>
        </template>
        <!-- 这个是发送验证码和倒计时的的按钮 -->
        <template #button>
          <!-- 倒计时 -->
          <van-button
            type="default"
            round
            size="mini"
            v-if="isCountDown"
            native-type="button"
            ><van-count-down
              :time="5000"
              format="ss 秒"
              @finish="isCountDown = false"
          /></van-button>
          <!-- 发送验证码 -->
          <van-button
            v-else
            class="send-msg-btn"
            round
            size="small"
            type="primary"
            native-type="button"
            @click="onSengMsg"
            >发送验证码</van-button
          >
        </template>
        <!-- /这个是发送验证码的按钮 -->
      </van-field>
      <div style="margin: 16px">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <!--/ 这个是登录表单 -->
  </div>
</template>
<script>
import { loginApi, sendMsgApi } from '@/api'
export default {
  name: 'login',
  created () { },
  data () {
    return {
      userLogin: {
        mobile: '',
        code: ''

      },
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          {
            pattern:
              /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号格式不正确'
          }
        ],
        code: [{ required: true, message: '验证码不能为空' }, {
          pattern:
            /^[0-9]{6}$/,
          message: '请输入六位短信验证码'
        }]
      },
      isCountDown: false
    }
  },
  methods: {
    async postUserMsg () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      const user = this.userLogin
      // console.log(this.userLogin)
      try {
        const res = await loginApi(user)
        console.log('登录成功', res)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          console.log('登录失败')
          this.$toast.fail('手机号或者验证码输入错误，登录失败')
        } else {
          console.log(err.message)
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    async onSengMsg () {
      try {
        // 通过 ref 可以获取到 Form 实例并调用实例方法， 第一步先校验一下手机号，
        await this.$refs.loginForm.validate('mobile')
        // 第二部，设置显示和隐藏
        this.isCountDown = true
        // 点击获取验证码之后，发起ajax请求
        const res = await sendMsgApi({ mobile: this.userLogin.mobile })
        console.log(res)
        this.$toast('发送成功！')
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试！')
        } else {
          this.$toast('发送失败，请稍后重试！')
        }
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>
<style lang="less" scoped>
.iconfontsize {
  font-size: 37px;
}
.send-msg-btn {
  width: 152px;
  height: 46px;
  color: rgb(102, 102, 102);
  background-color: rgb(237, 237, 237);
  border: none;
  .van-button__text {
    font-size: 22px;
  }
}
.login-btn {
  height: 88px;
  background-color: rgb(109, 180, 251);
  border: none;
  padding: 53px 28px;
  font-size: 30px;
}
</style>
