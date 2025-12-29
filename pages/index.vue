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

const onIntersect = (isIntersecting: boolean) => {
  if (isIntersecting && !searchStore.loading && searchStore.hasMore) {
    searchStore.fetchNextPage()
  }
}
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
  loadHomeContent()
  loadFeaturedContent()
})
</script>

<template>
  <v-container fluid class="pa-0">
    <div v-if="searchStore.isSearching" class="pa-6">
      <div class="d-flex align-center mb-6">
        <h2 class="text-h5 font-weight-bold">Resultados para: "{{ searchStore.query }}"</h2>
      </div>

      <v-row v-if="searchStore.loading && searchStore.results.length === 0" justify="center">
        <v-progress-circular indeterminate color="primary" class="my-10" />
      </v-row>

      <template v-else-if="searchStore.results && searchStore.results.length > 0">
        <v-row>
          <v-col
            v-for="movie in searchStore.results"
            :key="movie.imdbID"
            cols="6"
            sm="4"
            md="4"
            lg="3"
          >
            <MovieCard :movie="movie" @select="goToDetail" />
          </v-col>
        </v-row>
        <div v-intersect="onIntersect" class="d-flex justify-center py-8 w-100">
          <v-progress-circular v-if="searchStore.loading" indeterminate color="primary" />
          <div v-else-if="!searchStore.hasMore" class="text-grey text-caption">
            No hay más resultados
          </div>
        </div>
      </template>

      <v-alert
        v-else
        type="info"
        variant="tonal"
        text="No encontramos películas con ese nombre. Intenta con otro término."
      />
    </div>

    <div v-else>
      <FeaturedCarousel
        title="Las series más vistas"
        :items="featuredMovies"
        @select-movie="goToDetail"
        :loading="isFeaturedLoading"
      />

      <div>
        <Carousel
          title="Universo Marvel"
          :items="marvelMovies"
          @select-movie="goToDetail"
          :loading="isHomeLoading"
        />
        <Carousel
          title="Colección Star Wars"
          :items="starWarsMovies"
          @select-movie="goToDetail"
          :loading="isHomeLoading"
        />

        <Carousel
          title="Batman: El Caballero Oscuro"
          :items="batmanMovies"
          @select-movie="goToDetail"
          :loading="isHomeLoading"
        />
      </div>
    </div>
  </v-container>
</template>
