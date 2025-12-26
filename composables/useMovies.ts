import type { MovieSearchResponse, MovieDetail } from '~/types/movies'

export const useMovies = () => {
  const config = useRuntimeConfig()
  const apiKey = config.public.omdbApiKey
  const baseUrl = config.public.omdbBaseUrl

  const searchMovies = async (query: string, page: number = 1) => {
    return await $fetch<MovieSearchResponse>(baseUrl, {
      params: {
        apikey: apiKey,
        s: query,
        page: page
      }
    })
  }

  const getMovieById = async (id: string) => {
    return await $fetch<MovieDetail>(baseUrl, {
      params: {
        apikey: apiKey,
        i: id,
        plot: 'full'
      }
    })
  }

  return {
    searchMovies,
    getMovieById
  }
}