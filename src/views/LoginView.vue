<template>
  <main class="flex justify-center py-20 text-white">
    <div class="bg-slate-800 rounded-lg opacity-90 flex flex-col items-center justify-center w-1/3">
      <img src="/public/images/logo.png" alt="" class="w-52 h-52">
      <h1 class="text-center text-3xl font-bold pb-5 font-font_tittle">Iniciar Sesión</h1>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="text-sm font-medium text-gray-300">Nombre de usuario</label>
          <input
            v-model="username"
            type="text"
            id="username"
            name="username"
            required
            autocomplete="username"
            class="mt-1 w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Nombre de usuario"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="text-sm font-medium text-gray-300">Contraseña</label>
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            required
            autocomplete="current-password"
            class="mt-1 w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Password"
          />
        </div>
        <button
          tag="button"
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Entrar
        </button>
        <div v-if="errorMessage" class="mt-4 text-red-500 text-sm">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore.js'

export default {
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const username = ref('')
    const password = ref('')
    const errorMessage = ref('')

    const login = () => {
      const user = { username: username.value, password: password.value }
      const isAuthenticated = authStore.login(user)
      if (isAuthenticated) {
        errorMessage.value = ''
        router.push("/")
      } else {
        errorMessage.value = 'Nombre de usuario o contraseña incorrectos.'
      }
    }

    return {
      username,
      password,
      login,
      errorMessage
    }
  }
}
</script>

