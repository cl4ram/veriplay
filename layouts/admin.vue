<template>
  <v-app>
    <v-navigation-drawer
      v-if="!$vuetify.display.mobile"
      permanent
      color="background"
      width="300"
      border="0"
      class="pa-4"
    >
      <div class="user-card pa-6 mb-6 mt-10 ml-2 mr-2">
        <v-avatar size="70" rounded="lg" class="mb-4 elevation-2">
          <v-img src="https://randomuser.me/api/portraits/women/50.jpg"></v-img>
        </v-avatar>

        <div class="text-caption text-grey-darken-1 mb-1 font-weight-medium">Bienvenido,</div>
        <div class="text-h5 font-weight-black text-on-surface">Admin User</div>
      </div>

      <v-list density="comfortable" nav bg-color="transparent">
        <v-list-item
          prepend-icon="mdi-home-outline"
          title="Inicio"
          to="/"
          rounded="lg"
          class="mb-2"
        />

        <v-list-item
          prepend-icon="mdi-plus-circle-outline"
          title="Crear Película"
          rounded="lg"
          class="mb-2"
          @click="uiStore.openCreateModal"
        />

        <v-list-item
          prepend-icon="mdi-movie-open-outline"
          to="/my-movies"
          title="Mis Películas"
          rounded="lg"
          class="mb-2"
        />

        <v-list-item
          prepend-icon="mdi-logout"
          title="Cerrar Sesión"
          rounded="lg"
          class="text-error mt-4"
          @click="handleLogout"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar flat color="background">
      <Header is-header :fluid="true"></Header>
    </v-app-bar>

    <v-bottom-navigation v-if="$vuetify.display.mobile" grow color="primary">
      <v-btn to="/" value="home">
        <v-icon>mdi-home</v-icon>
        <span>Inicio</span>
      </v-btn>

      <v-btn :active="false" @click="uiStore.openCreateModal">
        <v-icon>mdi-plus-circle</v-icon>
        <span>Crear</span>
      </v-btn>

      <v-btn to="/my-movies" value="movies">
        <v-icon>mdi-movie-open</v-icon>
        <span>Peliculas</span>
      </v-btn>

      <v-btn @click="handleLogout" value="logout">
        <v-icon>mdi-logout</v-icon>
        <span>Salir</span>
      </v-btn>
    </v-bottom-navigation>

    <v-main>
      <v-container fluid :class="$vuetify.display.mobile ? 'pa-4 pb-16' : 'pa-8'">
        <slot></slot>
      </v-container>
    </v-main>

    <MovieCreateDialog />
  </v-app>
</template>

<script setup lang="ts">
const uiStore = useUiStore()

const handleLogout = () => {
  localStorage.removeItem('auth_token')
  navigateTo('/login')
}
</script>

<style scoped>
.user-card {
  background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
  border-radius: 24px;
  border-bottom-right-radius: 4px;
  position: relative;
  overflow: hidden;
}

.v-theme--dark .user-card {
  background: linear-gradient(135deg, #2e2e35 0%, #36363c 100%);
}

.text-gradient {
  background: linear-gradient(135deg, #7c4dff 0%, #00b8d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

:deep(.v-list-item__prepend) {
  margin-inline-end: 12px !important;
}

:deep(.v-list-item__title) {
  font-weight: 600 !important;
  font-size: 0.95rem !important;
}

.text-error {
  color: #ff5252 !important;
}
</style>
