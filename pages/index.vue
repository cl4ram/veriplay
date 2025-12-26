<script setup lang="ts">
const isAuthorized = ref(false)

onMounted(() => {
  const token = localStorage.getItem('auth_token')
  if (!token) {
    navigateTo('/login')
  } else {
    isAuthorized.value = true
  }
})
</script>

<template>
  <v-container v-if="isAuthorized">
    <h1>Contenido de la Home</h1>
  </v-container>
</template>
