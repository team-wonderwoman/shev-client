<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <h3>그룹 멤버 추가하기</h3>
          </div>

          <div class="modal-body">
            <slot name="body">
              <input type="text" name="memberemail" placeholder="Enter Email" v-model="email">
            </slot>
          </div>

          <div class="modal-footer">
            <button class="modal-default-button" @click="mailPost(); $emit('close')">Send email</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/javascript">
export default {
  name: 'add-member',
  data: function () {
    return {
      email: '',
      group_id: 1,
      result: null
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    group () {
      return this.$store.state.group
    }
  },
  methods: {
    mailPost: function () {
      if (this.email !== '') {
        var vm = this
        this.$axios.post('http://192.168.0.33:9000/api/group/' + localStorage.getItem('user_id') + '/invitation/',
          {
            group_id: this.group.group_id,
            members: this.email
          },
          {
            headers: { 'Authorization': 'Token ' + localStorage.getItem('Token') }
          })
          .then((response) => {
            console.log(response)
            vm.result = response.data
          })
          .catch((ex) => {
            console.log('ERROR: ' + ex)
          })
      }
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
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
