<template>
  <div id='right'>
    <banner></banner>
    
    <div id="scrollpage" class="messagebox" @scroll="scrollUpdate()">
      <ul class="bubbles" id="bubbles">
        <transition-group name="slide-fade" id="slide-fade">
          <li v-for="(a, index) in messages" v-bind:key="index">
            <div v-if="!a.is_file">
              <img class="userimage" src="../../static/User_Circle.png" alt=""/>
              <div class="username">{{ a.sender }}</div><br/>
              <span class="bubble">{{ a.contents }}</span>
              <span class="time">{{ a.created_time.slice(11, 16) }}</span>
            </div>
            <div v-else>
              <img class="userimage" src='../../static/User_Circle.png' alt='' />
              <div class="username">{{ a.sender }}</div><br/>
              <div class="file-bubble">
                <!-- <div class="filetype-div"> -->
                  <img class="filetype" v-if="fileInfo(a)[1]==='pdf'" src='../../static/pdf.png' />
                  <img class="filetype" v-else-if="fileInfo(a)[1]==='jpg'" src='../../static/jpg.png' />
                  <img class="filetype" v-else-if="fileInfo(a)[1]==='pptx'" src='../../static/ppt.png' />
                  <img class="filetype" v-else src='../../static/file.png' />
                <!-- </div> -->
                <p>{{ a.contents }}</p>
                <img class="download" src='../../static/download.png' height="20" width="20" v-on:click='fileDownload(a.id)' />
              </div>
              <span class="time">{{ a.created_time.slice(11, 16) }}</span>
            </div>
          </li>
        </transition-group>
      </ul>
    </div>

    <div class="writewrite">
      <form method="post" enctype="multipart/form-data">
        <div class="fileupload-div">
          <label for="fileupload" class="fileupload-label">+</label>
          <input type="file" ref="photofile" id="fileupload" name="file" @change="filesChange()" />
        </div>
      </form>

      <div class="write">
        <textarea type="text" v-model.trim="message" @keyup.enter="sendMessage" placeholder="메세지를 입력하세요.(Shift + Enter로 줄바꿈이 가능합니다.)"></textarea>
        <button @click="sendMessage">SEND</button>
      </div>
    </div>
  </div>
</template>

<script src="http://code.jquery.com/jquery-3.3.1.js"></script>
<script type="text/javascript" src='{% static "reconnecting-websocket.min.js" %}'></script>

<script type="text/javascript">
import Banner from './Banner.vue'
import eventBus from './EventBus.vue'

export default {
  name: 'chat-box',

  created: function () {
    if (!this.DEBUG) {
      eventBus.$on('init', this.init)
      eventBus.$on('send', this.send)
/////////////////////////////////////////////////////////////////////////////////////////////////////////
      this.group.ws.onmessage = function (message) {
        var data = JSON.parse(message.data)
        console.log(data)

        if (data.leave != undefined) { // 방을 떠날 때
          console.log('leave room')
        } else if (data.msg_type === 0) { // 메세지를 하나 입력했을 때, 브로드캐스팅
          var msg = {
            contents: data.message.contents,
            created_time: data.message.created_time,
            id: data.message.id,
            is_file: data.message.is_file,
            sender: data.username,
            topic_id: data.message.topic_id,
            user_id: data.message.user_id
          }

          eventBus.$emit('send', msg)

        } else if (data.msg_type !== 4 && data.msg_type !== 5) { // 방에 처음 들어갔을 때, 기존의 데이터를 불러옴.
          this.ws_messages = data.message.messages_serializer

          console.log("message input: ")
          console.log(this.ws_messages)
          console.log('--------------------------------')

          eventBus.$emit('init', this.ws_messages)
        }
      }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

      this.group.ws.onopen = function (event) {
        console.log("Connected to chat socket")
      }

      this.group.ws.onclose = function (event) {
        console.log("Websocket disconnected")
      }

      $(document).ready(function () {
        var boxHeight = $(window).height() - 174
        $('#scrollpage').css({'height': boxHeight})
      })
    } else {  //DEBUG MODE
      // console.log('User pk: ' + this.user.user_id)
      this.messages = [
        {sender: 'yegi1', contents: 'hello', is_file: false},
        {sender: 'yegi2', contents: 'hahahahaha', is_file: false},
        {sender: 'yegi1', contents: 'Wonderwoman pmp.pdf', is_file: true}
      ]

      $(document).ready(function () {
        var boxHeight = $(window).height() - 174
        $('#scrollpage').css({'height': boxHeight})
      })
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
  data: function () {
    return {
      message: '',
      ws_messages: [],
      messages: [],
      result: null,
      file_id: 0
    }
  },
  methods: {
    sendMessage: function (e) {
      if (e.shiftKey) {
        e.preventDefault()
      } else {
        if (!this.DEBUG) {
          if (this.message !== '') {
            this.group.ws.send(JSON.stringify({
              'command': 'send',
              'roomtype': this.user.current_type,
              'room': this.user.current_roomid,
              'sender': this.user.user_id,
              'message': this.message
            }))
            this.message = ''
          }
        } else {
          this.messages.push({sender: 'yegi', contents: this.message})
          this.message = ''
        }
      }
    },
    scrollUpdate: function () {
      var elem = $('#scrollpage')

      if (elem.scrollTop() === 0) {
        console.log('Now scroll is top')
        $('.messagebox').scrollTop('300')
      }
    },
    filesChange: function () {
      var data = new FormData()
      var file = this.$refs.photofile.files[0]

      console.log(file)
      data.append('file', file)
      data.append('user', this.user.user_id)
      console.log(data)

      this.$axios.post('http://192.168.0.33:9001/api/upload/topics/' + this.user.current_roomid + '/', data,
        {headers: { 'Authorization': 'Token ' + localStorage.getItem('Token') }})
      // this.$axios.post('http://192.168.0.33:9001/api/upload/topics/' + 12 + '/', data)
        .then((response) => {
          this.result = response.data
          console.log(response)
          console.log('axios(file) success')
        })
        .catch((ex) => {
          console.log('ERROR: ' + ex)
          console.log('axios(file) error')
        })
    },
    fileDownload: function (id) {
      this.$axios.get('http://192.168.0.33:9001/api/download/topics/' + this.user.current_roomid + '/' + id + '/',
      // this.$axios.get('http://192.168.0.33:9001/api/download/topics/' + 12 + '/' + 69 + '/',
        {responseType: 'blob',
          headers: { 'Authorization': 'Token ' + localStorage.getItem('Token') }
        })
      .then((response) => {
        console.log(response)
        console.log(response.headers)
        console.log(response.request.getResponseHeader('Content-Disposition'))
        var filename = response.request.getResponseHeader('Content-Disposition').slice(22, -1)
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
      }).catch((ex) => {
        console.log('ERROR ' + ex)
      })
    },
    fileInfo: function (a) {
      return a.contents.split('.')
    },
    init: function (msg) {
      console.log('---------init room----------')
      this.messages = msg
    },
    send: function (msg) {
      this.messages.push(msg)
    }
  },
  components: { Banner }
}
</script>

<style>
#right {
  position: relative;
  float: right;
  height: 100%;
  width: calc(99.9% - 250px);
  z-index: 0;
}

.messagebox {
  position: relative;
  width: 100%;
  background-color: #f1f9f5;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  bottom: 90px;
  top: 63px;
}

#old-bubbles {
  position: relative;
}

