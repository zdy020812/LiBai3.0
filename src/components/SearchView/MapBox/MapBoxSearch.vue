<template>
  <div id="map"></div>
</template>

<script>
// import * as LiBaiLife from './text100.js';
import * as LiBaiLife from './MapBoxSearch.js';

export default {
  name: 'MapBoxDemo',
  data() {
    return {
      num: 0
    }
  },
  methods: {},
  mounted() {
    LiBaiLife.text2()
  }
}
</script>

<style scoped></style>
