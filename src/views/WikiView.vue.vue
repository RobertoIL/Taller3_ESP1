<template>
    <main class="flex flex-col items-center">
        <div class="flex flex-col py-10 space-y-5 w-[600px]">
                <CardCharacter
                v-for="(character, index) in characters"
                :key="index"
                :image="character.image"
                :name="character.name"
                :description="character.description"/>
            </div>
    </main>

</template>
<script>
import CardCharacter from "../components/CardCharacter.vue";

export default {
    components: {
        CardCharacter
    },
    data() {
         return {
             characters: [
                {
                 image: '/public/images/game/characters/archer.png', 
                 name: 'Arquero', 
                 description: 'Elimina enemigos a distancia con precisión milimétrica, evade ataques con agilidad felina y se mueve sigilosamente para ataques furtivos.' 
                }, 
                { 
                    image: '/public/images/game/characters/mage.png', 
                    name: 'Mago', 
                    description: 'Controla el campo de batalla con ataques elementales, ilusiones y encantamientos, y posee un amplio conocimiento de hechizos.' }, 
                { 
                    image: '/public/images/game/characters/lancer.png', 
                    name: 'Lancero', 
                    description: 'Guerrero de primera línea que inflige gran daño, defiende con precisión mortal y lidera con lealtad e inspiración.' },
                {
                    image: '/public/images/game/characters/saber.png',
                    name: 'Espadachín',
                    description: 'Elimina enemigos rápidamente con ataques letales de katana, se adapta a diferentes estilos de combate con otras armas y evade ataques con movimientos rápidos.'
                },
            ]
        }
    }
}
</script>