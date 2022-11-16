<template>
    <section class="top-bar">
        <div class="container">
            <a href="#"><img src="/img/logo.png" alt="Logo"></a>
            <SearchComponent />
        </div>
    </section>
</template>

<script>
import SearchComponent from './SearchComponent.vue';

export default {
    name: 'HeaderComponent',
    data() {
        return {

        };
    },
    components: { SearchComponent }
}
</script>

<style lang="scss" scoped>
@use '../assets/style/partials/mixin.scss' as *;
@use '../assets/style/partials/variables.scss' as *;


.top-bar {
    background-color: $black;
    height: 4rem;

    .container {
        @include flexrow;
        justify-content: space-between;
        max-height: 100%;

        img {
            height: 4rem;
        }
    }
}
</style>