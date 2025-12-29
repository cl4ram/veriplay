<script setup lang="ts">
import type { MovieDetail } from '~/types/movies'

const route = useRoute()
const { getMovieById } = useMovies()

const movie = ref<MovieDetail | null>(null)
const editedMovie = ref<MovieDetail | null>(null)
const isEditing = ref(false)

definePageMeta({ layout: 'admin' })

const genres = computed(() => {
  const rawGenre = movie.value?.Genre
  if (!rawGenre || rawGenre === 'N/A') return ['Género no especificado']

  return rawGenre.split(',').map((g) => g.trim())
})

const toggleEdit = () => {
  if (isEditing.value) {
    editedMovie.value = JSON.parse(JSON.stringify(movie.value))
  }
  isEditing.value = !isEditing.value
}

const saveChanges = () => {
  movie.value = JSON.parse(JSON.stringify(editedMovie.value))
  isEditing.value = false
}

onMounted(async () => {
  const id = route.params.id as string
  const data = await getMovieById(id)
  if (data) {
    data.Year = formatMovieYear(data.Year)

    movie.value = data
    editedMovie.value = JSON.parse(JSON.stringify(data))
  }
})
</script>

<template>
  <v-container v-if="movie && editedMovie" fluid class="pa-0">
    <v-container>
      <div class="d-flex justify-space-between align-center mb-8">
        <v-btn variant="tonal" prepend-icon="mdi-arrow-left" @click="$router.back()" rounded="pill">
          Volver
        </v-btn>

        <div class="d-flex gap-2">
          <v-btn
            :color="isEditing ? 'grey-darken-3' : 'on-surface'"
            :variant="isEditing ? 'flat' : 'outlined'"
            :prepend-icon="isEditing ? 'mdi-close' : 'mdi-pencil'"
            rounded="pill"
            @click="toggleEdit"
          >
            {{ isEditing ? 'Cancelar' : 'Editar' }}
          </v-btn>
          <v-btn
            v-if="isEditing"
            color="primary"
            prepend-icon="mdi-check"
            @click="saveChanges"
            rounded="pill"
          >
            Guardar
          </v-btn>
        </div>
      </div>

      <v-row>
        <v-col cols="12" md="4" lg="3">
          <v-img :src="editedMovie.Poster" class="rounded-xl shadow-24 sticky-poster" cover />
          <Input
            v-if="isEditing"
            :is-editing="isEditing"
            label="URL del Poster"
            class="mt-4"
            :model-value="isEditing ? editedMovie.Poster : formatNA(movie.Poster)"
            @update:model-value="editedMovie.Poster = $event"
          />
        </v-col>

        <v-col cols="12" md="8" lg="9" class="ps-md-10">
          <v-row dense align="center" class="mb-2">
            <v-col cols="auto">
              <Input
                :is-editing="isEditing"
                label="Clasificación"
                text-clases="font-weight-bold"
                :model-value="isEditing ? editedMovie.Rated : formatNA(movie.Rated)"
                @update:model-value="editedMovie.Rated = $event"
              />
            </v-col>
          </v-row>

          <Input
            :is-editing="isEditing"
            label="Título"
            class="mb-4"
            text-clases="text-h2 font-weight-black"
            :model-value="isEditing ? editedMovie.Title : formatNA(movie.Title)"
            @update:model-value="editedMovie.Title = $event"
          />

          <div class="mb-6">
            <label v-if="isEditing" class="text-caption text-grey"
              >Géneros (separados por coma)</label
            >
            <div v-if="!isEditing" class="d-flex flex-wrap gap-2">
              <v-chip
                v-for="genre in genres"
                :key="genre"
                variant="tonal"
                color="secondary"
                label
                class="rounded-lg"
              >
                {{ genre }}
              </v-chip>
            </div>
            <Input
              v-else
              :is-editing="isEditing"
              :model-value="isEditing ? editedMovie.Genre : formatNA(movie.Genre)"
              @update:model-value="editedMovie.Genre = $event"
            />
          </div>

          <v-row class="mb-8 mt-2 glass-panel rounded-xl pa-4 mx-0 border-thin">
            <v-col cols="6" sm="3" class="text-center border-e-sm">
              <Input
                :is-editing="isEditing"
                label="Rating IMDb"
                text-clases="text-h6 font-weight-bold"
                :model-value="isEditing ? editedMovie.imdbRating : formatNA(movie.imdbRating)"
                @update:model-value="editedMovie.imdbRating = $event"
              />
            </v-col>

            <v-col cols="6" sm="3" class="text-center border-e-sm">
              <Input
                v-if="movie.Type === 'series'"
                :is-editing="isEditing"
                label="Temporadas"
                text-clases="text-h6 font-weight-bold"
                :model-value="isEditing ? editedMovie.totalSeasons : formatNA(movie.totalSeasons)"
                @update:model-value="editedMovie.totalSeasons = $event"
              />

              <Input
                v-else
                :is-editing="isEditing"
                label="Duración"
                text-clases="text-h6 font-weight-bold"
                :model-value="isEditing ? editedMovie.Runtime : formatNA(movie.Runtime)"
                @update:model-value="editedMovie.Runtime = $event"
              />
            </v-col>

            <v-col cols="6" sm="3" class="text-center border-e-sm">
              <Input
                v-model="editedMovie.Year"
                :is-editing="isEditing"
                label="Año"
                text-clases="text-h6 font-weight-bold"
              />
            </v-col>

            <v-col cols="6" sm="3" class="text-center">
              <Input
                :is-editing="isEditing"
                label="Idiomas disponibles"
                text-clases="text-h6 font-weight-bold"
                :model-value="isEditing ? editedMovie.Language : formatNA(movie.Language)"
                @update:model-value="editedMovie.Language = $event"
              />
            </v-col>
          </v-row>

          <div class="mb-8">
            <h3 class="text-h6 font-weight-bold mb-2">Sinopsis</h3>
            <Input
              :is-editing="isEditing"
              type="textarea"
              text-clases="text-body-1 leading-relaxed text-grey-lighten-1"
              :model-value="isEditing ? editedMovie.Plot : formatNA(movie.Plot)"
              @update:model-value="editedMovie.Plot = $event"
            />
          </div>

          <v-row>
            <v-col cols="12" sm="6">
              <h3 class="text-h6 font-weight-bold mb-2">Reparto</h3>
              <Input
                :is-editing="isEditing"
                type="textarea"
                text-clases="text-body-1 text-grey-lighten-1"
                :model-value="isEditing ? editedMovie.Actors : formatNA(movie.Actors)"
                @update:model-value="editedMovie.Actors = $event"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <h3 class="text-h6 font-weight-bold mb-2">Premios</h3>
              <Input
                :is-editing="isEditing"
                type="textarea"
                text-clases="text-body-1 text-grey-lighten-1"
                :model-value="isEditing ? editedMovie.Awards : formatNA(movie.Awards)"
                @update:model-value="editedMovie.Awards = $event"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<style scoped>
.shadow-24 {
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.5) !important;
}
.sticky-poster {
  position: sticky;
  top: 100px;
}
.gap-2 {
  gap: 8px;
}
.leading-relaxed {
  line-height: 1.6;
}
.border-thin {
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.glass-panel {
  background: rgba(var(--v-theme-on-surface), 0.05) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1) !important;
}
</style>
