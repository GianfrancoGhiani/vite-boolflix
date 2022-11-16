<template>
    <section class="container">
        <h2>{{ listType }}</h2>
        <div class="scroll">
            <CardComponent v-for="(card, index) in store.cardList" :key="index" :element="card" />
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
        getMovieList() {
            axios.get(store.apiMovieRef).then((answer) => {
                console.log(answer.data.results);
                store.cardList = [...answer.data.results];
                this.listType = 'Movie';
            }
            )
        }
    },
    created() {
        this.getMovieList()
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/style/partials/mixin.scss' as *;
@use '../assets/style/partials/variables.scss' as *;

section {
    max-width: none;

    .scroll {
        overflow-x: auto;
        white-space: nowrap;
    }
}
</style>