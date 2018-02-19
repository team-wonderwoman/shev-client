<template>
  <div class="modal-wrapper">
    <div class="modal-container">

      <div class="modal-header">
        <img src="../assets/User_Circle.png" alt=""/>
        <h3>{{ user.user_name }}</h3>
        <!-- <button @click="showEditProfile=true">회원정보 수정</button> -->
      </div>

      <edit-profile v-if="showEditProfile" @close="showEditProfile=false"></edit-profile>

      <div class="modal-body">
        <span>Email</span><br />
        <span>{{ user.user_email}}</span><br /><br />
        <span>Phone#</span><br />
        <span>{{ user.user_tel }}</span>
      </div>

      <button @click="logoutPost()">로그아웃</button>
    </div>
  </div>
</template>

<script type="text/javascript">
import EditProfile from './EditProfile.vue'

export default {
  name: 'user-info',
  data: function () {
    return {
      showEditProfile: false,
      user_id: 1,
      result: null
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  created: function () {
    var vm = this
    // this.$axios.get('http://192.168.0.24:8000/api/profile/' + this.user_id)
    //   .then((response) => {
    //     console.log(response)
    //     vm.result = response.data
    //   })
    //   .catch((ex) => {
    //     console.log('ERROR: ' + ex)
    //   })
  },
  methods: {
    logoutPost: function () {
      this.$axios.get('http://192.168.0.24:8000/api/accounts/logout/', {
        headers: {'Authorization': 'Token ' + localStorage.getItem('Authorization')}
      })
        .then((response) => {
          console.log(response)
        })
        .catch((ex) => {
          console.log('ERROR: ' + ex)
        })
      this.$router.push('/login/')
    }
  },
  components: { EditProfile }
}
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  width: 150px;
  /*display: table-cell;*/
  /*vertical-align: middle;*/
  z-index: 2;
  margin-left: 231px;
  bottom: calc(100%-50px);
}

.modal-container {
  width: 100%;
  margin: 0px auto;
  padding: 20px 30px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 0 4px rgba(0, 0, 0, .33);
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header img {
  float: left;
  width: 40px;
  height: 40px;
  margin-right: 12px;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  z-index: 1;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
  line-height: 40px;
  font-weight: 600;
  z-index: 1;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
</style>
