import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    popularMovies: [],
    currentPage: 1,
    currentMovie: {},
    genres: [],
    favorites: []
  },
  mutations: {
    addPopular(state, popular) {
      state.popularMovies.push(...popular)
    },
    setCurrentMovie(state, currentMovie) {
      state.currentMovie = currentMovie
    },
    setGenres(state, genres) {
      state.genres = genres
    },
    addFavorite(state, movie) {
      state.favorites.push(movie)
    },
    setFavorites(state, favorites) {
      state.favorites = favorites
    },
    removeFavorite(state, movie_id) {
      state.favorites = state.favorites.filter(item => item.id !== movie_id)
    },
    incrementCurrentPage(state) {
      state.currentPage++
    }
  },
  actions: {
    async fetchPopularMovies({commit, state}) {
      try {
        const popular = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.VUE_APP_API_KEY}&page=${state.currentPage}`)
        commit('addPopular', popular.data.results)
        commit('incrementCurrentPage')
      } catch (e) {
        console.log(e)
      }
    },
    async fetchMovie({commit}, movie_id) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.VUE_APP_API_KEY}`)
        commit('setCurrentMovie', response.data)
      } catch (e) {
        console.log(e)
      }
    },
    async fetchGenres({commit}) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.VUE_APP_API_KEY}`)
        commit('setGenres', response.data.genres)
      } catch (e) {
        console.log(e)
      }
    },
    async addToFavorite({commit}, movie_id) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.VUE_APP_API_KEY}`)
        commit('addFavorite', response.data)
      } catch (e) {
        console.log(e)
      }
    },
    async setFavoritesFromLocalStorage({dispatch}) {
      if (localStorage.favorites) {
        const favorites = localStorage.favorites.split(',')
        for (let index = 0; index < favorites.length; index++) {
          await dispatch('addToFavorite', favorites[index])
        }
      }
    },
    removeFromFavorites({commit}, movie_id) {
      commit('removeFavorite', movie_id)
      let favorites = localStorage.favorites.split(',')
      favorites = favorites.filter(element => element !== movie_id.toString())
      localStorage.favorites = favorites
    }
  }
})
