<template>
    <main class="flex flex-col items-center bg-gray-800">
        <div class="relative px-6 pt-10 lg:px-8">
            <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-pink-500 to-indigo-500 opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
            </div>
            <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div class="text-center">
                    <h1 class="text-5xl font-extrabold font-font_tittle tracking-tight text-white sm:text-7xl drop-shadow-lg">
                        Disfruta jugando sin límites
                    </h1>
                    <p class="mt-6 text-lg leading-8 text-gray-300 opacity-90">
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
                    </p>
                    <div class="mt-10 flex items-center justify-center gap-x-6">
                        <RouterLink to="/juego">
                            <button class="px-6 py-3 bg-blue-600 rounded-full text-white font-bold shadow-lg hover:bg-blue-800 transition transform hover:-translate-y-1 hover:scale-110 duration-300">
                                JUGAR
                            </button>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
        <div class="py-24 sm:py-32">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                    <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                        <dd class="order-first text-4xl font-semibold tracking-tight text-white sm:text-5xl drop-shadow-lg">44 million</dd>
                        <dt class="text-base leading-7 text-gray-300">Transacciones cada 24 horas</dt>
                    </div>
                    <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                        <dd class="order-first text-4xl font-semibold tracking-tight text-white sm:text-5xl drop-shadow-lg">$119,000</dd>
                        <dt class="text-base leading-7 text-gray-300">Inversión</dt>
                    </div>
                    <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                        <dd class="order-first text-4xl font-semibold tracking-tight text-white sm:text-5xl drop-shadow-lg">46,000</dd>
                        <dt class="text-base leading-7 text-gray-300">Nuevos usuarios</dt>
                    </div>
                </dl>
            </div>
        </div>
    </main>
</template>
