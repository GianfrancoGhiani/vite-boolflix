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

    imagePath:'https://image.tmdb.org/t/p/original',
    typeList: 'movie',
    activeCard: null,
    jumboMovie: 'https://api.themoviedb.org/3/movie/',
    jumboSerie: 'https://api.themoviedb.org/3/tv/',
    activeElement: null,
    castList: [],
    profile_path: [],
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
        // console.log(answer.data.results);
        this.popularMovieList = [...answer.data.results];
        this.activeElement = this.popularMovieList[0];
        this.activeCard = this.popularMovieList[0].id;
        this.getJumboElement();
        
      }
      )
    },
    
    getJumboElement(){
      this.profile_path= [];
      this.castList= [];
      // console.log(this.activeElement, this.activeCard, this.typeList)
      if (this.typeList == 'movie'){
        axios.get(this.jumboMovie + this.activeCard + this.apiKey).then((answer) => {
            this.activeElement = answer.data;
            console.log(this.activeElement)
            axios.get(this.jumboMovie + this.activeElement.id +'/credits'+ this.apiKey).then((answer) => {
              this.castList = [...answer.data.cast];
              for (let i = 0; i < 5; i++){
                this.profile_path.push(this.castList[i].profile_path)
              }

          }
          )
        }
        )
      } else if(this.typeList == 'serie'){
        axios.get(this.jumboSerie + this.activeCard + this.apiKey).then((answer) => {
          this.activeElement = answer.data;
          // console.log(this.activeElement)
          axios.get(this.jumboSerie + this.activeElement.id +'/credits'+ this.apiKey).then((answer) => {
            this.castList = [...answer.data.cast];
            console.log(this.castList[0], this.typeList)
            for (let i = 0; i < 5; i++){
              this.profile_path.push(this.castList[i].profile_path)
            }
        }
        )
      }
      )
      }
      this.jumboStarCreate();
      this.getLang();
    },
    // getCast(){
    //   if (this.typeList == 'movie'){
    //     axios.get(this.jumboMovie + this.activeElement.id +'/credits'+ this.apiKey).then((answer) => {
    //         this.castList = [...answer.data.cast];
    //         console.log(this.castList[0].profile_path)
    //         console.log(this.imagePath + store.castList[0].profile_path)
    //     }
    //     )
    //   } else if(this.typeList == 'serie'){
    //     axios.get(this.jumboSerie + this.activeElement.id + this.apiKey).then((answer) => {
    //       this.castList = [...answer.data.cast];
    //       console.log(this.castList[0])
    //   }
    //   )
    //   }
    // }
    //,
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