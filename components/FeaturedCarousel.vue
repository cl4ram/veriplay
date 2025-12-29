<script setup lang="ts">
import type { MovieDetail } from '~/types/movies'

defineProps<{
  title: string
  items: MovieDetail[]
  loading?: boolean
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

    <v-slide-group class="pa-0" :show-arrows="!$vuetify.display.mobile">
      <template v-if="loading">
        <v-slide-group-item v-for="n in 3" :key="n">
          <div class="ma-4">
            <v-skeleton-loader
              :width="$vuetify.display.mobile ? '280' : '450'"
              height="250"
              type="image, article"
              class="rounded-xl featured-skeleton"
            ></v-skeleton-loader>
          </div>
        </v-slide-group-item>
      </template>

      <template v-else>
        <v-slide-group-item v-for="movie in items" :key="movie.imdbID">
          <FeatureCard :movie="movie" class="ma-4" @select="emit('select-movie', $event)" />
        </v-slide-group-item>
      </template>
    </v-slide-group>
  </section>
</template>

<style scoped>
.featured-skeleton {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
}

:deep(.v-skeleton-loader__image) {
  height: 100% !important;
  width: 40% !important;
}

:deep(.v-skeleton-loader__article) {
  width: 60% !important;
  background: transparent !important;
}
</style>
