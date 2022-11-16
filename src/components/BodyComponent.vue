<template>

    <JumboComponent />

    <!-- film list -->
    <ListComponent />
</template>

<script>
import JumboComponent from './JumboComponent.vue';
import ListComponent from './ListComponent.vue';

export default {
    name: 'BodyComponent',
    components: { JumboComponent, ListComponent }
}
</script>

<style lang="scss" scoped>

</style>