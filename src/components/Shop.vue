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
    components:{
        Header, Footer
    },
}
</script>

<style lang="scss" scoped>
main {
    margin: 3.5rem 0 1rem;
    padding: 0 0 2rem; 
    border-bottom: 1px solid #ced4da;
}
</style>