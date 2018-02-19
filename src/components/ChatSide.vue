<template>
  <div>
    <div id='left'>
      <div class="base">
        <current-group></current-group>
        <user></user>
        <topics></topics>
        <chats></chats>
        <div class="addmember" @click="showAddMember=true">
          <span>그룹에 멤버 추가하기</span>
        </div>
      </div>
    </div>
    <add-member v-if="showAddMember===true" @close="showAddMember=false"></add-member>
    <router-view></router-view>
  </div>
</template>



<script type="text/javascript">
import CurrentGroup from './CurrentGroup.vue'
import User from './User.vue'
import Topics from './Topics.vue'
import Chats from './Chats.vue'
import AddMember from './AddMember'

export default {
  name: 'chat-side',
  data: function () {
    return {
      showAddMember: false,
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    group () {
      return this.$store.state.group
    },
    DEBUG () {
      return this.$store.state.DEBUG
    }
  },
  created: function () {
    if (!this.DEBUG) {
      var vm = this
      this.$axios.get('http://192.168.0.33:9000/api/group/' + this.group.group_id + '/' + this.user.user_id + '/',
        {headers: { 'Authorization': 'Token ' + localStorage.getItem('Token') }}
      )  //group/group_id/user_id
        .then((response) => {
          vm.result = response.data.result.data
          console.log(vm.result)
          this.$store.commit('getLists', {topic_list: vm.result.topic_list, chat_list: vm.result.chatroom_list})
          this.$store.commit('moveRoom', {current_type: 'topics', current_roomid: this.group.topic_list[0].id})

          var data_join = {
            'command': 'join',
            'roomtype': 'topics',
            'room': this.group.topic_list[0].id
          }
          this.group.ws.send(JSON.stringify(data_join))
        })
        .catch((ex) => {
          console.log(ex)
        })
    }
  },
  components: { CurrentGroup, User, Topics, Chats, AddMember }
}
</script>

<style>
#left {
  position: fixed;
  float: left;
  height: 100%;
  width: 250px;
  background-color: #fff;
  border-right : 1px solid #bfbfbf;
  z-index: 1;
}

.base {
  height: 100%;;
  background-color: #fff;
}

.addmember {
  position: absolute;
  height: 20px;
  bottom: 15px;
  left: 55px;
  cursor: pointer;
  background-color: #fff;
  border-top: 1px solid #bfbfbf;
  padding-top: 15px;
}

</style>
