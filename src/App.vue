<template>
  <div class="app">
    <Chatbox />

    <div class="app-line"></div>
  </div>
</template>

<script>

import Chatbox from './components/Chatbox'

export default {
  name: 'App',
  components: {

    Chatbox
  }
}
</script>

<style>
* {
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.app-line {
  background-color: black;
  height: 5vh;
}
</style>
