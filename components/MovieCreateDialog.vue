<script setup lang="ts">
import { VForm } from 'vuetify/components'
import type { CreateMoviePayload } from '~/types/movies'

const uiStore = useUiStore()
const movieStore = useMovieStore()

const DEFAULT_POSTER = '/placeholder-poster.png'
const myForm = ref<InstanceType<typeof VForm> | null>(null)
const showSuccessSnackbar = ref(false)

const newMovie = ref<CreateMoviePayload>({
  Title: '',
  Year: '',
  Plot: '',
  Poster: DEFAULT_POSTER
})

const rules = {
  required: (v: string) => !!v || 'Este campo es obligatorio',
  year: (v: string) => /^\d{4}$/.test(v) || 'Ingresa un año válido (4 dígitos)'
}

const onFileChange = (file: File | File[]) => {
  const selectedFile = Array.isArray(file) ? file[0] : file
  if (!selectedFile) {
    newMovie.value.Poster = DEFAULT_POSTER
    return
  }
  const reader = new FileReader()
  reader.onload = (e) => {
    newMovie.value.Poster = e.target?.result as string
  }
  reader.readAsDataURL(selectedFile)
}

const handleSave = async () => {
  if (!myForm.value) return
  const validation = await myForm.value.validate()

  if (!validation.valid) {
    return
  }

  movieStore.addMovie({ ...newMovie.value })

  showSuccessSnackbar.value = true

  newMovie.value = {
    Title: '',
    Year: '',
    Plot: '',
    Poster: DEFAULT_POSTER
  }

  setTimeout(() => {
    if (!myForm.value) return
    uiStore.closeCreateModal()
    myForm.value.resetValidation()
  }, 500)
}
</script>

<template>
  <v-snackbar
    v-model="showSuccessSnackbar"
    color="success"
    location="top"
    elevation="24"
    :timeout="3000"
    rounded="pill"
  >
    <div class="d-flex align-center">
      <v-icon icon="mdi-check-circle" class="me-3"></v-icon>
      ¡Película guardada correctamente!
    </div>
  </v-snackbar>

  <v-dialog v-model="uiStore.isCreateMovieModalOpen" max-width="700px" persistent>
    <v-card class="rounded-xl pa-4">
      <v-card-title class="text-h5 font-weight-bold d-flex justify-space-between align-center">
        Nueva Película
        <v-btn icon="mdi-close" variant="text" @click="uiStore.closeCreateModal"></v-btn>
      </v-card-title>

      <v-card-text>
        <v-form ref="myForm" @submit.prevent="handleSave">
          <v-row>
            <v-col cols="12" sm="4" class="text-center">
              <v-img
                :src="newMovie.Poster"
                class="rounded-lg bg-grey-lighten-2 mb-4"
                height="250"
                cover
              ></v-img>
              <v-file-input
                label="Cambiar Poster"
                prepend-icon="mdi-camera"
                variant="outlined"
                density="compact"
                accept="image/*"
                hide-details
                @update:model-value="onFileChange"
              ></v-file-input>
            </v-col>

            <v-col cols="12" sm="8">
              <v-row dense>
                <v-col cols="12">
                  <Input
                    v-model="newMovie.Title"
                    label="Título"
                    :rules="[rules.required]"
                    is-editing
                  />
                </v-col>
                <v-col cols="12">
                  <Input
                    v-model="newMovie.Year"
                    label="Año de estreno"
                    :rules="[rules.required, rules.year]"
                    is-editing
                  />
                </v-col>
                <v-col cols="12">
                  <Input
                    v-model="newMovie.Plot"
                    label="Sinopsis"
                    type="textarea"
                    :rules="[rules.required]"
                    is-editing
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="uiStore.closeCreateModal">Cancelar</v-btn>
        <v-btn color="primary" variant="flat" class="px-8" @click="handleSave" rounded="pill">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
