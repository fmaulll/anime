<script setup>
import Axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import BackIcon from "../assets/BackIcon.svg";

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
  <div class="back">
    <img :src="BackIcon" />
    Back
  </div>
  <h1>{{ animeDetail.title }}</h1>
</template>
<style scoped>
.back {
  width: min-content;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
}
.back img {
  margin-right: 8px;
}
</style>