.bubbles {
  position: relative;
  padding-left: 20px;
  margin: 0;
  padding-top: 10px;
  list-style-type: none;
}

.userimage{
  float: left;
  width: 40px;
  height: 40px;
  vertical-align: middle;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.username {
  display: inline-block;
  vertical-align: top;
  margin-left: 12px;
  margin-bottom: 4px;
  font-size: 15px;
}

.bubble {
  font-size: 16px;
  position: relative;
  display: inline-block;
  clear: both;
  margin-bottom: 12px;
  margin-left: 10px;
  padding: 13px 14px;
  vertical-align: bottom;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  color: #1a1a1a;
  background-color: #fff;
  -webkit-align-self: flex-start;
  align-self: flex-start;
  max-width: 75%;
  white-space: pre-wrap;
  word-break: break-all;
}

.file-bubble {
  font-size: 16px;
  position: relative;
  display: inline-block;
  clear: both;
  margin-bottom: 12px;
  margin-left: 10px;
  padding: 13px 14px;
  vertical-align: bottom;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  color: #1a1a1a;
  background-color: #fff;
  -webkit-align-self: flex-start;
  align-self: flex-start;
  /*max-width: 75%;*/
  width: 350px;
  white-space: pre-wrap;
  word-break: break-all;
}

.file-bubble p {
  position: relative;
  float: left;
  margin-left: 10px;
}

.time {
  position: relative;
  font-size: 13px;
  bottom: 17px;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-enter {
  transform: translateY(10px);
  opacity: 0;
}

.writewrite {
  position: fixed;
  bottom: 0;
  width: calc(100% - 250px);
  height: 110px;
  border-top: 1px solid #bfbfbf;
}

.fileupload-div {
  height: 35px;
  width: 35px;
  border: 1px solid #bfbfbf;
  border-radius: 50%;
  margin-top: 10px;
  margin-left: 12px;
}

#fileupload {
  opacity: 0;
}

.fileupload-label {
  color: #bfbfbf;
  font-size: 30px;
  font-weight: 340;
  margin-left: 9px;
}

.filetype-div {
  margin: auto;
  height: 60px;
  width: 50px;
}

.filetype {
  position: relative;
  height: 40px;
  width: 40px;
  float: left;
  margin-top: 5px;
}

.download {
  position: relative;
  float: right;
  left: 6px;
  top: 35px;
}

.write {
  position: fixed;
  bottom: 13px;
  left: 310px;
  height: 84px;
  padding-left: 8px;
  border: 1px solid #bfbfbf;
  background-color: #fff;
  width: calc(100% - 330px);
  min-width: 500px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  z-index: 0;
}

.write textarea {
  font-size: 16px;
  float: left;
  width: calc(100% - 300px);
  height: 60px;
  padding: 10px 10px;
  color: #1a1a1a;
  border: 0;
  outline: none;
  background-color: #fff;
  font-weight: 400;
  resize: none;
  overflow: auto;
  white-space: pre-wrap;
}

.write button {
    font-weight: bold;
    position: fixed;
    border: 2px solid #bfbfbf;
    border-radius: 5px;
    color: #bfbfbf;
    font-size: 12px;
    margin-top: 14px;
    right: 23px;
    bottom: 24px
}
</style>
