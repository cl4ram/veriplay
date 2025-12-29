<script setup lang="ts">
import type { MovieBase } from '~/types/movies'

defineProps<{ movie: MovieBase }>()
defineEmits(['select'])
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-bind="props"
      :elevation="isHovering ? 12 : 2"
      :class="{ 'on-hover': isHovering }"
      class="mx-auto transition-swing movie-card"
      rounded="lg"
      @click="$emit('select', movie.imdbID)"
    >
      <v-img :src="movie.Poster" cover class="align-end movie-poster">
        <div class="fill-height d-flex flex-column justify-end pa-3 gradient-overlay">
          <div class="text-subtitle-2 text-sm-subtitle-1 font-weight-bold text-white truncate">
            {{ formatNA(movie.Title) }}
          </div>
          <div class="text-caption text-grey-lighten-1">
            {{ formatMovieYear(movie.Year) }}
          </div>
        </div>
      </v-img>
    </v-card>
  </v-hover>
</template>

<style scoped>
.movie-card {
  width: 150px;
}

.movie-poster {
  height: 230px;
}

@media (min-width: 600px) {
  .movie-card {
    width: 200px;
  }
  .movie-poster {
    height: 300px;
  }
}

:deep(.v-card__overlay) {
  display: none;
}

.gradient-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 100%);
}

.transition-swing {
  transition: transform 0.3s ease-in-out;
}

.on-hover {
  transform: scale(1.05);
  cursor: pointer;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
