<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <h3>새 채팅 만들기</h3>
          </div>

          <select class="select" v-model="selected" multiple="multiple">
            <option v-for="(member, index) in group.member_list" v-if="member.user_name!=user.user_name" v-bind:key="index" v-bind:value="member">{{ member.user_name }}</option>
          </select>

          <ul class="selected">
            <li v-for="(member, index) in this.selected" v-bind:key="index">{{ member.user_name }}</li>
          </ul>

          <div class="modal-footer">
            <button class="modal-default-button" @click="$emit('close'); addChat()">Make</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/javascript">
import eventBus from './EventBus.vue'

export default {
  name: 'chat-pop',
  data: function () {
    return {
      selected: []
    }
  },
  created: function () {
    var vm = this
    this.$axios.get('http://192.168.0.33:9000/api/group/' + this.group.group_id + '/members/',
      {headers: { 'Authorization': 'Token ' + localStorage.getItem('Token') }})
      .then((response) => {
        console.log(response.data)
        vm.result = response.data.result.data
        this.$store.commit('setMembers', {member_list: vm.result})
      })
      .catch((ex) => {
        console.log('ERROR: ' + ex)
      })
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
    addChat: function () {
      console.log("selected list at chat pop")
      console.log(this.selected)
      eventBus.$emit('add-chat', this.selected)
      this.selected = []
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
  height: 150px;
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
  bottom: 10px;
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

.select {
  float: left;
  left: 50px;
}

.selected {
  float: left;
}
</style>
