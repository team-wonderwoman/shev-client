<template>
  <!-- Group List at CurrentGroup.vue -->
  <transition name="modal">
    <div class="modal-mask">
      <div class="grouplist-modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <div id="current-group-box">
              <span id="current">{{ current }}</span>
              <img id="uptriangle" src="../assets/uptriangle.png" alt="" @click="$emit('close')"/>
            </div>
            <p class="list" v-for="(group, index) in user.group_list" v-bind:key="index">
              {{ group.group_name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/javascript">
import eventBus from './EventBus.vue'

export default {
  name: 'group-list',
  props: [ 'current' ],
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}

</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.grouplist-modal-wrapper {
  position: relative;
  width: 250px;
/*  margin-top: 61px;*/
  /*display: table-cell;*/
  vertical-align: middle;
  z-index: 9999; /* if overlap, which one will go to front */
}

.modal-container {
  width: 100%;
  margin: 0px auto;
  /*padding-left: 20px;*/
  padding-top: 2px;
  padding-bottom: 2px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin-top: 10px;
}

.current-group-box {
  position: relative;
  height: 30px;
  padding: 20px;
  padding-bottom: 11px;
  border-bottom: 1px solid #bfbfbf;
}

.modal-body #current {
  /*height: 43px;*/
  /*border-bottom: 1px solid #bfbfbf;*/
  float: left;
  width: 50px;
  margin: 0;
}

#uptriangle {
  float: right;
  /*margin-bottom: 30px;*/
  margin-right: 15px;
  height: 10px;
  width: 10px;
}

.modal-body .list {
  padding-left: 15px;
  padding-bottom: 10px;
  margin-top: 0px;
  /*margin-bottom: 16px;*/
  border-bottom: 1px solid #bfbfbf;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  transform: translateY(-10px);
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
</style>
