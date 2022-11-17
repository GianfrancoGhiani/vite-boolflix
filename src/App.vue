<template>
  <header>
    <HeaderComponent />
  </header>
  <main>
    <BodyComponent />
  </main>
</template>

<script>
import BodyComponent from './components/BodyComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';

export default {
  components: { HeaderComponent, BodyComponent }
}
</script>

<style lang="scss" scoped>
main {
  margin-top: 4rem;
}
</style>