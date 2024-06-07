<template>
    <div class="flex overflow-x-auto">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="flex-shrink-0 w-64 h-64 m-2 bg-gray-200"
    >
      <CardCharacter :item="item" />
    </div>
  </div>
</template>

<script>


export default {
  components: {
    
  },
  data() {
    return {
      items: [

      ],
    };
  },
};
</script>