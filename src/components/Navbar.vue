<template>
        <nav class="bg-gray-800 p-4">
        <div class="container mx-auto flex justify-between items-center">
            <div class="text-white text-lg font-bold">MyWebsite</div>
            <ul class="flex space-x-4">
                <RouterLink to="/">
                    <li><a href="#" class="text-gray-300 hover:text-white">Home</a></li>
                </RouterLink>
                <RouterLink to="/wiki">
                    <li><a href="#" class="text-gray-300 hover:text-white">Wiki</a></li>

                </RouterLink>
                <RouterLink to="/juego">
                    <li><a href="#" class="text-gray-300 hover:text-white">Juego</a></li>
                </RouterLink>]
                <RouterLink to="/historial">
                    <li><a href="#" class="text-gray-300 hover:text-white">Historial</a></li>
                </RouterLink>
            </ul>
        </div>
    </nav>
</template>
