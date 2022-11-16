import { reactive } from "vue";

export const store = reactive({
    apiMovieRef: 'https://api.themoviedb.org/3/search/movie?api_key=9dc795a3109a77bd2118840b7dc6948c&query=a',
    cardList: [],
    imgBasePath: 'http://image.tmdb.org/t/p/original',
    apiLang: 'https://countryflagsapi.com/png/'

})

//backdrop == jumbo
//poster == card