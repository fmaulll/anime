<script setup>
defineProps({
  genre: String,
});
</script>
<template>
  <div class="genre-container">
    <h5>{{ genre }}</h5>
  </div>
</template>
<style scoped>
.genre-container {
  border-radius: 16px;
  border: 2px solid #004d51;
  background-color: #5ce1ff;
  margin-right: 5px;
  margin-bottom: 5px;
}
.genre-container h5 {
  color: #004d51;
  padding: 5px;
  margin: 0;
}
</style>
