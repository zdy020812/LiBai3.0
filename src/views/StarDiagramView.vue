<template>
  <div class="star-diagram-view">
    <main style="width: 100%;height: 100%;">
      <star-diagram />
    </main>
  </div>
</template>

<script>
import sDiagram from '@/components/StarDiagramView/StarDiagram/sDiagram.vue';

export default {
  name: 'StarDiagramView',
  components: {
    'star-diagram': sDiagram,
  },
  
}
</script>

<style scoped>
.star-diagram-view {
  display: flex;
  flex-direction: column;
}
</style>