<template>
  <div class="chatbox">
    <div class="chatbox-messages">
      <ChatMessages v-for="msg in messages"
        v-bind:key="msg.date"
        v-bind:message="msg.content"
        v-bind:class="msg.from" />
        <div class="chatbox-message_line"></div>
    </div>
    <form v-on:submit.prevent="onSubmit" class="chatbox-form">
      <input type="text" name="message" placeholder="Escribe un mensaje ..." v-model="text">
      <input type="submit" value="ENVIAR" v-bind:disabled="isDisabled" v-bind:class="{ active: isActive }">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import ChatMessages from './ChatMessages'

export default {
  name: 'Chatbox',
  components: {
    ChatMessages
  },
  data () {
    return {
      messages: [],
      message: '',
      text: '',
      isActive: false,
      isDisable: true,
      intent: '',
      pokemon: []
    }
  },
  methods: {
    onSubmit () {
      if (this.text.length !== 0) {
        this.messages.push({
          date: new Date(),
          content: this.text,
          from: 'me'
        })

        axios.post(' http://localhost:3000/soldai', {
          question: this.text
        })
          .then(res => {
            let data = res.data.current_response
            this.messages.push({
              date: new Date(),
              content: data.message,
              from: 'bot'
            })
            if (Object.keys(data.parameters).length > 0) {
              this.intent = data.intent_info.name
              this.pokemon = data.parameters.entities
              // console.log('LA WEA FOME:' + this.pokemon[0].name)
              this.getData()
            }
          })
          .catch(err => {
            console.log(err)
          })

        // Clear input message
        this.text = ''
      }
    },
    scrollToBottom () {
      let scrollLine = document.querySelector('.chatbox-message_line')
      scrollLine.scrollIntoView({ behavior: 'smooth' })
    },
    disableForm () {
      if (this.text !== '') {
        this.isActive = true
        this.isDisabled = false
      } else {
        this.isActive = false
        this.isDisabled = true
      }
    },
    getData () {
      axios.post('http://localhost:3000/pokeapi', {
        pokemon: this.pokemon[0].name,
        intent: this.intent
      })
        .then(res => {
          this.messages.push({
            date: new Date(),
            content: res.data,
            from: 'bot'
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  updated () {
    this.scrollToBottom()
    this.disableForm()
  }
}
</script>

<style scoped>
.chatbox{
  height: 100vh;
  width: 100vw;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.chatbox-messages {
  height: 45%;
  width: 40%;
  background-color: white;
  border: 15px solid red;
  overflow-y: auto;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
}

.chatbox-message_line {
  float: left;
  clear: both;
  padding-top: 4px;
}

.chatbox-form {
  width: 100%;
  margin-top: 36px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.chatbox-form input[type=text] {
  width: 50%;
  border: none;
  border: 2px solid #e3e3e3;
  padding: 8px;
  font-size: 12px;
  transition: 0.4s;
}

.chatbox-form input[type=text]:focus {
  border-color: #5cccf1;
  outline: none;
}

.chatbox-form input[type=submit] {
  background-color: #e3e3e3;
  border-style: none;
  color: white;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  margin-left: 16px;
  transition: 0.3s;
}

.chatbox-form input[type=submit].active {
  background-color: green;
}

</style>
