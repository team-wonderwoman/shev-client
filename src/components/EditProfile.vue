<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <h3>프로필 수정하기</h3>
          </div>

          <div class="modal-body">
            <div>
              <input type="text" name="editname" :placeholder="user.user_name" v-model="newname" />
            </div>
            <br />

            <div>
              <input type="text" name="editemail" :placeholder="user.user_email" v-model="newemail" />
            </div>
            <br />

            <div>
              <input type="password" name="editpass" :placeholder="user.user_password" v-model="newpass" />
            </div>
            <br />

            <div>
              <input type="text" name="editphone" :placeholder="user.user_tel" v-model="newtel" />
            </div>
          </div>

          <div class="modal-footer">
            <button class="modal-default-button" @click="editPost(); $emit('close')">수정하기</button>
            <button class="modal-default-button" @click="$emit('close'); signOut()">계정 삭제하기</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/javascript">
export default {
  name: 'edit-profile',
  data: function () {
    return {
      newname: '',
      newemail: '',
      newpass: '',
      newtel: '',
      user_id: 1,
      result: null
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    editPost: function () {
      var vm = this
      this.$axios.post('http://192.168.0.24:8000/api/profile/' + this.user_id,
        {
          user_name: this.newname,
          user_email: this.newemail,
          password: this.newpass,
          user_tel: this.newphone
        })
        .then((response) => {
          console.log(response)
          vm.result = response.data
        })
        .catch((ex) => {
          console.log(ex)
        })
    },
    signOut: function () {
      this.$axios.get('http://192.168.0.24:8000/api/' + this.user.user_id + '/signout/', {
        headers: {'Authorization': 'Token ' + localStorage.getItem('Token')}
      })
        .then((response) => {
          console.log(response)
        })
        .catch((ex) => {
          console.log(ex)
        })
      this.$router.push('/login/')
    }
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  z-index: 500;
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  z-index: 500;
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
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

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
