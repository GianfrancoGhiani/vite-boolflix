<template>
    <section class="container">
        <h2>Movie</h2>
        <div class="scroll">
            <CardComponent v-for="(card, index) in store.movieCardList" :key="index" :element="card" />
        </div>
        <h2>Series</h2>
        <div class="scroll">
            <CardComponent v-for="(card, index) in store.serieCardList" :key="index" :element="card" />
        </div>
    </section>
</template>

<script>
import CardComponent from './CardComponent.vue';
import axios from 'axios';
import { store } from '../assets/store.js';

export default {
    name: 'ListComponent',
    data() {
        return {
            store,
            listType: '',
        }
    },
    components: {
        CardComponent
    },
    methods: {
    },
    created() {
        store.getMovieList()
        store.getSerieList()
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/style/partials/mixin.scss' as *;
@use '../assets/style/partials/variables.scss' as *;

section {
    max-width: none;

    h2 {
        margin-top: 2rem;
    }

    div.scroll {
        overflow-x: auto;
        white-space: nowrap;

    }
}
</style>