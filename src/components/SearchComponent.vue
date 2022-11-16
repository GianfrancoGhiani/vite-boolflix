<template>
    <div class="wrapper">
        <input class="rounded" type="text" placeholder="Search">
        <button class="rounded"><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
</template>

<script>
export default {
    name: 'SearchComponent',
}
</script>

<style lang="scss" scoped>
@use '../assets/style/partials/mixin.scss' as *;
@use '../assets/style/partials/variables.scss' as *;

.wrapper {
    .rounded {
        border-radius: .3rem;
        padding: .5rem;
    }

    button.rounded {
        margin: 0 .5rem;
        cursor: pointer;
        background-color: transparent;
        color: $white;
        border: 1px solid $white;
        transition: color 200ms, background-color 200ms ease-in;

        &:hover {
            color: $black;
            background-color: $white;
        }
    }
}
</style>