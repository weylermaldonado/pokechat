<template>
  <div class="chatmessage" v-bind:class="from">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: [ 'message', 'from' ]
}
</script>

<style scoped>
.chatmessage {
  padding: 8px;
  margin-bottom: 8px;
  max-width: 50%;
  color: white;
  background-color: blue;
  border-radius: 8px 16px 0 8px;
  align-self: flex-end;
}

.chatmessage p {
  overflow-wrap: break-word;
  text-align: justify;
}

.me {
  background-color: blue;
  border-radius: 8px 16px 0 8px;
  align-self: flex-end;
}

.bot {
  background-color: #5cccf1;
  border-radius: 16px 8px 8px 0;
  align-self: flex-start;
}
</style>
