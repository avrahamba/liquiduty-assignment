import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import People from "./pages/People.vue";
import Films from './pages/Films.vue'
import Planets from './pages/Planets.vue'
import Species from './pages/Species.vue'
import Starships from './pages/Starships.vue'
import Vehicles from './pages/Vehicles.vue'

const options = {
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/people", name: "People", component: People },
    { path: "/films", name: "Films", component: Films },
    { path: "/planets", name: "Planets", component: Planets },
    { path: "/species", name: "Species", component: Species },
    { path: "/starships", name: "Starships", component: Starships },
    { path: "/vehicles", name: "Vehicles", component: Vehicles },
  ],
};

export const router = createRouter(options);
