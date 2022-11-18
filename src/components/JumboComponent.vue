<template>
    <div class="wrapper" :style="{ backgroundImage: `url(${store.imgBasePath}${store.activeElement.backdrop_path})` }"
        alt="">
        <div class="container">
            <!-- show the first h1 if is a movie else show the second -->
            <h1 v-if="store.activeElement.title">{{ store.activeElement.title }}</h1>
            <h1 v-else>{{ store.activeElement.name }}</h1>
            <!-- don't be repetitive, if the original title/name is the same of the title don't show it -->
            <div class="or-title">
                <h2 v-if="store.activeElement.title != store.activeElement.original_title">{{
                        store.activeElement.original_title
                }} </h2>
                <h2 v-if="store.activeElement.name != store.activeElement.original_name">{{
                        store.activeElement.original_name
                }} </h2><img :src="store.apiLang + store.getLang()" alt="">
            </div>
            <div class="gen"><span v-for="(gen, index) in store.activeElement.genres" :key="index">
                    {{ gen.name }} /
                </span></div>
            <div class="votes">
                <span class="stars" v-html="store.jumboStarCreate()"> </span>
                {{ store.activeElement.vote_count }}
            </div>
            <div class="overview" v-if="store.activeElement.overview">
                <div>Overview:</div>{{ store.activeElement.overview }}
            </div>
            <div class="cast" v-if="store.profile_path">
                <div v-for="(path, index) in store.profile_path">
                    <ActorComponent :url="path" :n="index" />
                </div>

            </div>
        </div>

    </div>

</template>

<script>
import { store } from '../assets/store';
import ActorComponent from './ActorComponent.vue';
import CardComponent from './CardComponent.vue';
export default {
    name: "JumboComponent",
    data() {
        return {
            store,
        };
    },
    created() {

    },
    components: { ActorComponent, CardComponent }
}
</script>

<style lang="scss" scoped>
@use '../assets/style/partials/mixin.scss' as *;
@use '../assets/style/partials/variables.scss' as *;

.wrapper {
    min-height: 80vh;
    background-size: cover;
    padding: 2rem 0;

    .container {
        background: linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 41.15%, #000000 97.61%, rgba(0, 0, 0, 0) 100%);
        padding: 1rem 1.5rem;

        h1 {
            font-size: 2rem;
        }

        .or-title {
            @include flexrow;

            h2 {
                margin-right: 1rem;
            }

            img {

                max-width: 2rem;
            }
        }

        .gen {
            margin-top: 0.5rem;
            color: $grey-text;
        }

        .votes {
            margin: 1rem 0;

        }

        .overview {
            max-width: 70%;

            div {
                font-weight: 800;
                font-size: 1.1rem;
            }
        }

        .cast {
            @include flexrow;


        }
    }
}
</style>