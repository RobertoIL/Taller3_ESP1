<template>
    <main class="flex justify-center py-20 px-96 text-white">
         <div class="p-5 bg-slate-800 min-w-96 rounded-lg opacity-90">
             <h1 class="text-center text-3xl font-bold pb-10">Iniciar Sesión</h1>
             <form action="#" method="POST">
                 <div class="mb-4">
                     <label for="email" class="block text-sm font-medium text-gray-300">Email</label>
                     <input type="email" id="email" name="email" required autocomplete="email" 
                            class="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-500 
                            focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                            placeholder="user@example.com">
                 </div>
                 <div class="mb-6">
                     <label for="password" class="block text-sm font-medium text-gray-300">Contraseña</label>
                     <input type="password" id="password" name="password" required autocomplete="current-password" 
                            class="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-500 
                            focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                            placeholder="password">
                 </div>
                 <RouterLink to="/" tag="button" type="submit"
                             class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
                             text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
                             focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                     Entrar
                 </RouterLink>
             </form>
         </div>
    </main>
 </template>
 