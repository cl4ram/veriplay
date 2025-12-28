import type { Movie } from '~/types/movies'

export const useSearchStore = defineStore('search', {
  state: () => ({
    query: '',
    results: [] as Movie[],
    isSearching: false,
    loading: false,
    previousRoute: null as string | null
  }),

  actions: {
    setLoading(value: boolean) {
      this.loading = value
    },

    startSearch(fromRoute: string) {
      if (!this.isSearching) {
        this.previousRoute = fromRoute
      }
      this.isSearching = true
    },

    setResults(movies: Movie[]) {
      this.results = movies
    },

    clear() {
      this.query = ''
      this.results = []
      this.isSearching = false
      this.previousRoute = null
    }
  }
})
