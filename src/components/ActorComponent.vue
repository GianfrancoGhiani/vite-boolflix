<template>
    <div class="actor-card">
        <div class="pro-pic">
            <img :src="fullPath" alt="">
        </div>
        <div class="details">
            <!-- show the movie/serie 's character name + the real name -->
            <div class="char">{{ store.castList[n].character }}</div>
            {{ store.castList[n].name }}
        </div>
    </div>
</template>

<script>
import { store } from '../assets/store';

export default {
    name: 'ActorComponent',
    data() {
        return {
            store,
            fullPath: `${store.imgBasePath}${this.url}`
        }
    },
    props: {
        n: Number,
        url: String
    },
    created() {
        // if the actor profile pic path is null, take a "empty profile pic"
        if (!this.url) {
            this.fullPath = 'https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png';
        }

    }
}
</script>

<style lang="scss" scoped>
.actor-card {
    margin: 0.5rem;
    position: relative;



    .pro-pic {
        width: 150px;
        height: 225px;


        img {
            border-radius: 1rem;

            max-width: 100%;
        }

    }

    .details {
        border-radius: 1rem;
        padding: .5rem;
        position: absolute;
        bottom: 0;
        width: 100%;

        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);

        .char {
            font-size: 1.2rem;
            font-weight: 700;
        }
    }
}
</style>