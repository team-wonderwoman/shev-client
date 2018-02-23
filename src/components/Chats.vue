<template>
  <div class="chatchat">
    <div class="chattitle">
      <h3>Chats</h3>
      <button class="addbutton" @click="showAddChat=true">+</button>
    </div>

    <chat-pop v-if="showAddChat" @close="showAddChat=false"></chat-pop>

    <div class="chattotal">
      <ul class="chats">
          <li class="chat" v-for="(chat, index) in group.chat_list" v-bind:key="index" @click="moveChat(chat.id)">
              {{ listName(chat.chatRoomMember_name) }}
              <!-- {{ chat.chatRoomMember_name }} -->
              <img class="pencil" src="../assets/pencil.png" height="25" width="25"/>
          </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
import eventBus from './EventBus.vue'
import ChatPop from './ChatPop.vue'

export default {
  created: function () {
    eventBus.$on('add-chat', this.addChat)
  },
  data: function () {
    return {
      showAddChat: false,
      chat_id: 0,
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
  components: { ChatPop },
  methods: {
    addChat: function (selected) {
      var id_list = []
      var name_list = []
      for (var i=0; i<selected.length; i++) {
        id_list.push(selected[i].id)
        name_list.push(
          {member_name: selected[i].user_name}
        )
      }

      id_list.push(this.user.user_id)
      name_list.push({member_name: this.user.user_name})
      console.log(name_list)

      var vm = this
      this.$axios.post('http://192.168.0.33:9000/api/group/' + this.group.group_id + '/chatrooms/',
        {
          group_id: this.group.group_id,
          participants: id_list
        },
        {headers: { 'Authorization': 'Token ' + localStorage.getItem('Token') }}
        )
        .then((response) => {
          console.log(response)
          vm.result = response.data
          var data = {
              id: vm.result.id,
              chatRoomMember_name: name_list 
          }
          console.log(data)
          this.$store.commit('addChat', {data: data})
        })
        .catch((ex) => {
          console.log('ERROR: ' + ex)
        })
    },
    moveChat: function (id) {
      var data_leave = {
        'command': 'leave',
        'roomtype': this.user.current_type,
        'room': this.user.current_roomid
      }
      this.group.ws.send(JSON.stringify(data_leave))

      this.chat_id = id
      console.log('ChatRoom id is ' + this.chat_id)
      var data = {
        'command': 'join',
        'roomtype': 'chatrooms',
        'room': this.chat_id
      }
      this.$store.commit('moveRoom', {current_type: 'chatrooms', current_roomid: this.chat_id})
      this.group.ws.send(JSON.stringify(data))
    },
    listName: function (members) {
      var member_list = []
      for (var i = 0; i < members.length; i++) {
        member_list.push(members[i].member_name)
      }
      var member_string = member_list.join(', ')
      
      return member_string
    }
  }
}
</script>

<style>
.chatchat {
  height: 222px;
}

.chattotal {
  height: 170px;
  width: 100%;
  overflow-y: scroll;
  float: left;
}

.chattitle {
  width: calc(100% - 20px);
  height: 50px;
  padding-left: 20px;
  border-bottom: 1px solid #bfbfbf;
}

.chattitle h3{
  float: left;
  margin-top: 14px;
  margin-bottom: 0;
  font-size: 17px;
  font-weight: 400;
}

.addbutton {
  float: right;
  margin-top: 6px;
  margin-right: 5px;
  border: none;
  font-size: 25px;
  font-weight: 200;
  background-color: transparent;
}

.chats {
  margin-top: 10px;
  min-height: 50%;
  list-style-type: none;
  padding: 0;
}

.chats .chat {
  position: relative;
  padding: 12px 10% 16px;
  cursor: pointer;
  background-color: #fff;
}

.chats img {
  float: right;
  display: block;
  /*display: none;*/
}
</style>
