<template>
  <div class="topictopic">
    <div class="topictitle">
      <h3>Topics</h3>
      <button class="addbutton" @click="showAddTopic=true">+</button>
    </div>

    <topic-pop v-if="showAddTopic" @close="showAddTopic=false"></topic-pop>

    <div class="topictotal">
        <ul class="topics">
          <li class="topic" v-for="(topic, index) in group.topic_list" v-bind:key="index">
            <span @click="moveTopic(topic.id)">{{ topic.topic_name }}</span>
            <img class="pencil" src="../assets/pencil.png" height="25" width="25" @click="showEditTopic=true; topic_id=topic.id"/>
            <topic-edit v-if="showEditTopic" @close="showEditTopic=false"></topic-edit>
          </li>
        </ul>
    </div>
  </div>
</template>

<script src="http://code.jquery.com/jquery-3.3.1.js"></script>

<script type="text/javascript">
import eventBus from './EventBus.vue'
import TopicPop from './TopicPop.vue'
import TopicEdit from './TopicEdit.vue'

export default {
  created: function () {
    eventBus.$on('add-topic', this.addTopic)
    eventBus.$on('edit-topic', this.editTopic)

  },
  data: function () {
    return {
      showAddTopic: false,
      showEditTopic: false,
      topic_id: 0,
      result: null
    }
  },
  props: [ 'topiclist' ],
  computed: {
    user () {
      return this.$store.state.user
    },
    group () {
      return this.$store.state.group
    }
  },
  components: { TopicPop, TopicEdit },
  methods: {
    addTopic: function (txt) {
      if (txt !== '') {
        var vm = this
        this.$axios.post('http://192.168.0.33:9000/api/group/' + this.group.group_id + '/topics/',
          {
            topic_name: txt,
            first_topic_id: this.group.topic_list[0].id
          },
          {headers: { 'Authorization': 'Token ' + localStorage.getItem('Token') }}
          )
          .then((response) => {
            console.log(response)
            vm.result = response.data
            // var data = {
            //   id: vm.result.id,
            //   topic_name: txt
            // }
            // this.$store.commit('addTopic', {data: data})
          })
          .catch((ex) => {
            console.log('ERROR: ' + ex)
          })
      }
    },
    editTopic: function (txt) {
      if (txt !== '') {
        var vm = this
        this.$axios.put('http://192.168.0.33:9000/api/group/' + this.group.group_id + '/topics/' + this.topic_id + '/',
          {
            topic_name: txt
          },
          {headers: { 'Authorization': 'Token ' + localStorage.getItem('Token') }}
          )
          .then((response) => {
            console.log(response)
            vm.result = response.data
          })
          .catch((ex) => {
            console.log('ERROR: ' + ex)
          })
      }
    },
    moveTopic: function (id) {
      var data_leave = {
        'command': 'leave',
        'roomtype': this.user.current_type,
        'room': this.user.current_roomid
      }
      this.group.ws.send(JSON.stringify(data_leave))
      this.topic_id = id
      var data_join = {
        'command': 'join',
        'roomtype': 'topics',
        'room': this.topic_id
      }
      this.$store.commit('moveRoom', {current_type: 'topics', current_roomid: this.topic_id})
      this.group.ws.send(JSON.stringify(data_join))

      eventBus.$emit('move-room')
    }
  }
}
</script>

<style scoped>
.topictopic {
  height: 222px;
}

.topictotal {
  height: 170px;
  width: 100%;
  overflow-y: scroll;
  float: left;
  z-index: 0;
  border-bottom: 1px solid #bfbfbf;
}

.topictitle {
  width: calc(100% - 20px);
  height: 50px;
  padding-left: 20px;
  border-bottom: 1px solid #bfbfbf;
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

.topictitle h3{
  float: left;
  margin-top: 14px;
  margin-bottom: 0;
  font-size: 17px;
  font-weight: 400;
}

.topic-wrapper {
  overflow: scroll;
}

.topics {
  margin-top: 10px;
  min-height: 50%;
  list-style-type: none;
  padding: 0;
}

.topics .topic {
  position: relative;
  padding: 12px 10% 16px;
  cursor: pointer;
  background-color: #fff;
}

.topics img {
  float: right;
  display: block;
  /*display: none;*/
}
</style>
