<script setup lang="ts">
import type { Movie } from '~/types/movies'

defineProps<{ movie: Movie }>()
defineEmits(['select'])
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-bind="props"
      :elevation="isHovering ? 12 : 2"
      :class="{ 'on-hover': isHovering }"
      class="mx-auto transition-swing"
      width="200"
      rounded="lg"
      @click="$emit('select', movie.imdbID)"
    >
      <v-img :src="movie.Poster" height="300" cover class="align-end">
        <div class="fill-height d-flex flex-column justify-end pa-3 gradient-overlay">
          <div class="text-subtitle-1 font-weight-bold text-white truncate">
            {{ movie.Title }}
          </div>
          <div class="text-caption text-grey-lighten-1">
            {{ movie.Year }}
          </div>
        </div>
      </v-img>
    </v-card>
  </v-hover>
</template>

<style scoped>
:deep(.v-card__overlay) {
  display: none;
}

.gradient-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 90%);
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
