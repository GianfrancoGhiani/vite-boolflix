import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
// i've divided into 2 pts the store content
  // variable pt
    apiKey:'?api_key=9dc795a3109a77bd2118840b7dc6948c', //identifier (required by TMDB api)

    //TMDB API links to:
    //search
    apiMovieRef: 'https://api.themoviedb.org/3/search/movie',
    apiSerieRef: 'https://api.themoviedb.org/3/search/tv',
    // popular movies
    apiPopularMovie: 'https://api.themoviedb.org/3/movie/popular',
    // pick a movie/tv-show simply adding an id
    jumboMovie: 'https://api.themoviedb.org/3/movie/',
    jumboSerie: 'https://api.themoviedb.org/3/tv/',
    // query string (required in most of cases, it will start with "a")
    querySearch:'&query=a',
    //base img path
    imgBasePath: 'http://image.tmdb.org/t/p/original',

    //flags API
    apiLang: 'https://countryflagsapi.com/png/',

    display:false,
    account:'https://ia903404.us.archive.org/31/items/profiles_202104/dog.png',
    accountsImg:[
      'https://ia903404.us.archive.org/31/items/profiles_202104/dog.png',
      'https://ia903404.us.archive.org/31/items/profiles_202104/hero.png',
      'https://ia803404.us.archive.org/31/items/profiles_202104/monster.png',
      'https://ia803404.us.archive.org/31/items/profiles_202104/penguin.png',
      'https://ia903404.us.archive.org/31/items/profiles_202104/robot.png',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU33Io5Mgoxj4Hil4F0ctBZUBEXhoQd9fYEg&usqp=CAU',
      'https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg'    

    ],
    search: false,
    // lists of items
    movieCardList: [],
    serieCardList: [],
    popularMovieList: [],


    typeList: 'movie',
    activeCard: null,
    activeElement: null,
    activeIndex: 0,
    castList: [],
    profile_path: [],
    scrolling: null,
    clicked: false,

    //methods
    /* 
    the first three methods uses axios and search path to create
    the three lists of items populars, movies, series
     */ 
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
        // this.activeElement = this.popularMovieList[0];
        // this.activeIndex = 0;
        this.getJumboElement();
        
      }
      )
    },
    
    //here is the main creation of the jumbo
    getJumboElement(){
      
      /*
      if the user had clicked on a card, then pick it, 
      if he had not pick the card selected by index 
      (index: starts with 0 / changed by autoscroll)
      */
      if(!this.clicked){
        this.activeCard = this.popularMovieList[this.activeIndex].id;
      }
      //clear all cast data
      this.profile_path= [];
      this.castList= [];
      // if else to change the axios/api path and then create the new cast data
      if (this.typeList == 'movie'){
        axios.get(this.jumboMovie + this.activeCard + this.apiKey).then((answer) => {
            this.activeElement = answer.data;
            console.log('This is the Movie active element:', this.activeElement)
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
          console.log('This is the Serie active element:', this.activeElement)
          axios.get(this.jumboSerie + this.activeElement.id +'/credits'+ this.apiKey).then((answer) => {
            this.castList = [...answer.data.cast];
            for (let i = 0; i < 5; i++){
              this.profile_path.push(this.castList[i].profile_path)
            }
        }
        )
      }
      )
      }
      //go to stars
      this.jumboStarCreate();
      // go to language
      this.getLang();
      
      
    },

    jumboStarCreate() {
      // "* 10) / 10)" is added to round at the first decimal 
      // "* 2) / 2" is added to round at the int or at least .5
      const stars = Math.round((((this.activeElement.vote_average / 2) * 10) / 10) * 2) / 2;

      // if stars is greater than 1 and it is not a float
      if ((stars > 1) && ((Math.round(stars) - stars) == 0.5)) {
        //then for every int num add a filled star, add also an half-filled star and then if stars are less then 5 add empty stars for the rest
          return (('<i class="fa-solid fa-star"></i>').repeat(stars) + '<i class="fa-regular fa-star-half-stroke"></i>') + ('<i class="fa-regular fa-star"></i>').repeat(5 - (Math.round(stars)))
      } else if (stars > 1) {
        //then for every int num add a filled star, if stars are less then 5 add empty stars for the rest

          return ('<i class="fa-solid fa-star"></i>').repeat(stars) + ('<i class="fa-regular fa-star"></i>').repeat(5 - (Math.round(stars)))
      } else {
        // vote is 0/10, create 5 empty stars
          return ('<i class="fa-regular fa-star"></i>').repeat(5)
      }
    },
    getLang() {
      // adjustments to match Strings from TMDB API to allowed strings to flags API
      if (this.activeElement.original_language == 'en') {
          return 'gb'
      } else if (this.activeElement.original_language == 'ja') {
          return 'jp'
      } else if (this.activeElement.original_language == 'uk') {
          return 'ukr'

      } else {
          return this.activeElement.original_language
      }

    },

    // autoscroll every 5 sec
    autoScrollPopular(){
      
      if (this.display){
        this.scrolling = setInterval(()=>{
        
        this.activeIndex++;
        // if index is greater then the list length reset
        if (this.activeIndex > (this.popularMovieList.length - 1)){
          this.activeIndex = 0;
        }
        scrollTo({class: 'active'})
        this.getJumboElement();
    }, 5000)}
    },
    //clear intervall
    stopScroll(){
      clearInterval(this.scrolling);
      this.scrolling =null;
    }


})
