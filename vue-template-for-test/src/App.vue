<template>
  <DocxPreview />
  <CreatedTest />
</template>

<script>
import DocxPreview from './components/docx-preview/DocxPreview.vue'
import CreatedTest from './components/created-test-for-async/CreatedTest.vue'

export default {
  name: 'App',
  components: {
    DocxPreview,
    CreatedTest
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
