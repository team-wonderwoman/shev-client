<template>
  <div id="scrollpage" class="messagebox" @scroll="scrollUpdate()">
    <ul class="bubbles">
        <transition-group name="slide-fade">
          <li v-for="(a, index) in messages" v-bind:key="index">
            <img class="userimage" src="http://s13.postimg.org/ih41k9tqr/img1.jpg" alt=""/>
            <div class="username">{{ a.sender }}</div><br/>
            <span class="bubble">{{ a.contents }}</span>
          </li>
        </transition-group>
    </ul>
  </div>
</template>

<script src="http://code.jquery.com/jquery-3.3.1.js"></script>

<script type="text/javascript">
import eventBus from './EventBus.vue'

export default {
  created: function () {
    // eventBus.$on('send-message', this.sendMessage)
    eventBus.$on('get-messages', this.getMessages)

    // jQuery
    $(document).ready(function () {
      var boxHeight = $(window).height() - 174
      $('#scrollpage').css({'height': boxHeight})
    })
    // ws.onmessage = function (event) {
    //   console.log(event.data)
    // }
  },
  // updated: function () {
  //   $(document).ready(function () {
  //     $('#scrollpage').scroll
  //   })
  // },
  data: function () {
    return {
      messages: []
    }
  },
  methods: {
    // sendMessage: function (txt) {
      // if (txt !== '') {
        // this.messages.push({user: 'User1', message: txt})
        // ws.onopen = function (event) {
        //   ws.send(txt)
        // }
        // ws.send(txt)
        // console.log(Date.now().getTime())
      // }
    // },
    getMessages: function (messages) {
      this.messages = messages
    },
    scrollUpdate: function () {
      var elem = $('#scrollpage')

      if (elem.scrollTop() === 0) {
          // get 100 messages from the server
          // alert('End of message')
        console.log('Now scroll is top')
        // $("li:first").addClass('freeze-scroll')
        this.messages.unshift({user: 'User1', message: 'test message10'})
        this.messages.unshift({user: 'User1', message: 'test message9'})
        this.messages.unshift({user: 'User1', message: 'test message8'})
        this.messages.unshift({user: 'User1', message: 'test message7'})
        this.messages.unshift({user: 'User1', message: 'test message6'})
        this.messages.unshift({user: 'User1', message: 'test message5'})
        this.messages.unshift({user: 'User1', message: 'test message4'})
        this.messages.unshift({user: 'User1', message: 'test message3'})
        this.messages.unshift({user: 'User1', message: 'test message2'})
        this.messages.unshift({user: 'User1', message: 'test message1'})
        $('.messagebox').scrollTop('300')
      }
    }
  }
}
</script>

<style>
.messagebox {
  position: relative;
  /*min-width: 500px;*/
  width: 100%;
  background-color: #eff7f8;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  bottom: 90px;
  top: 63px;
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
  font-size: 15px;
}

.bubble {
  font-size: 16px;
  position: relative;
  display: inline-block;
  clear: both;
  margin-bottom: 15px;
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

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-enter {
  transform: translateY(10px);
  opacity: 0;
}

/*.freeze-scroll {
  position: fixed;
}*/
</style>
