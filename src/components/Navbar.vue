<template>
        <nav class="bg-gray-800 p-4">
        <div class="container mx-auto flex justify-between items-center">
            <RouterLink to="/">
                <div class="text-white text-lg font-bold">MyWebsite</div>
            </RouterLink>
            <div v-show="isAuthenticated">
                <ul class="flex space-x-4">
                <RouterLink to="/">
                    <li><a href="#" class="text-gray-300 hover:text-white">Home</a></li>
                </RouterLink>
                <RouterLink to="/wiki">
                    <li><a href="#" class="text-gray-300 hover:text-white">Wiki</a></li>

                </RouterLink>
                <RouterLink to="/juego">
                    <li><a href="#" class="text-gray-300 hover:text-white">Juego</a></li>
                </RouterLink>
                <RouterLink to="/historial">
                    <li><a href="#" class="text-gray-300 hover:text-white">Historial</a></li>
                </RouterLink>
            </ul>
            </div>
            <div v-if="!isAuthenticated">
                <RouterLink to="/login">
                <button class="flex justify-center p-2 rounded-md bg-green-800 text-white space-x-2 hover:bg-green-900">
                <span class="material-symbols-outlined">
                login
                </span>
                Login
            </button>
            </RouterLink>
            </div>
            <div v-if="isAuthenticated">
                <button class="flex justify-center p-2 bg-red-800 rounded-md text-white space-x-2 hover:bg-red-900">
                    <span class="material-symbols-outlined">
                    logout
                    </span>
                    Logout
                </button>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            isAuthenticated: true,
        }
    }
}
</script>
