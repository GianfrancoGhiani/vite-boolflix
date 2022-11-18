<template>
    <!-- 
        on over show details and get stars
        on click go to getCard
     -->
    <div class="my-card" :class="activate()" @mouseover="getStars()" @click="getCard()">
        <div class="card-start">
            <img :src="cardPath" alt="">
        </div>
        <!-- 
            movie has title instead serie has name
            vif to select from this two options
         -->

        <div class="card-details">
            <div class="title" v-if="element.title">{{ element.title }}</div>
            <div class="title" v-else>{{ element.name }}</div>

            <!-- show original title only if it is different from the title -->
            <div class="or-title" v-if="element.original_title != element.title">{{ element.original_title }}
                <!-- get lang flag -->
                <img :src="store.apiLang + getLang()" alt="">
            </div>
            <div class="or-title" v-else>{{ element.original_name }}
                <img :src="store.apiLang + getLang()" alt="">
            </div>

            <div class="votes">
                <span class="stars" v-html="starCreate()"> </span>
                {{ element.vote_count }}
            </div>
            <div class="overview" v-if="element.overview">
                <div>Overview:</div>{{ element.overview }}
            </div>

        </div>
    </div>
</template>

<script>
import { store } from '../assets/store.js';

export default {
    name: 'CardComponent',
    data() {
        return {
            store,
            stars: 0,
            cardPath: store.imgBasePath + this.element.poster_path,
        }
    },
    props: {
        element: Object,
    },
    methods: {
        // by clicking on a card add to that the css class 'active'
        activate() {
            if ((this.element.title === store.activeElement.title) && (this.element.id == store.activeElement.id)) {
                return 'active'
            } else if ((this.element.name === store.activeElement.name) && (this.element.id === store.activeElement.id)) {
                return 'active'
            }
        },
        getCard() {
            // pick the type between 'movie' or 'serie'
            if (this.element.title) {
                store.typeList = 'movie'
            } else {
                store.typeList = 'serie'
            }
            //stop scrolling
            store.stopScroll();
            store.clicked = true;
            // identify the new active card, as the clicked, by its id
            store.activeCard = this.element.id
            //create the relative jumbo element
            store.getJumboElement();
            store.search = false;

        },
        getStars() {
            // from /10 vote to /5 vote (only int or half values.. 1, 1.5, 2 ....)
            this.stars = Math.round((((this.element.vote_average / 2) * 10) / 10) * 2) / 2;
            this.starCreate();
        },
        starCreate() {
            // if stars is greater than 1 and it is not a float
            if ((this.stars > 1) && ((Math.round(this.stars) - this.stars) == 0.5)) {
                //then for every int num add a filled star, add also an half-filled star and then if stars are less then 5 add empty stars for the rest
                return (('<i class="fa-solid fa-star"></i>').repeat(this.stars) + '<i class="fa-regular fa-star-half-stroke"></i>') + ('<i class="fa-regular fa-star"></i>').repeat(5 - (Math.round(this.stars)))
            } else if (this.stars > 1) {
                //then for every int num add a filled star, if stars are less then 5 add empty stars for the rest
                return ('<i class="fa-solid fa-star"></i>').repeat(this.stars) + ('<i class="fa-regular fa-star"></i>').repeat(5 - (Math.round(this.stars)))
            } else {
                // vote is 0/10, create 5 empty stars
                return ('<i class="fa-regular fa-star"></i>').repeat(5)
            }
        }
        ,
        // adjustments to match Strings from TMDB API to allowed strings to flags API

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
        //sometimes TMDB API doesn't have the poster of the film, so replace it with a white screen
        if (!this.element.poster_path) {
            this.cardPath = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANIAAADwCAMAAABCI8pNAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BMQEAAADCoPVPbQlPoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+BsXQAAGTzplwAAAAAElFTkSuQmCC';
        }
        // console.log(store.activeElement)
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

            height: 286px;
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
        white-space: break-spaces;





        .title {
            width: calc(100% - 2rem);
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
            height: 130px;
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

.active {
    border: 1px solid $white;
    border-radius: 1.5rem;
    box-shadow: inset 0px 0px 5px 2px rgba(255, 255, 255, .8);

}
</style>