import { defineStore } from 'pinia'
import type { Movie } from '~/types/movies'

export const useSearchStore = defineStore('search', {
  state: () => ({
    query: '',
    results: [] as Movie[],
    isSearching: false,
    loading: false,
    previousRoute: null as string | null,
    page: 1,
    hasMore: true,
  }),

  actions: {
    async fetchNextPage() {
    if (this.loading || !this.hasMore) return
    
    this.loading = true
    const { searchMovies } = useMovies()
    
    try {
      const data = await searchMovies(this.query, this.page)
      
      if (data.Search && data.Search.length > 0) {
        this.results = [...this.results, ...data.Search]
        this.page++
      } else {
        this.hasMore = false
      }
    } catch (e) {
      console.error(e)
    } finally {
      this.loading = false
    }
  },
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
