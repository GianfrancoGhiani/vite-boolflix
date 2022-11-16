<template>
    <div class="my-card">
        <div class="card-start">
            <img :src="store.imgBasePath + element.poster_path" alt="">
        </div>
        <div class="card-details">
            <div class="title">{{ element.title }}</div>
            <div class="or-title">{{ element.original_title }} <img :src="store.apiLang + getLang()" alt=""></div>
            <div class="votes">{{ element.vote_count }}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import { store } from '../assets/store.js';
export default {
    name: 'CardComponent',
    data() {
        return {
            store,
        }
    },
    props: {
        element: Object,
    },
    methods: {
        getLang() {
            if (this.element.original_language == 'en') {
                return 'gb'
            } else {
                return this.element.original_language
            }
        }
    },
    created() {
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/style/partials/mixin.scss' as *;
@use '../assets/style/partials/variables.scss' as *;

.my-card {
    display: inline-block;
    width: 200px;
    overflow: hidden;
    padding: 0.5rem;
    cursor: pointer;
    position: relative;

    .card-start {
        max-width: 100%;

        img {
            border-radius: 1rem;
            max-width: 100%;
        }
    }

    &:hover .card-details {
        display: block;
    }

    .card-details {
        background: linear-gradient(180deg, #000000 21.31%, rgba(0, 0, 0, 0) 88.52%);
        width: 100%;
        height: 100%;
        display: none;
        padding: 1rem;
        position: absolute;
        top: 0;
        left: 0;



        .title {
            font-weight: 700;
            font-size: 1.2rem;
            margin-bottom: 0.3rem;
        }

        .or-title {
            font-size: 12px;
            font-style: italic;
            margin-bottom: 0.3rem;


            img {
                max-height: 12px;

            }
        }

        .votes {
            font-size: 85%;
        }
    }
}
</style>