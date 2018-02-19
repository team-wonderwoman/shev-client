<template>
  <div class="top">
    <span>{{ currentGroup() }}</span>
    <img id="downtriangle" src="../assets/triangle.png" alt="" @click="showGroupList=!showGroupList" />
    <group-list v-if="showGroupList===true" @close="showGroupList=false" v-bind:current="currentgroup"></group-list>
    <img id="member" src="../assets/member.png" alt="" @click="showMemberList=!showMemberList" />
    <member-list v-if="showMemberList===true"></member-list>
  </div>
</template>

<script type="text/javascript">
import GroupList from './GroupList.vue'
import MemberList from './MemberList.vue'

export default {
  name: 'current-group',
  computed: {
    user () {
      return this.$store.state.user
    },
    group () {
      return this.$store.state.group
    }
  },
  data: function () {
    return {
      currentgroup: null,
      showGroupList: false,
      showMemberList: false
    }
  },
  methods: {
    currentGroup: function () {
      for (var i = 0; i < this.user.group_list.length; i++) {
        if (this.user.current_group === this.user.group_list[i].id) {
          this.currentgroup = this.user.group_list[i].group_name
          return this.currentgroup
        }
      }
    }
  },
  components: { GroupList, MemberList }
}
</script>

<style>
.top {
  position: relative;
  height: 30px;
  padding: 20px;
  padding-bottom: 11px;
  border-bottom: 1px solid #bfbfbf;
}

.top #downtriangle {
  height: 10px;
  width: 10px;
  top: 3px;
}

.top #member {
  height: 25px;
  width: 25px;
  float: right;
  margin-bottom: 3px;
}

button:focus {
  outline: none;
}
</style>
