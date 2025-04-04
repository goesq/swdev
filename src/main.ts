
import 'primeicons/primeicons.css';
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from './views/HomePage.vue';
import SearchPage from './views/SearchPage.vue';


// Defina as rotas com tipagem
const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
component: HomePage
 },
  {
     path: '/search',
    component: SearchPage 
},
];

// Criação do Vue Router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router); // Use Vue Router
app.mount('#app');
