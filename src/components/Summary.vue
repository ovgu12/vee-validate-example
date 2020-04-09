<template>
  <div>
    <h3>Successfully</h3>
    <vue-json-pretty :data="contact"></vue-json-pretty>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'

export default {

  components: {
    VueJsonPretty
  },

  data () {
    return {
      contact: null
    }
  },
  created () {
    if (localStorage.getItem('form')) {
      this.contact = JSON.parse(localStorage.getItem('form'))
    }
    if (this.contact === null) {
      this.$router.push('/')
    }
  }

}
</script>
