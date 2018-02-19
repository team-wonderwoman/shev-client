<template>
  <div>
    <router-link to="/">
      <img class="logo" src="../assets/logo.png" height="42" width="42" />
      <p class="shev">SHEV</p>
    </router-link>

    <div class="login-form">
      <span class="login-form-title">로그인</span>

      <p class="warn" v-if="showLoginFail">이메일과 비밀번호를 확인해주세요.</p>

      <div class="wrap-input">
        <input class="input100" type="text" name="email" placeholder="Email" v-model="login_email" @keyup.enter="loginPost()">
      </div>

      <div class="wrap-input">
        <input class="input100" type="password" name="pass" placeholder="Password" v-model="login_password" @keyup.enter="loginPost()">
      </div>

      <div class="container-login-form-btn">
          <button class="login-form-btn" @click="loginPost()">LOGIN</button>
      </div>

      <a href="" class="btn-login">
        Login with Google
      </a>

      <div class="flex-col-c">
        <span class="txt2">
          Don't have an account?
        </span>

        <router-link to="/signup" class="txt3 hov1">
          SIGN UP NOW
        </router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'login',
  data: function () {
    return {
      login_id: 0,
      login_email: '',
      login_password: '',
      showLoginFail: false,
      response_code: 0
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    loginPost: function (login_id, login_email, login_name, login_password) {
      var vm = this
      this.$axios.post('http://192.168.0.24:8000/api/accounts/login/',
        {
          user_email: this.login_email,
          password: this.login_password
        })
        .then((response) => {
          console.log(response.data.result.data)
          vm.result = response.data.result.data
          this.response_code = response.data.result.code
          if (response.data.result.code === 2401 || response.data.result.code === 2402 || response.data.result.code === 2403) {
            this.showLoginFail = true
          } else {
            localStorage.setItem('Token', vm.result.Token)
            localStorage.setItem('user_id', vm.result.User_id)
            this.$store.commit('login', {login_id: vm.result.User_id, login_email: this.login_email, login_name:vm.result.user_name, login_password: this.login_password})
            this.$router.push('/main/')
          }
        })
        .catch((ex) => {
          console.log('ERROR: ' + ex)
          if (ex.status === 404) {
            this.showLoginFail = true
            this.login_email = ''
            this.login_password = ''
          }
        })
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
  margin-top: 5%;
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

.warn {
  color: #c80000;
  text-align: center;
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
</style>
