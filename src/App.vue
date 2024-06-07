<template class="">
    <Navbar v-if="!isLoginPage" />
    <RouterView class="min-h-screen bg-home_background"/>
    <Footer v-if="!isLoginPage" />
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer
  },
  computed: {
    isLoginPage() {
      return this.$route.path === '/login';
    }
  }
}
</script>

