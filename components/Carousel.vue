<script setup lang="ts">
import type { Movie } from '~/types/movies'

defineProps<{
  title: string
  items: Movie[]
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'select-movie', imdbId: string): void
}>()

const model = ref<number | null>(null)
</script>

<template>
  <div class="mb-8">
    <h2 class="text-h5 font-weight-bold mb-4 px-4 text-capitalize">
      {{ title }}
    </h2>

    <v-slide-group v-model="model" class="pa-0" :show-arrows="!$vuetify.display.mobile">
      <template v-if="loading">
        <v-slide-group-item v-for="n in 5" :key="n">
          <div class="ma-2">
            <v-skeleton-loader
              width="200"
              height="300"
              type="image, list-item-two-line"
              class="rounded-lg"
            ></v-skeleton-loader>
          </div>
        </v-slide-group-item>
      </template>

      <template v-else>
        <v-slide-group-item v-for="movie in items" :key="movie.imdbID">
          <div class="ma-2">
            <MovieCard :movie="movie" @select="emit('select-movie', $event)" />
          </div>
        </v-slide-group-item>
      </template>
    </v-slide-group>
  </div>
</template>

<style scoped></style>
