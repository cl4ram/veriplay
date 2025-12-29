import type { CustomMovie, CreateMoviePayload } from "~/types/movies"

export const useMovieStore = defineStore('movies', {
  state: () => ({
    customMovies: [] as CustomMovie[],
  }),

  actions: {
    initCustomMovies() {
      if (process.client) {
        const saved = localStorage.getItem('my_custom_movies')
        this.customMovies = saved ? JSON.parse(saved) : []
      }
    },

    addMovie(movie: CreateMoviePayload) {
      const newMovie = { 
        ...movie, 
        imdbID: `custom-${Date.now()}`, 
        isCustom: true 
      }
      this.customMovies.unshift(newMovie)
      localStorage.setItem('my_custom_movies', JSON.stringify(this.customMovies))
    },

    deleteMovie(id: string) {
      this.customMovies = this.customMovies.filter(m => m.imdbID !== id)
      localStorage.setItem('my_custom_movies', JSON.stringify(this.customMovies))
    }
  }
})