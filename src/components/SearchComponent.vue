<template>
    <div class="wrapper">
        <!-- on enter or click on btn go to filter meth -->
        <img :src="store.account" alt="account" v-show="store.display">
        <input class="rounded" type="text" placeholder="Search" v-model="search" @keyup.enter="filter()">
        <button class="rounded" @click="filter()"><i class=" fa-solid fa-magnifying-glass"></i></button>
    </div>
</template>

<script>
import { store } from '../assets/store.js';
export default {
    name: 'SearchComponent',
    data() {
        return {
            store,
            search: null,
        }
    },
    methods: {
        filter() {
            /* 
            it will stop the autoscroll,
            modify the query string,
            update the movie and series list,
            it also allow to hide the jumbo untill the return of a choosen "card"
            */
            store.stopScroll();
            store.querySearch = '&query=' + this.search;
            store.getMovieList();
            store.getSerieList();
            store.search = true;
            this.search = '';
        }
    },
}
</script>

<style lang="scss" scoped>
@use '../assets/style/partials/mixin.scss' as *;
@use '../assets/style/partials/variables.scss' as *;

.wrapper {
    @include flexrow;

    img {
        max-height: 2rem;
        border-radius: .3rem;
        margin-right: 0.5rem;
    }

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