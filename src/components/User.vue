<template>
    <div class="user" @click="showUserInfo=(!showUserInfo)">
        <img src="../assets/User_Circle.png" alt=""/>
        <span class="name">{{ user.user_name }}</span>
        <user-info v-if="showUserInfo" @close="showUserInfo=false"></user-info>
    </div>
</template>

<script type="text/javascript">
import UserInfo from './UserInfo'

export default {
  name: 'user',
  data: function () {
    return {
      showUserInfo: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  components: { UserInfo }
}
</script>

<style>
.user{
  position: relative;
  cursor: pointer;
  height: 53px;
  padding: 15px;
  padding-left: 20px;
  padding-bottom: 0px;
  border-bottom: 1px solid #bfbfbf;
}

.user img {
  float: left;
  width: 40px;
  height: 40px;
  margin-right: 12px;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  z-index: 1;
}

.user .name{
  font-size: 14px;
  line-height: 40px;
  color: #1a1a1a;
  font-weight: 600;
  z-index: 1;
}
</style>
