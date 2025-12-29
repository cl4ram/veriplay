import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSearchStore } from './search'
import type { Movie } from '~/types/movies'

describe('Search Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('inicia una búsqueda y guarda la ruta previa', () => {
    const store = useSearchStore()

    store.startSearch('/home')

    expect(store.isSearching).toBe(true)
    expect(store.previousRoute).toBe('/home')
  })

  it('no pisa previousRoute si ya está buscando', () => {
    const store = useSearchStore()

    store.startSearch('/home')
    store.startSearch('/movies')

    expect(store.previousRoute).toBe('/home')
  })

  it('setea resultados', () => {
    const store = useSearchStore()

    const movies: Movie[] = [
      {
        Title: 'Test',
        Year: '2023',
        imdbID: 'tt123',
        Type: 'movie',
        Poster: 'test.jpg'
      }
    ]

    store.setResults(movies)

    expect(store.results.length).toBe(1)
  })

  it('limpia el estado', () => {
    const store = useSearchStore()

    store.query = 'batman'
    store.results = [{} as Movie]
    store.isSearching = true
    store.previousRoute = '/home'

    store.clear()

    expect(store.results).toEqual([])
    expect(store.isSearching).toBe(false)
    expect(store.previousRoute).toBe(null)
  })
})
