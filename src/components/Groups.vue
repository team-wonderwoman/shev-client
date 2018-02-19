<template>
  <div>
    <router-link to="/">
      <img class="logo" src="../assets/logo.png" height="42" width="42" />
      <p class="shev">SHEV</p>
    </router-link>

    <div class="groupuser" @click="showEditProfile=true">
      <img class="profile" src="../assets/User_Circle.png" alt=""/>
      <img class="pencil" src="../assets/pencil.png" height="25" width="25"/>
      <h3>{{ user.user_name }}</h3>
      <p>{{ user.user_email }}</p>
      <button class="logout-button" @click="logoutPost()">로그아웃</button>
    </div>

    <edit-profile v-if="showEditProfile" @close="showEditProfile=false"></edit-profile>

    <ul class="groups">
      <li class="group" v-for="(g, index) in user.group_list" v-bind:key="index">
        <div @click="moveGroup(g.id)">
          <router-link to="/group1/topic1">
            {{ g.group_name }}
          </router-link>

          <button v-if="g.manager_id===user.user_id" @click="editGroup(g.id, index)">
            그룹 삭제
          </button>

          <button v-else @click="remove(g.id, index)">
            그룹 탈퇴
          </button>

        </div>
      </li>
    </ul>

    <div class="addgroup" @click="showAddGroup=true">
      <p>
        + 그룹 만들기
      </p>
    </div>

    <group-pop v-if="showAddGroup" @close="showAddGroup=false"></group-pop>

  </div>
</template>

<script type="text/javascript" src='{% static "reconnecting-websocket.min.js" %}'></script>

<script type="text/javascript">
import GroupPop from './GroupPop.vue'
import EditGroup from './EditGroup.vue'
import EditProfile from './EditProfile.vue'
import eventBus from './EventBus.vue'

export default {
  name: 'groups',
  created: function (group_list) {
    eventBus.$on('add-group', this.addGroup)
    eventBus.$on('edit-group', this.editGroup)
    eventBus.$on('remove-group', this.removeGroup)

    var vm = this
    this.$axios.get('http://192.168.0.33:9000/api/group/' + localStorage.getItem('user_id') + '/', {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('Token') }
    })
      .then((response) => {
        console.log("get response data")
        console.log(response.data.result.data)
        vm.result = response.data.result.data
        this.$store.commit('setGroups', {group_list: vm.result})
      })
      .catch((ex) => {
        console.log('ERROR: ' + ex)
      })
  },
  data: function () {
    return {
      showAddGroup: false,
      showEditGroup: false,
      showEditProfile: false,
      group_id: 0,
      result: null
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
  components: { GroupPop, EditGroup, EditProfile },
  methods: {
    remove: function (id, index) {
      if (confirm('정말 탈퇴하시겠습니까?')) {
        this.$store.commit('remove', {index: index})
        this.$axios.delete('http://192.168.0.24:9000/api/group/' + this.user.user_id + '/' + id + '/exit/', {
          headers: {'Authorization': 'Token ' + localStorage.getItem('Token') }
        })
          .then((response) => {
            console.log(response)
          })
          .catch((ex) => {
            console.log('ERROR: ' + ex)
          })
      }
    },
    addGroup: function (data) {
      this.$store.commit('addGroup', {data: data})
    },
    editGroup: function (id, index) {  // admin remove group 
      this.$axios.delete('http://192.168.0.33:9000/api/group/' + this.user.user_id + '/' + id +'/delete/', {
        headers: { 'Authorization': 'Token ' + localStorage.getItem('Token') }
      })
        .then((response) => {
          console.log(response)
          this.$store.commit('removeGroup', {index: index})
        })
        .catch((ex) => {
          console.log(ex)
        })
    },
    logoutPost: function () {
      this.$axios.get('http://192.168.0.24:8000/api/accounts/logout/', {
        headers: {'Authorization': 'Token ' + localStorage.getItem('Token')}
      })
        .then((response) => {
          console.log(response)
        })
        .catch((ex) => {
          console.log('ERROR: ' + ex)
        })
      this.$router.push('/login/')
    },
    moveGroup: function (id) {
      this.group_id = id
      if (!this.DEBUG) {
        this.$store.commit('moveGroup', {group_id: this.group_id})
        this.$store.commit('setWebsocket', {group_id: this.group_id})
      } else {
        this.$store.commit('moveGroup', {group_id: 6})
      }
    }
  }
}
</script>

<style scoped>
#right {
  position: relative;
  height: 100%;
}

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
  text-decoration: none;
}

.groupuser {
  position: relative;
  margin: auto;
  margin-top: 20px;
  height: 50px;
  width: 400px;
}

.groupuser h3 {
  margin: 0;
}

.groupuser p {
  margin: 2px;
}

.groupuser .profile {
  float: left;
  width: 40px;
  height: 40px;
  margin-right: 12px;
  border: 1px solid #e6e6e6;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.pencil {
  float: right;
  right: 25px;
  margin-top: 8px;
}

.logout-button {
  position: relative;
  float: right;
  right: 35px;
  font-weight: bold;
  bottom: 37px;
  border: 1px solid #bfbfbf;
  border-radius: 10px;
  color: #bfbfbf;
  font-size: 12px;
}

.groups {
  margin-top: 50px;
  list-style-type: none;
  padding: 0;
}

.group {
  height: 60px;
  width: 400px;
  background-color: #fff;
  margin: auto;
  border: 1px solid #bfbfbf;
  box-shadow: 5px;
  margin-bottom: 20px;
}

.group div {
  padding-top: 20px;
  padding-left: 20px;
  font-weight: bold;
  left: 15px;
}

.group button {
  float: right;
  right: 8px;
  font-weight: bold;
  position: relative;
  border: 1px solid #bfbfbf;
  border-radius: 10px;
  color: #bfbfbf;
  font-size: 12px;
}

.addgroup {
  height: 60px;
  width: 400px;
  margin: auto;
  border: 1px dotted #bfbfbf;
  text-align: center;
  /*vertical-align: center;*/
}

.addgroup p {
  margin-top: 20px
}
</style>
