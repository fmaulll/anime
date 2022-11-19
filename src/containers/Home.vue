<script setup>
import { ref, onMounted, watch } from "vue";
import Axios from "axios";
import Genre from "../components/Genre.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const animeList = ref([]);
const dataRequest = ref({
  page: 1,
  size: 20,
});

const handleClickLoad = () => {
  dataRequest.value.size += 20;
  getAnimeList();
};

const getAnimeList = async () => {
  try {
    const result = await Axios({
      method: "GET",
      url: "https://anime-db.p.rapidapi.com/anime",
      params: dataRequest.value,
      headers: {
        "X-RapidAPI-Key": "204c6b1bb1msha3da52b9b787d76p130040jsnad95b96f6efa",
        "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
      },
    });
    if (result.status === 200) {
      animeList.value = result.data.data;
    }
  } catch (err) {
    alert("Cannot get anime list! \n", err);
  }
};

const handleClickAnime = (id) => {
  router.push(`/detail/${id}`);
};

watch(animeList, (newVal) => {
  // console.log(animeList.value);
});

watch(dataRequest, (newVal) => {
  console.log(newVal);
  // getAnimeList();
});

onMounted(() => {
  getAnimeList();
});
</script>
<template>
  <div class="container">
    <div
      v-for="anime in animeList"
      class="anime"
      @click="handleClickAnime(anime._id)"
    >
      <h1>{{ anime.ranking }}</h1>
      <img :src="anime.image" :alt="anime.title" />
      <div class="information">
        <h3>
          {{
            anime.title.length > 40
              ? anime.title.slice(0, 40) + "..."
              : anime.title
          }}
        </h3>
        <div class="genre">
          <Genre v-for="genre in anime.genres" :genre="genre" />
        </div>
        <h4>Episodes: {{ anime.episodes }}</h4>
        <h4>Status: {{ anime.status }}</h4>
      </div>
    </div>
  </div>
  <div class="load-container">
    <button @click="handleClickLoad" class="button-18" role="button">
      Load more
    </button>
  </div>
</template>
<style scoped>
.container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  min-height: 100vh;
  justify-content: space-between;
}
.anime {
  cursor: pointer;
  position: relative;
  border-radius: 8px;
  width: 300px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}

.anime h1 {
  min-width: 50px;
  color: #212121;
  min-height: 50px;
  margin: 5px 0 0 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffea00;
  position: absolute;
  top: 0;
  left: 0;
}

.anime img {
  border-radius: 8px 8px 0 0;
  width: 300px;
  height: 400px;
}

.anime h3 {
  margin: 0;
  padding: 0;
  height: 55px;
}

.information {
  padding: 10px;
}

.genre {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
}

.load-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

/* CSS */
.button-18 {
  align-items: center;
  background-color: #0a66c2;
  border: 0;
  border-radius: 100px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto,
    "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell,
    "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Lucida Grande", Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 20px;
  max-width: 480px;
  min-height: 40px;
  min-width: 0px;
  overflow: hidden;
  padding: 0px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  touch-action: manipulation;
  transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s,
    box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s,
    color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
}

.button-18:hover,
.button-18:focus {
  background-color: #16437e;
  color: #ffffff;
}

.button-18:active {
  background: #09223b;
  color: rgb(255, 255, 255, 0.7);
}

.button-18:disabled {
  cursor: not-allowed;
  background: rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.3);
}
</style>
