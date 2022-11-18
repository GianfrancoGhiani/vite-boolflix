<template>
    <section>
        <div class="rel">
            <div class="scroll">
                <!-- crete many cards as the length of the cardList created -->
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
        // start with creation of movie and series list
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
            background: linear-gradient(90deg, rgba(0, 0, 0, 0.79) 0%, rgba(0, 0, 0, 0) 3%, rgba(0, 0, 0, 0) 85.6%, #000000 100%);
        }
    }

    .scroll {
        overflow-x: auto;
        white-space: nowrap; //it allows to put all cards in a single line
    }
}


// scrollbar styling
::-webkit-scrollbar {
    height: 0.5rem;
}

::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px $grey-text;
    border-radius: 0.5rem;
}

::-webkit-scrollbar-thumb {
    background: $dark-red;
    border-radius: 0.5rem;
}

::-webkit-scrollbar-thumb:hover {
    background: lighten($color: $dark-red, $amount: 5);
}
</style>