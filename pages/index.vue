<script setup lang="ts">
import { useSearchStore } from '~/stores/search'
import type { Movie, MovieDetail } from '~/types/movies'

definePageMeta({ layout: 'admin' })

const router = useRouter()
const searchStore = useSearchStore()
const { searchMovies, getMovieById } = useMovies()

const isHomeLoading = ref(false)
const isFeaturedLoading = ref(true)

const marvelMovies = ref<Movie[]>([])
const starWarsMovies = ref<Movie[]>([])
const batmanMovies = ref<Movie[]>([])
const featuredMovies = ref<MovieDetail[]>([])

const featuredIds = ['tt4574334', 'tt26748649', 'tt1442437', 'tt0903747', 'tt0203259']

const loadFeaturedContent = async () => {
  isFeaturedLoading.value = true
  try {
    const requests = featuredIds.map(getMovieById)
    featuredMovies.value = await Promise.all(requests)
  } catch (error) {
    console.error('Error cargando destacados:', error)
  } finally {
    isFeaturedLoading.value = false
  }
}

const loadHomeContent = async () => {
  isHomeLoading.value = true
  try {
    const [marvel, starWars, batman] = await Promise.all([
      searchMovies('Avengers'),
      searchMovies('Star Wars'),
      searchMovies('Batman')
    ])

    marvelMovies.value = marvel.Search ?? []
    starWarsMovies.value = starWars.Search ?? []
    batmanMovies.value = batman.Search ?? []
  } finally {
    isHomeLoading.value = false
  }
}

const goToDetail = (id: string) => {
  router.push(`/movie/${id}`)
}

onMounted(() => {
  const token = localStorage.getItem('auth_token')
  if (!token) {
    navigateTo('/login')
    return
  }

  loadHomeContent()
  loadFeaturedContent()
})
</script>

<template>
  <v-container fluid class="pa-0">
    <div v-if="searchStore.isSearching" class="pa-6">
      <div class="d-flex align-center mb-6">
        <h2 class="text-h5 font-weight-bold">Resultados para: "{{ searchStore.query }}"</h2>
        <v-spacer></v-spacer>
        <v-btn prepend-icon="mdi-close" variant="text" @click="searchStore.clear()">
          Limpiar búsqueda
        </v-btn>
      </div>

      <v-row v-if="searchStore.loading" justify="center">
        <v-progress-circular indeterminate color="primary" class="my-10" />
      </v-row>

      <v-row v-else-if="searchStore.results && searchStore.results.length > 0">
        <v-col
          v-for="movie in searchStore.results"
          :key="movie.imdbID"
          cols="12"
          sm="6"
          md="4"
          lg="2"
        >
          <MovieCard :movie="movie" @select="goToDetail" />
        </v-col>
      </v-row>

      <v-alert
        v-else
        type="info"
        variant="tonal"
        text="No encontramos películas con ese nombre. Intenta con otro término."
      />
    </div>

    <div v-else>
      <div v-if="isFeaturedLoading" class="d-flex justify-center py-10">
        <v-progress-circular indeterminate color="primary" />
      </div>

      <FeaturedCarousel
        v-else
        title="Los 5 más populares"
        :items="featuredMovies"
        @select-movie="goToDetail"
      />

      <div class="pa-6">
        <Carousel title="Universo Marvel" :items="marvelMovies" @select-movie="goToDetail" />
        <Carousel title="Colección Star Wars" :items="starWarsMovies" @select-movie="goToDetail" />
        <Carousel
          title="Batman: El Caballero Oscuro"
          :items="batmanMovies"
          @select-movie="goToDetail"
        />
      </div>
    </div>
  </v-container>
</template>
