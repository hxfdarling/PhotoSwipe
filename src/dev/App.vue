<template>
  <div ref="root"
       class="preview-box">
    <img class="preview-img"
         v-for="(item, index) in list"
         :src="item.src"
         height="100"
         @click="preview(index, Object.assign(list),$refs.root)">
  </div>
</template>

<script>
import open from '../preview'
export default {
  methods: {
    preview(...args) {
      open(...args)
    }
  },
  data() {
    return {
      list: [{
        src: 'https://placekitten.com/1200/900',
        w: 1200,
        h: 900
      }, {
        src: 'https://placekitten.com/1200/900',
        w: 1200,
        h: 900
      }]
    }
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
