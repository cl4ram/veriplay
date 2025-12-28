<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useRoute, useRouter } from 'vue-router'
import { useSearchStore } from '~/stores/search'

defineProps({
  fluid: Boolean
})

const theme = useTheme()
const route = useRoute()
const router = useRouter()
const searchStore = useSearchStore()
const { searchMovies } = useMovies()

const isDark = computed(() => theme.global.current.value.dark)
const showSearch = computed(() => route.path !== '/login')

let debounceTimeout: ReturnType<typeof setTimeout> | null = null

const toggleTheme = () => {
  theme.change(isDark.value ? 'light' : 'dark')
}

const executeSearch = async (query: string) => {
  searchStore.startSearch(route.fullPath)

  if (route.path !== '/') {
    router.push('/')
  }

  searchStore.setLoading(true)

  try {
    const response = await searchMovies(query)
    const results = response.Response === 'True' ? response.Search ?? [] : []
    searchStore.setResults(results)
  } catch {
    searchStore.setResults([])
  } finally {
    searchStore.setLoading(false)
  }
}

watch(
  () => searchStore.query,
  (query) => {
    if (debounceTimeout) clearTimeout(debounceTimeout)
    if (!query || query.length < 3) {
      if (!query && searchStore.previousRoute) {
        router.push(searchStore.previousRoute)
        searchStore.clear()
      }
      return
    }
    debounceTimeout = setTimeout(() => {
      executeSearch(query)
    }, 500)
  }
)
</script>

<template>
  <v-container :fluid="fluid" class="d-flex align-center pa-4">
    <div class="d-flex align-center logo-header">
      <h1 class="logo-text text-on-surface">VERI<span class="text-gradient">PLAY</span></h1>
    </div>

    <v-spacer></v-spacer>

    <v-responsive v-if="showSearch" max-width="400" class="mx-4">
      <v-text-field
        v-model="searchStore.query"
        label="Buscar películas..."
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        rounded="pill"
        flat
        density="compact"
        hide-details
        clearable
        @click:clear="searchStore.clear()"
      />
    </v-responsive>

    <v-spacer></v-spacer>

    <v-btn icon variant="text" @click="toggleTheme">
      <v-icon size="28">
        {{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
      </v-icon>
      <v-tooltip activator="parent" location="bottom">
        {{ isDark ? 'Modo claro' : 'Modo oscuro' }}
      </v-tooltip>
    </v-btn>
  </v-container>
</template>

<style scoped>
.logo-text {
  font-family: 'Chivo', sans-serif !important;
  font-weight: 900;
  letter-spacing: -2px;
  text-transform: uppercase;
}

.text-gradient {
  background: linear-gradient(135deg, #7c4dff 0%, #00b8d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-header .logo-text {
  font-size: 1.8rem;
  letter-spacing: -1px;
}
</style>
