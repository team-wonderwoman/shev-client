<template>
    <div class="chatbanner">
        <!-- <span>Topic name</span> -->
        <span>{{ current() }}</span>
    </div>
</template>

<script type="text/javascript">
export default {
  name: 'banner',
  computed: {
    user () {
      return this.$store.state.user
    },
    group () {
      return this.$store.state.group
    }
  },
  methods: {
    current: function () {
      if (this.user.current_type === 'topics') {
        for (var i = 0; i < this.group.topic_list.length; i++) {
          if (this.group.topic_list[i].id === this.user.current_roomid) {
            return this.group.topic_list[i].topic_name
          }
        }
      } else {
        for (var j = 0; j < this.group.chat_list.length; j++) {
          if (this.group.chat_list[j].id === this.user.current_roomid) {
            var members = this.group.chat_list[j].chatRoomMember_name
            var member_list = []
            for (var i = 0; i < members.length; i++) {
              member_list.push(members[i].member_name)
            }
            var member_string = member_list.join(', ')
                  
            return member_string
          }
        }
      }
    }
  }
}
</script>

<style>
.chatbanner {
  position: fixed;
  background-color: #fff;
  height: 30px;
  width: 100%;
  padding: 18px;
  padding-bottom: 13px;
  font-size: 15px;
  border-bottom: 1px solid #bfbfbf;
}
.chatbanner span{
  padding: 0px 0px;
  margin-left: 10px;
  font-weight: 400;
  font-size: 18px;
}
</style>
