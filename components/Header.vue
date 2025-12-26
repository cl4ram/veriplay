<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

const isDark = computed(() => theme.global.current.value.dark)

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark'

  localStorage.setItem('theme_preference', theme.global.name.value)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme_preference')
  if (savedTheme) {
    theme.global.name.value = savedTheme
  }
})
</script>

<template>
  <v-container class="d-flex justify-space-between align-center">
    <div :class="['d-flex align-center', 'logo-header']">
      <h1 class="logo-text text-on-surface">VERI<span class="text-gradient">PLAY</span></h1>
    </div>
    <v-btn
      icon
      variant="text"
      @click="toggleTheme"
      :tooltip="`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`"
    >
      <v-icon size="28">
        {{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
      </v-icon>
    </v-btn>
  </v-container>
</template>

<style scoped>
.logo-text {
  font-family: 'Chivo', sans-serif !important;
  font-weight: 900;
  letter-spacing: -2px;
  text-transform: uppercase;
  transition: all 0.3s ease;
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
