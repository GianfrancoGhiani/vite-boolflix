<template>
    <section>
        <div class="scroll">
            <CardComponent v-for="(card, index) in cardList" :key="index" :element="card" />
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

    }
}
</script>

<style lang="scss" scoped>
@use '../assets/style/partials/mixin.scss' as *;
@use '../assets/style/partials/variables.scss' as *;



section {
    max-width: none;

    div.scroll {
        overflow-x: auto;
        white-space: nowrap;

    }
}
</style>