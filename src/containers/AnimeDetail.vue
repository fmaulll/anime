<script setup>
import Axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import BackIcon from "../assets/BackIcon.svg";
import Genre from "../components/Genre.vue";

defineProps({
  animeId: Number,
});

const router = useRouter();
const route = useRoute();
const animeDetail = ref({});

const getDetail = async () => {
  try {
    const result = await Axios({
      method: "GET",
      url: `https://anime-db.p.rapidapi.com/anime/by-id/${route.params.id}`,
      headers: {
        "X-RapidAPI-Key": "204c6b1bb1msha3da52b9b787d76p130040jsnad95b96f6efa",
        "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
      },
    });
    animeDetail.value = result.data;
  } catch (err) {
    alert("Cannot get detail!\n", err);
  }
};

const handleClickBack = () => {
  router.go(-1);
};

onMounted(() => {
  getDetail();
});
</script>
<template>
  <div class="back" @click="handleClickBack">
    <img :src="BackIcon" />
    Back
  </div>
  <div class="detail-container">
    <img :src="animeDetail.image" />
    <div class="top-container">
      <h2>{{ animeDetail.title }}</h2>
      <div class="type">{{ animeDetail.type }}</div>
    </div>
    <h3>Genres:</h3>
    <div class="genre">
      <Genre v-for="genre in animeDetail.genres" :genre="genre" />
    </div>
    <h3>Alternative Titles:</h3>
    <p v-for="anime in animeDetail.alternativeTitles">{{ anime }}</p>
    <h3>Synopsis:</h3>
    <p>{{ animeDetail.synopsis }}</p>
  </div>
</template>
<style scoped>
.back {
  width: min-content;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  padding: 10px;
  transition: 0.5s;
  border-radius: 8px;
}
.back img {
  margin-right: 8px;
}

.back:hover {
  background-color: rgb(210, 255, 255);
}

.top-container {
  display: flex;
  align-items: center;
}
.type {
  margin-left: 10px;
  font-weight: 600;
  padding: 4px;
  width: min-content;
  background-color: rgb(255, 160, 160);
  color: rgb(96, 0, 0);
  border-radius: 16px;
  border: 2px solid rgb(96, 0, 0);
}
.genre {
  display: flex;
}

.detail-container p {
  line-height: 25px;
}
</style>
