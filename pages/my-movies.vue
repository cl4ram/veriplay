<script setup lang="ts">
const movieStore = useMovieStore()
definePageMeta({ layout: 'admin' })

const isSelectionMode = ref(false)
const selectedIds = ref<string[]>([])
const showConfirmDialog = ref(false)

const deleteSelected = () => {
  showConfirmDialog.value = true
}

const toggleSelect = (id: string) => {
  if (!isSelectionMode.value) return

  const index = selectedIds.value.indexOf(id)
  if (index > -1) {
    selectedIds.value.splice(index, 1)
  } else {
    selectedIds.value.push(id)
  }
}

const confirmDelete = () => {
  selectedIds.value.forEach((id) => {
    movieStore.deleteMovie(id)
  })

  selectedIds.value = []
  isSelectionMode.value = false
  showConfirmDialog.value = false
}

const cancelSelection = () => {
  isSelectionMode.value = false
  selectedIds.value = []
}

onMounted(() => {
  movieStore.initCustomMovies()
})
</script>

<template>
  <v-container>
    <div
      v-if="movieStore.customMovies.length > 0"
      class="d-flex justify-space-between align-center mb-10 w-100"
    >
      <v-btn variant="tonal" prepend-icon="mdi-arrow-left" @click="$router.back()" rounded="pill">
        Volver
      </v-btn>

      <div v-if="!isSelectionMode">
        <v-btn
          color="on-surface"
          prepend-icon="mdi-check-all"
          variant="outlined"
          rounded="pill"
          @click="isSelectionMode = true"
        >
          Seleccionar
        </v-btn>
      </div>

      <div v-else class="d-flex gap-2 align-center">
        <v-btn
          color="error"
          variant="flat"
          rounded="pill"
          :disabled="selectedIds.length === 0"
          @click="deleteSelected"
        >
          Eliminar ({{ selectedIds.length }})
        </v-btn>
        <v-btn variant="text" @click="cancelSelection">Cancelar</v-btn>
      </div>
    </div>
    <h1 class="text-h4 font-weight-bold mb-5">Mis Películas</h1>

    <v-row v-if="movieStore.customMovies.length > 0">
      <v-col
        v-for="movie in movieStore.customMovies"
        :key="movie.imdbID"
        cols="6"
        sm="4"
        md="4"
        lg="3"
      >
        <div
          class="position-relative cursor-pointer transition-swing"
          @click="toggleSelect(movie.imdbID)"
          style="max-width: fit-content"
        >
          <v-overlay
            :model-value="selectedIds.includes(movie.imdbID)"
            contained
            scrim="primary"
            persistent
            class="align-center justify-center rounded-lg"
            style="opacity: 0.7"
          >
            <v-icon size="64" color="white">mdi-check-circle</v-icon>
          </v-overlay>

          <MovieCard :movie="movie" :disabled="isSelectionMode" />
        </div>
      </v-col>
    </v-row>

    <v-empty-state
      v-else
      icon="mdi-movie-off"
      title="No hay películas"
      text="Tu lista personal está vacía."
    ></v-empty-state>
    <v-dialog v-model="showConfirmDialog" max-width="400">
      <v-card class="rounded-xl pa-4 text-center">
        <v-card-text class="pt-4">
          <v-avatar color="error-lighten-4" size="72" class="mb-4">
            <v-icon icon="mdi-alert-octagon" color="error" size="40"></v-icon>
          </v-avatar>

          <h3 class="text-h5 font-weight-bold mb-2">¿Estás seguro?</h3>
          <p class="text-body-1 text-medium-emphasis">
            Estás a punto de eliminar <strong>{{ selectedIds.length }}</strong> películas. Esta
            acción no se puede deshacer.
          </p>
        </v-card-text>

        <v-card-actions class="justify-center gap-2 pb-4">
          <v-btn variant="text" class="px-6" @click="showConfirmDialog = false"> Cancelar </v-btn>
          <v-btn color="error" variant="flat" class="px-8 rounded-lg" @click="confirmDelete">
            Sí, eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.transition-swing {
  transition: all 0.3s ease;
}
</style>
