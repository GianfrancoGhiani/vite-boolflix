<template>

    <section v-if="store.activeElement">
        <div v-if="!store.search">
            <JumboComponent />
        </div>
        <!-- most popular film -->
        <div class="container">
            <!-- show most popular only if the user is not searching  -->
            <div v-if="!store.search">
                <h2>Popular Movies</h2>
                <ListComponent :cardList="store.popularMovieList" />
            </div>
            <!-- movie list -->
            <h2>Movies</h2>
            <ListComponent :cardList="store.movieCardList" />
            <!-- series list -->
            <h2>Series</h2>
            <ListComponent :cardList="store.serieCardList" />
        </div>

    </section>
    <section v-else class="waiter">
        <div class="container">

            <img src="https://www.edigitalagency.com.au/wp-content/uploads/Netflix-logo-red-black-png.png"
                alt="netflix">
        </div>
    </section>
</template>

<script>
import JumboComponent from './JumboComponent.vue';
import ListComponent from './ListComponent.vue';
import { store } from '../assets/store';

export default {
    name: 'BodyComponent',
    components: { JumboComponent, ListComponent },

    data() {
        return {
            store,
        }
    },
    created() {
        store.getPopularMovieList();
        store.autoScrollPopular();



    }
}
</script>

<style lang="scss" scoped>
section {
    overflow: hidden;
    margin: 0 auto;

    h2 {
        margin-top: 2rem;
    }
}

.waiter {
    img {
        max-width: 100%;
    }
}
</style>