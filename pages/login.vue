<script setup lang="ts">
import type { LoginResponse } from '~/types/auth'

const form = reactive({ email: '', password: '' })
const myForm = ref<any>(null)
const loading = ref(false)
const errorMsg = ref('')

const emailRules = [
  (v: string) => !!v || 'El correo es obligatorio',
  (v: string) => /.+@.+\..+/.test(v) || 'El correo debe ser válido'
]

const passwordRules = [
  (v: string) => !!v || 'La contraseña es obligatoria',
  (v: string) => v.length >= 6 || 'Mínimo 6 caracteres'
]

const handleLogin = async () => {
  const { valid } = await myForm.value.validate()

  if (!valid) return
  loading.value = true
  errorMsg.value = ''

  try {
    const response = await $fetch<LoginResponse>('/api/login', {
      method: 'POST',
      body: form
    })

    await delay(1000)

    localStorage.setItem('auth_token', response.token)
    navigateTo('/')
  } catch (err: unknown) {
    await delay(1000)

    if (err && typeof err === 'object' && 'statusMessage' in err) {
      errorMsg.value = (err as any).statusMessage || 'Credenciales inválidas'
    } else {
      errorMsg.value = 'Ocurrió un error inesperado'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card width="100%" max-width="700" class="pa-12 rounded-xl" elevation="5">
      <p class="text-h4 mb-10 text-center font-weight-bold">Iniciar sesión</p>

      <v-form @submit.prevent="handleLogin" ref="myForm">
        <v-text-field
          v-model="form.email"
          label="Correo electrónico"
          variant="outlined"
          :rules="emailRules"
          class="mb-6"
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          label="Contraseña"
          variant="outlined"
          :rules="passwordRules"
          class="mb-10"
        ></v-text-field>

        <v-btn :loading="loading" type="submit" block color="primary" height="60" size="x-large">
          Ingresar
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
