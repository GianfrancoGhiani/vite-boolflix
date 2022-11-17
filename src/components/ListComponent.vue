<template>
    <section>
        <div class="rel">
            <div class="scroll">
                <CardComponent v-for="(card, index) in cardList" :key="index" :element="card" />
            </div>
            <div class="bg-smoke"></div>
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
    props: {
        cardList: Array
    },
    components: {
        CardComponent
    },
    methods: {
    },
    created() {
        store.getMovieList();
        store.getSerieList();


    }
}
</script>

<style lang="scss" scoped>
@use '../assets/style/partials/mixin.scss' as *;
@use '../assets/style/partials/variables.scss' as *;



section {
    max-width: none;

    .rel {
        position: relative;

        .bg-smoke {
            pointer-events: none;
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            background: linear-gradient(90deg, rgba(0, 0, 0, 0.79) 0%, rgba(0, 0, 0, 0) 9.51%, rgba(0, 0, 0, 0) 65.6%, #000000 100%);
        }
    }

    .scroll {
        overflow-x: auto;
        white-space: nowrap;
    }
}
</style>