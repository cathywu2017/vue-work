<template>
  <div>
    <Header />
    <main>
      <router-view></router-view> 
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './shell/Header'
import Footer from './shell/Footer'

export default {
  components: {
      Header, Footer
  },
  data() {
    return {
    };
  },
  methods: {    
  },
};
</script>

<style lang="scss" scoped>
main {
  margin: 3.5rem 0 1rem;
  padding: 2rem 0; 
  border-bottom: 1px solid #ced4da;
}
</style>