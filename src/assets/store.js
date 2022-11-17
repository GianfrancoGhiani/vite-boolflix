import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
    apiKey:'?api_key=9dc795a3109a77bd2118840b7dc6948c',
    apiMovieRef: 'https://api.themoviedb.org/3/search/movie',
    apiSerieRef: 'https://api.themoviedb.org/3/search/tv',
    querySearch:'&query=a',
    search: false,
    apiPopularMovie: 'https://api.themoviedb.org/3/movie/popular',
    movieCardList: [],
    serieCardList: [],
    popularMovieList: [],
    
    imgBasePath: 'http://image.tmdb.org/t/p/original',
    apiLang: 'https://countryflagsapi.com/png/',
    getMovieList() {
        axios.get(this.apiMovieRef + this.apiKey + this.querySearch).then((answer) => {
          // console.log(answer.data.results);
          this.movieCardList = [...answer.data.results];
        }
        )
      },
    getSerieList() {
        axios.get(this.apiSerieRef + this.apiKey + this.querySearch).then((answer) => {
          // console.log(answer.data.results);
          this.serieCardList = [...answer.data.results];
          // console.log(this.serieCardList)
        }
        )
      },
    getPopularMovieList() {
      axios.get(this.apiPopularMovie + this.apiKey).then((answer) => {
        console.log(answer.data.results);
        this.popularMovieList = [...answer.data.results];
        this.activeElement = this.popularMovieList[0];
        this.getJumboElement();
      }
      )
    },
    imagePath:'https://image.tmdb.org/t/p/original',
    typeList: null,
    activeCard: null,
    jumboMovie: 'https://api.themoviedb.org/3/movie/',
    jumboSerie: 'https://api.themoviedb.org/3/tv/',
    activeElement: null,

    getJumboElement(){
      if (this.typeList == 'movie'){
        axios.get(this.jumboMovie + this.activeCard + this.apiKey).then((answer) => {
            this.activeElement = answer.data;
            console.log(this.activeElement)
        }
        )
      } else if(this.typeList == 'serie'){
        axios.get(this.jumboSerie + this.activeCard + this.apiKey).then((answer) => {
          this.activeElement = answer.data;
          console.log(this.activeElement)
      }
      )
      }
      this.jumboStarCreate();
      this.getLang();
      
    },
    jumboStarCreate() {
      const stars = Math.round((((this.activeElement.vote_average / 2) * 10) / 10) * 2) / 2;
      if ((stars > 1) && ((Math.round(stars) - stars) == 0.5)) {
          return (('<i class="fa-solid fa-star"></i>').repeat(stars) + '<i class="fa-regular fa-star-half-stroke"></i>') + ('<i class="fa-regular fa-star"></i>').repeat(5 - (Math.round(stars)))
      } else if (stars > 1) {
          return ('<i class="fa-solid fa-star"></i>').repeat(stars) + ('<i class="fa-regular fa-star"></i>').repeat(5 - (Math.round(stars)))
      } else {
          return ('<i class="fa-regular fa-star"></i>').repeat(5)
      }
    },
    getLang() {
      if (this.activeElement.original_language == 'en') {
          return 'gb'
      } else if (this.activeElement.original_language == 'ja') {
          return 'jp'
      } else if (this.activeElement.original_language == 'uk') {
          return 'ukr'

      } else {
          return this.activeElement.original_language
      }
    }
  
})

//backdrop == jumbo
//poster == card