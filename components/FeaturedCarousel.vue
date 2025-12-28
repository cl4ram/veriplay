<script setup lang="ts">
import type { MovieDetail } from '~/types/movies'

defineProps<{
  title: string
  items: MovieDetail[]
}>()

const emit = defineEmits<{
  (e: 'select-movie', imdbId: string): void
}>()
</script>

<template>
  <section class="mb-10">
    <h2 class="text-h5 font-weight-bold mb-4 px-4 text-capitalize">
      {{ title }}
    </h2>

    <v-slide-group class="pa-0" show-arrows>
      <v-slide-group-item v-for="movie in items" :key="movie.imdbID">
        <FeatureCard :movie="movie" class="ma-4" @select="emit('select-movie', $event)" />
      </v-slide-group-item>
    </v-slide-group>
  </section>
</template>

<style scoped></style>
