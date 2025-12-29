import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useMovieStore } from './movieStore'

const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem(key: string) {
      return store[key] ?? null
    },
    setItem(key: string, value: string) {
      store[key] = value
    },
    removeItem(key: string) {
      delete store[key]
    },
    clear() {
      store = {}
    }
  }
})()

vi.stubGlobal('localStorage', localStorageMock)

describe('Movie Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('agrega una película custom', () => {
    const store = useMovieStore()

    store.addMovie({
      Title: 'Test Movie',
      Year: '2024',
      Plot: 'Test plot',
      Poster: 'test.jpg',
      Type: 'movie'
    })

    expect(store.customMovies.length).toBe(1)
    expect(store.customMovies[0].isCustom).toBe(true)
  })

  it('elimina una película por id', () => {
    const store = useMovieStore()

    store.addMovie({
      Title: 'Test Movie',
      Year: '2024',
      Plot: 'Test plot',
      Poster: 'test.jpg',
      Type: 'movie'
    })

    const id = store.customMovies[0].imdbID
    store.deleteMovie(id)

    expect(store.customMovies.length).toBe(0)
  })

  it('inicializa películas desde localStorage', () => {
    vi.stubGlobal('process', {
    ...process,
    client: true,
    env: {
        ...process.env,
        NODE_ENV: 'test'
    }
    })


    localStorage.setItem(
      'my_custom_movies',
      JSON.stringify([
        {
          imdbID: 'custom-1',
          Title: 'Stored Movie',
          Year: '2023',
          Plot: 'Stored plot',
          Poster: 'poster.jpg',
          isCustom: true,
          Type: 'movie'
        }
      ])
    )

    const store = useMovieStore()
    store.initCustomMovies()

    expect(store.customMovies.length).toBe(1)
    expect(store.customMovies[0].Title).toBe('Stored Movie')
  })
})
