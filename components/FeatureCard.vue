<script setup lang="ts">
import type { MovieDetail } from '~/types/movies'

defineProps<{ movie: MovieDetail }>()
const emit = defineEmits<{
  (e: 'select', imdbId: string): void
}>()
</script>

<template>
  <v-card
    flat
    color="transparent"
    class="feature-card-wrapper"
    :class="$vuetify.display.mobile ? 'mobile-mode' : 'desktop-mode'"
    :width="$vuetify.display.mobile ? '280' : '450'"
    @click="emit('select', movie.imdbID)"
  >
    <div class="background-container rounded-xl">
      <div class="blurred-bg" :style="{ backgroundImage: `url(${movie.Poster})` }"></div>
      <div class="overlay-bg"></div>
    </div>

    <div
      class="content-layout d-flex pa-4"
      :class="
        $vuetify.display.mobile ? 'flex-column align-center text-center' : 'flex-row align-center'
      "
    >
      <v-img
        :src="movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-poster.png'"
        :width="$vuetify.display.mobile ? '160' : '200'"
        :height="$vuetify.display.mobile ? '240' : '300'"
        cover
        class="rounded-lg featured-poster"
      />

      <div :class="$vuetify.display.mobile ? 'mt-4' : 'ml-5'">
        <h3 class="text-h6 text-white mb-1 line-clamp-1 font-weight-bold">
          {{ formatNA(movie.Title) }}
        </h3>

        <p class="text-caption text-grey-lighten-3 line-clamp-4 mb-3">
          {{ movie.Plot || 'Ver los detalles de esta película' }}
        </p>

        <div
          class="d-flex align-center gap-2"
          :class="{ 'justify-center': $vuetify.display.mobile }"
        >
          <v-chip size="x-small" color="white" variant="outlined" class="font-weight-bold">
            {{ formatMovieYear(movie.Year) }}
          </v-chip>
          <div class="d-flex align-center ml-2">
            <v-icon size="small" color="amber" class="mr-1">mdi-star</v-icon>
            <span class="text-caption font-weight-black text-white">
              {{ formatNA(movie.imdbRating) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>
<style scoped>
:deep(.v-card__overlay) {
  display: none;
}

.feature-card-wrapper {
  position: relative;
  overflow: visible !important;
  padding-top: 60px;
  flex-shrink: 0;
}

.mobile-mode.feature-card-wrapper {
  padding-top: 50px;
}

.mobile-mode .content-layout {
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.mobile-mode .featured-poster {
  margin-top: -70px;
  margin-left: 0;
  margin-bottom: 10px;
}
.mobile-mode .background-container {
  top: 60px;
}

.background-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 40px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 0;
}
.content-layout {
  position: relative;
  z-index: 1;
  width: 100%;
}

.blurred-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  filter: blur(25px) brightness(0.6);
  transform: scale(1.5);
}

.featured-poster {
  transition: transform 0.3s ease-in-out;
  margin-top: -80px;
  flex-shrink: 0;
}

.feature-card-wrapper:hover .featured-poster {
  transform: scale(1.05);
}

.line-clamp-1 {
  display: -webkit-box;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-4 {
  display: -webkit-box;
  line-clamp: 4;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
