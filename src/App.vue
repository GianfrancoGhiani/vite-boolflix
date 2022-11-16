<template>
  <HeaderComponent />
  <BodyComponent />
</template>

<script>
import BodyComponent from './components/BodyComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';

export default {
  components: { HeaderComponent, BodyComponent }
}
</script>

<style lang="scss" scoped>

</style>