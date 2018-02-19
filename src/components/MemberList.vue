<template>
  <div class="modal-wrapper">
    <div class="modal-container">
      <div class="modal-body">
        <ul class="members">
          <li v-for="(mem, index) in group.member_list" v-bind:key="index">
            {{ mem.user_name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'member-list',
  data: function () {
    return {
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
  created: function () {
    var vm = this
    this.$axios.get('http://192.168.0.33:9000/api/group/' + this.group.group_id + '/members/',
      {headers: { 'Authorization': 'Token ' + localStorage.getItem('Token') }}
    )
      .then((response) => {
        console.log(response.data)
        vm.result = response.data.result.data
        this.$store.commit('setMembers', {member_list: vm.result})
      })
      .catch((ex) => {
        console.log('ERROR: ' + ex)
      })
  }
}
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  width: 150px;
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

.modal-body {
  margin: 20px 0;
}

.modal-body .members {
  list-style-type: none;
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
