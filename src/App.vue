<template>
  <header>
    <HeaderComponent />
  </header>
  <main>
    <BodyComponent v-if="store.display" />
    <LoginComponent v-if="!store.display" />
  </main>
</template>

<script>
import { store } from './assets/store.js';
import BodyComponent from './components/BodyComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import LoginComponent from './components/LoginComponent.vue';

export default {
  components: { HeaderComponent, BodyComponent, LoginComponent },
  data() {
    return {
      store,
    }
  },
  created() {
    store.autoScrollPopular();
  },

}
</script>

<style lang="scss" scoped>
main {
  margin-top: 4rem;
}
</style>