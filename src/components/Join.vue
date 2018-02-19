<template>
  <div>
    <router-link to="/">
      <img class="logo" src="../assets/logo.png" height="42" width="42" />
      <p class="shev">SHEV</p>
    </router-link>

    <div class="login-form">
      <span class="login-form-title">회원가입</span>

      <div class="wrap-input">
        <input class="input100" type="text" name="email" placeholder="Email" v-model="user_email">
      </div>
      <p class="emailcheck" v-if="showEmailCheck">이미 존재하는 이메일입니다.</p>

      <div class="wrap-input">
        <input class="input100" type="text" name="user_name" placeholder="Name" v-model="user_name">
      </div>

      <div class="wrap-input">
        <input class="input100" type="password" name="pass" placeholder="Password" v-model="password">
      </div>

      <div class="wrap-input">
        <input class="input100" type="password" placeholder="Password Confirmation" v-model="password_confirm">
      </div>
      <p class="passwordconfirm" v-if="showPassConfirm">비밀번호가 일치하지 않습니다.</p>

      <div class="wrap-input">
        <input class="input100" type="text" name="user_tel" placeholder="Phone number(이 항목은 필수가 아닙니다.)" v-model="user_tel">
      </div>

      <div class="container-login-form-btn">
          <button class="login-form-btn" @click="joinPost()">회원가입하기</button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'Join',
  data: function () {
    return {
      user_email: '',
      password: '',
      password_confirm: '',
      user_name: '',
      user_tel: '',
      result: null,
      showPassConfirm: false,
      showEmailCheck: false
    }
  },
  methods: {
    joinPost: function () {
      if (this.password !== this.password_confirm) {
        this.showPassConfirm = true
      } else {
        var vm = this
        this.$axios.post('http://192.168.0.24:8000/api/accounts/signup/',
          {
            user_email: this.user_email,
            password: this.password,
            user_name: this.user_name,
            user_tel: this.user_tel
          })
          .then((response) => {
            vm.result = response.data
            if (response.data.result.code === 1402) {
              this.showEmailCheck = true
            } else {
              console.log(response)
              this.$router.push('/login/')
            }
          })
          .catch((ex) => {
            console.log('ERROR: ' + ex)
            if (ex === 'Error: Request failed with status code 400') {
              this.showEmailCheck = true
            }
          })
      }
    }
  }
}
</script>

<style>
.logo {
  position: relative;
  margin-top: 30px;
  margin-left: 30px;
}

.shev {
  position: relative;
  font-size: 25px;
  font-weight: 300;
  float: right;
  right: calc(100% - 132px);
  margin-top: 37px;
}

.login-form {
  height: 100%;
  width: 30%;
  min-width: 260px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

.login-form-title {
  font-size: 27px;
  font-weight: 330;
  color: #43383e;
  line-height: 1.2;
  text-align: center;
  display: block;
  padding-bottom: 30px;
}

.wrap-input {
  width: 100%;
  background-color: #fff;
  position: relative;
  margin-bottom: 16px;
}

.input100 {
  font-size: 16px;
  color: #43383e;
  line-height: 1.2;
  width: calc(100% - 70px);
  position: relative;
  height: 62px;
  background: #fff;
  border-radius: 31px;
  padding-left: 35px;
  padding-right: 35px;
  border: 1px solid #929292;
}

.input100:focus {
  outline: none;
}

.container-login-form-btn {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.login-form-btn {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  min-width: 160px;
  height: 62px;
  background-color: transparent;
  border-radius: 31px;
  font-size: 16px;
  color: #fff;
  line-height: 1.2;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
  position: relative;
  z-index: 1;
}

.login-form-btn::before {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 31px;
  background-color: #333333;
  pointer-events: none;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.login-form-btn:hover:before {
  background-color: #222222;
  width: calc(100% + 20px);
}

.login-form-btn:focus {
  outline: none;
}

.btn-login {
  background-color: #e62e3f;
  font-size: 16px;
  color: #fff;
  line-height: 1.2;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  margin-top: 50px;
  margin-bottom: 10px;
}

.btn-login:hover {
  color: #fff;
  background-color: #333333;
}

.flex-col-c {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  -o-flex-direction: column;
  flex-direction: column;
  -ms-align-items: center;
  align-items: center;
  padding-top: 80px;
}

.txt2 {
  font-size: 16px;
  color: #999999;
  line-height: 1.4;
  padding-bottom: 10px;
}

.txt3 {
  font-size: 16px;
  color: #333333;
  line-height: 1.2;
  border-bottom: 1px solid #929292;
}

.emailcheck, .passwordconfirm {
  color: #c80000;
  text-align: right;
  font-size: 15px;
}

</style>
