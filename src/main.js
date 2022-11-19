import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router"
import Home from "./containers/Home.vue"
import AnimeDetail from "./containers/AnimeDetail.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", name:"Home", component: Home},
        {path: "/detail/:id", name:"Anime Detail", component: AnimeDetail},
    ]
})

createApp(App).use(router).mount('#app')
