import Vue from 'vue'
import Vuex from 'vuex'
import ReconnectingWebSocket from './reconnecting-websocket.min.js'
// import Constant from '../constant'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      user_id: 1,
      user_email: 'pyg9715@gmail.com',
      user_name: 'yegi1',
      password: '1234',
      user_tel: '010-6349-3647',
      group_list: [],
      current_group: 0,
      current_type: 'topics',
      current_roomid: 1
    },
    group: {     // information about current group
      group_id: 0,
      member_list: [],
      topic_list: [{id: 1, topic_name: 'topic1'}, {id: 2, topic_name: 'topic2'}],
      chat_list: [],
      // messasge_list: [
      //   'a', 'b', 'c', 'd'
      // ],
      ws: null
    },
    DEBUG: false
  },
  mutations: {
    ['editProfile']: (state, payload) => {
      console.log('Vuex Mutation form edit profile')
    },
    ['login']: (state, payload) => {
      if (payload.login_email !== '' && payload.login_password !== '') {
        state.user.user_id = payload.login_id
        state.user.user_email = payload.login_email
        state.user.user_name = payload.login_name
        state.user.password = payload.login_password
      }
    },
    ['setGroups']: (state, payload) => {
      state.user.group_list = payload.group_list
    },
    ['moveGroup']: (state, payload) => {
      state.group.group_id = payload.group_id
      state.user.current_group = payload.group_id
    },
    ['getLists']: (state, payload) => {
      state.group.topic_list = payload.topic_list
      state.group.chat_list = payload.chat_list
    },
    ['setWebsocket']: (state, payload) => {
      state.group.ws = new ReconnectingWebSocket('ws://192.168.0.33:9000/api/group/' + payload.group_id + '/')
    },
    ['moveRoom']: (state, payload) => {
      state.user.current_type = payload.current_type
      state.user.current_roomid = payload.current_roomid
    },
    ['setMembers']: (state, payload) => {
      state.group.member_list = payload.member_list
    },
    ['remove']: (state, payload) => {
      state.user.group_list = state.user.group_list.splice(payload.index, 1)
    },
    ['removeGroup']: (state, payload) => {
      state.user.group_list = state.user.group_list.splice(payload.index, 1)
    },
    ['addGroup']: (state, payload) => {
      state.user.group_list.push(payload.data)
    },
    ['addTopic']: (state, payload) => {
      state.group.topic_list.push(payload.data)
    },
    ['addChat']: (state, payload) => {
      state.group.chat_list.push(payload.data)
    }
  }
})

export default store
