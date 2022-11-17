<template>
    <div class="my-card" @mouseover="getStars()" @click="getCard()">
        <div class="card-start">
            <img :src="store.imgBasePath + element.poster_path" alt="">
        </div>
        <div class="card-details">
            <div class="title" v-if="element.title">{{ element.title }}</div>
            <div class="title" v-else="element.name">{{ element.name }}</div>
            <div class="or-title" v-if="element.original_title">{{ element.original_title }}
                <img :src="store.apiLang + getLang()" alt="">
            </div>
            <div class="or-title" v-else="element.original_name">{{ element.original_name }}
                <img :src="store.apiLang + getLang()" alt="">
            </div>
            <div class="votes">
                <span class="stars" v-html="starCreate()"> </span>
                {{ element.vote_count }}
            </div>
            <div class="overview">
                <div>Overview:</div>{{ element.overview }}
            </div>

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
            stars: 0,
        }
    },
    props: {
        element: Object,
    },
    methods: {
        getCard() {
            if (this.element.title) {
                store.typeList = 'movie'
            } else {
                store.typeList = 'serie'
            }
            store.activeCard = this.element.id
            store.getJumboElement();
            store.search = false;
        },
        getStars() {
            // this will return only int or int.5 num
            this.stars = Math.round((((this.element.vote_average / 2) * 10) / 10) * 2) / 2;
            this.starCreate();
        },
        starCreate() {

            if ((this.stars > 1) && ((Math.round(this.stars) - this.stars) == 0.5)) {
                return (('<i class="fa-solid fa-star"></i>').repeat(this.stars) + '<i class="fa-regular fa-star-half-stroke"></i>') + ('<i class="fa-regular fa-star"></i>').repeat(5 - (Math.round(this.stars)))
            } else if (this.stars > 1) {
                return ('<i class="fa-solid fa-star"></i>').repeat(this.stars) + ('<i class="fa-regular fa-star"></i>').repeat(5 - (Math.round(this.stars)))
            } else {
                return ('<i class="fa-regular fa-star"></i>').repeat(5)
            }
        }
        ,
        getLang() {
            if (this.element.original_language == 'en') {
                return 'gb'
            } else if (this.element.original_language == 'ja') {
                return 'jp'
            } else if (this.element.original_language == 'uk') {
                return 'ukr'

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
        background: linear-gradient(180.22deg, #000000 55.4%, rgba(0, 0, 0, 0.5) 99.81%);
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
            color: $grey-text;

            .stars {
                color: $white;
            }

            margin-bottom: 0.2rem;
        }

        .overview {
            width: 100%;
            height: 190px;
            overflow-y: auto;
            white-space: break-spaces;
            font-size: 85%;
            padding: .3rem;
            color: $grey-text;

            div {
                font-weight: 600;
                margin-left: -.3rem;
            }
        }
    }
}
</style>