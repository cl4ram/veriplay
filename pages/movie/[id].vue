<template>
  <v-container v-if="movie" fluid class="pa-0">
    <div>
      <div>
        <v-container>
          <v-row>
            <v-col cols="12" md="4" class="d-none d-md-block">
              <v-img :src="movie.Poster" class="rounded-lg elevation-24" />
            </v-col>
            <v-col cols="12" md="8" class="text-white">
              <v-btn
                variant="text"
                prepend-icon="mdi-arrow-left"
                @click="$router.back()"
                class="mb-4"
              >
                Volver
              </v-btn>
              <h1 class="text-h2 font-weight-black mb-2">{{ movie.Title }}</h1>

              <div class="d-flex align-center flex-wrap gap-4 mb-6">
                <v-chip color="primary" variant="flat">{{ movie.Year }}</v-chip>
                <v-chip variant="outlined" color="white">{{ movie.Runtime }}</v-chip>
                <v-rating
                  :model-value="Number(movie.imdbRating) / 2"
                  half-increments
                  readonly
                  color="amber"
                  density="compact"
                />
                <span class="text-subtitle-1">({{ movie.imdbVotes }} votos)</span>
              </div>

              <p class="text-h6 font-weight-light mb-8" style="max-width: 800px; line-height: 1.6">
                {{ movie.Plot }}
              </p>

              <v-row class="bg-black-transparent pa-4 rounded-lg">
                <v-col cols="6" sm="3">
                  <div class="text-overline text-grey-lighten-1">Premios</div>
                  <div class="text-body-2">{{ movie.Awards }}</div>
                </v-col>
                <v-col cols="6" sm="3">
                  <div class="text-overline text-grey-lighten-1">Ranking Metascore</div>
                  <div class="text-h6 text-primary">{{ movie.Metascore }}</div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
const route = useRoute()
const { getMovieById } = useMovies()
const movie = ref<any>(null)

definePageMeta({ layout: 'admin' })

onMounted(async () => {
  const id = route.params.id as string
  movie.value = await getMovieById(id)
})
</script>

<style scoped></style>
