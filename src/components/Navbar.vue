<template>
    <nav class="bg-gray-800 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <RouterLink to="/">
          <div class="text-white text-lg font-bold">MyWebsite</div>
        </RouterLink>
        <div v-show="isAuthenticated">
          <ul class="flex space-x-4">
            <RouterLink to="/">
              <li class="text-gray-300 hover:text-white">Home</li>
            </RouterLink>
            <RouterLink to="/wiki">
              <li class="text-gray-300 hover:text-white">Wiki</li>
            </RouterLink>
            <RouterLink to="/juego">
              <li class="text-gray-300 hover:text-white">Juego</li>
            </RouterLink>
            <RouterLink to="/historial">
              <li class="text-gray-300 hover:text-white">Historial</li>
            </RouterLink>
          </ul>
        </div>
        <div v-if="!isAuthenticated">
          <RouterLink to="/login">
            <button class="flex justify-center p-2 rounded-md bg-green-800 text-white space-x-2 hover:bg-green-900">
              <span class="material-symbols-outlined">login</span>
              Login
            </button>
          </RouterLink>
        </div>
        <Menu v-show="isAuthenticated" as="div" class="relative inline-block text-left">
          <div>
            <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent text-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-slate-600">
              <span class="material-symbols-outlined">account_circle</span>
              {{ name }}
              <span class="material-symbols-outlined">keyboard_arrow_down</span>
            </MenuButton>
          </div>
          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <button @click="logout" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']">
                    Sign out
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </nav>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { useAuthStore } from '../stores/authStore.js'
  import { RouterLink } from 'vue-router'
  
  export default {
    setup() {
      const authStore = useAuthStore()
  
      const isAuthenticated = ref(authStore.isAuthenticated)
      const name = ref(authStore.user?.username)
  
      const logout = () => {
        authStore.logout()
        isAuthenticated.value = authStore.isAuthenticated
        name.value = authStore.user?.username
      }
  
      return {
        isAuthenticated,
        name,
        logout
      }
    },
    components: {
      RouterLink,
      Menu,
      MenuButton,
      MenuItem,
      MenuItems
    }
  }
  </script>
  