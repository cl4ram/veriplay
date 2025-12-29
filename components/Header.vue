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

const isMobileSearchOpen = ref(false)

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

onUnmounted(() => {
  if (debounceTimeout) clearTimeout(debounceTimeout)
})
</script>

<template>
  <v-container :fluid="fluid" class="d-flex align-center pa-4 position-relative">
    <div
      v-if="!isMobileSearchOpen || !$vuetify.display.mobile"
      class="d-flex align-center logo-header"
    >
      <h1 class="logo-text text-on-surface">VERI<span class="text-gradient">PLAY</span></h1>
    </div>

    <v-spacer v-if="!isMobileSearchOpen"></v-spacer>

    <v-responsive v-if="showSearch && !$vuetify.display.mobile" max-width="400" class="mx-4">
      <v-text-field
        v-model="searchStore.query"
        label="Buscar titulos..."
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

    <div
      v-if="showSearch && $vuetify.display.mobile"
      class="mobile-search-wrapper"
      :class="{ 'mobile-search-active flex-grow-1': isMobileSearchOpen }"
    >
      <v-btn v-if="!isMobileSearchOpen" icon variant="text" @click="isMobileSearchOpen = true">
        <v-icon size="24" class="icon-custom">mdi-magnify</v-icon>
      </v-btn>

      <v-text-field
        v-else
        v-model="searchStore.query"
        autofocus
        prepend-inner-icon="mdi-arrow-left"
        @click:prepend-inner="isMobileSearchOpen = false"
        placeholder="Buscar titulos"
        variant="solo-filled"
        rounded="pill"
        flat
        density="compact"
        hide-details
        clearable
        full-width
        class="search-input-expanded"
      />
    </div>

    <v-spacer v-if="!isMobileSearchOpen"></v-spacer>

    <v-btn
      v-if="!isMobileSearchOpen || !$vuetify.display.mobile"
      icon
      variant="text"
      @click="toggleTheme"
    >
      <v-icon size="24" class="icon-custom">
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
  font-size: 2rem;
  letter-spacing: -1px;
}
</style>
