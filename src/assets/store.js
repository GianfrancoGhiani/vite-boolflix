import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
    apiMovieRef: 'https://api.themoviedb.org/3/search/movie?api_key=9dc795a3109a77bd2118840b7dc6948c&query=',
    querySearch:'a',
    apiSerieRef: 'https://api.themoviedb.org/3/search/tv?api_key=9dc795a3109a77bd2118840b7dc6948c&query=',
    movieCardList: [],
    serieCardList: [],
    imgBasePath: 'http://image.tmdb.org/t/p/original',
    apiLang: 'https://countryflagsapi.com/png/',
    getMovieList() {
        axios.get(this.apiMovieRef + this.querySearch).then((answer) => {
          console.log(answer.data.results);
          this.movieCardList = [...answer.data.results];
        }
        )
      },
    getSerieList() {
        axios.get(this.apiSerieRef + this.querySearch).then((answer) => {
          console.log(answer.data.results);
          this.serieCardList = [...answer.data.results];
          console.log(this.serieCardList)
        }
        )
      },

})

//backdrop == jumbo
//poster == card