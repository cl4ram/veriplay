<template>
  <v-app>
    <v-app-bar flat color="surface">
      <Header is-header :fluid="true"></Header>
    </v-app-bar>

    <v-navigation-drawer expand-on-hover rail permanent color="surface">
      <v-list density="compact" nav class="mt-2">
        <v-list-item prepend-icon="mdi-home" title="Inicio" to="/" />

        <v-list-item
          prepend-icon="mdi-plus-circle"
          title="Crear Película"
          color="primary"
          @click="openCreateModal"
        />
        <v-list-item
          prepend-icon="mdi-logout"
          title="Cerrar Sesión"
          color="error"
          class="rounded-lg"
          @click="handleLogout"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="pa-6">
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
const handleLogout = () => {
  localStorage.removeItem('auth_token')
  navigateTo('/login')
}

const openCreateModal = () => {}
</script>
