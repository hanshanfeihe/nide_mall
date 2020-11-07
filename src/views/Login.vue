<template>
  <div id="login">
    <!-- <h1>用户登录</h1> -->
    <div class="logo">
      <img src="../assets/images/logo1.png" />
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="mobile"
        label="手机号码"
        label-width="7.2em"
        placeholder="输入手机号码"
        :rules="[{ validator, required: true, message: '手机号码格式错误' }]"
      />
      <van-field
        v-model="password"
        type="password"
        label-width="7.2em"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ pattern, required: true, message: '密码长度在6~13位之间' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      mobile: '15323807318',
      password: '123456',
      pattern: /^\d{6,13}$/
    }
  },
  methods: {
    async onSubmit (values) {
      console.log(values)
      const { data: res } = await this.$http.post('/auth/loginByMobile', { mobile: values.mobile, password: values.password })
      console.log(res)
      if (res.errno === 0) {
        window.localStorage.setItem('token', res.data.sessionKey)
        window.localStorage.setItem('nideShopUser', res.data.mobile)
        this.$toast.success('登录成功')
        this.$router.push('/home')
      } else {
        this.$toast.fail('登录失败')
        console.log(res.errmsg)
      }
    },
    validator (val) {
      console.log(val)
      return /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(val)
    }
  }
}
</script>
<style lang="less" scoped>
#login{
  background-color: #fff;
  .logo{
    margin-top: 5rem;
  }
  .van-form{
    margin-top: 8rem;
  }
}
</style>
