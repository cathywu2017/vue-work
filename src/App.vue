<template>
  <div id="app">    
    <Alert />
    <router-view/>
  </div>
</template>

<script>

import Alert from './components/AlertMessage'

export default {
  components: {
    Alert,
  },
  name: 'App',
  data(){
    return {
    }
  },
  // created(){
  //   const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product`
  //   this.$http.get(api).then((response) => {
  //     console.log(response.data)
  //   })
  // }
}
</script>

<style lang="scss">
@import "./assets/all";
</style>
