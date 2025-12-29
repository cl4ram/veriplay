<script setup lang="ts">
import type { LoginResponse, LoginForm } from '~/types/auth'
import { VForm } from 'vuetify/components'

const form = reactive<LoginForm>({
  email: '',
  password: ''
})
const myForm = ref<InstanceType<typeof VForm> | null>(null)
const loading = ref(false)
const errorMsg = ref('')
const showPassword = ref(false)

const emailRules = [
  (v: string) => !!v || 'El correo es obligatorio',
  (v: string) => /.+@.+\..+/.test(v) || 'El correo debe ser válido'
]

const passwordRules = [
  (v: string) => !!v || 'La contraseña es obligatoria',
  (v: string) => v.length >= 6 || 'Mínimo 6 caracteres'
]

const handleLogin = async () => {
  if (!myForm.value) return

  const { valid } = await myForm.value.validate()
  if (!valid) return

  loading.value = true
  errorMsg.value = ''

  try {
    const response = await $fetch<LoginResponse>('/api/login', {
      method: 'POST',
      body: form
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    localStorage.setItem('auth_token', response.token)
    navigateTo('/')
  } catch (err: any) {
    errorMsg.value = err.statusMessage || 'Credenciales inválidas. Intenta de nuevo.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container fluid class="pa-0 fill-height login-wrapper bg-background login-page">
    <div class="bg-blobs">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <v-row no-gutters class="fill-height align-center justify-center position-relative">
      <v-col cols="11" sm="8" md="5" lg="4" xl="3">
        <v-card class="glass-card pa-8 pa-md-12 rounded-xl text-center" elevation="0">
          <div class="mb-8">
            <h1 class="logo-text text-high-emphasis">
              VERI<span class="text-gradient">PLAY</span>
            </h1>
            <p class="text-subtitle-1 text-medium-emphasis">Iniciar sesión</p>
          </div>

          <v-alert
            v-if="errorMsg"
            type="error"
            variant="tonal"
            closable
            class="mb-6 rounded-lg text-left"
            @click:close="errorMsg = ''"
          >
            {{ errorMsg }}
          </v-alert>

          <v-form @submit.prevent="handleLogin" ref="myForm">
            <v-text-field
              v-model="form.email"
              label="Correo electrónico"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              :rules="emailRules"
              class="mb-4"
              rounded="lg"
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              label="Contraseña"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              variant="outlined"
              :rules="passwordRules"
              class="mb-6"
              rounded="lg"
              @click:append-inner="showPassword = !showPassword"
            ></v-text-field>

            <v-btn
              :loading="loading"
              type="submit"
              block
              color="primary"
              height="60"
              size="large"
              rounded="pill"
              class="elevation-8 login-btn font-weight-bold"
            >
              Iniciar Sesión
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.login-wrapper {
  overflow: hidden;
  position: relative;
  background-color: rgb(var(--v-theme-background));
}

.bg-blobs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(100px);
  z-index: 0;
}

.blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.4;
  animation: move 20s infinite alternate;
}

.blob-1 {
  width: 600px;
  height: 600px;
  background: #7c4dff;
  top: -150px;
  right: -100px;
}

.blob-2 {
  width: 500px;
  height: 500px;
  background: #00b8d4;
  bottom: -100px;
  left: -50px;
  animation-delay: -5s;
}

.blob-3 {
  width: 350px;
  height: 350px;
  background: #7c4dff;
  top: 30%;
  left: 10%;
  opacity: 0.2;
}

@keyframes move {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(80px, 40px) scale(1.1);
  }
}

.glass-card {
  background: rgba(var(--v-theme-surface), 0.6) !important;
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12) !important;
  z-index: 1;
}

.logo-text {
  font-family: 'Chivo', sans-serif !important;
  font-weight: 900;
  font-size: 3.5rem;
  letter-spacing: -3px;
}

.text-gradient {
  background: linear-gradient(135deg, #7c4dff 0%, #00b8d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-btn {
  background: linear-gradient(135deg, #7c4dff 0%, #00b8d4 100%) !important;
  color: white !important;
  letter-spacing: 1px;
}
</style>
