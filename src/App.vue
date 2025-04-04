<template>
  <div id="app">
    <header>
      <div class="title">
        <h1>Star Wars API - IIOT</h1>
      </div>
      <div class="buttons">
        <nav>
          <ul>
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link to="/search">Buscar Dados</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <router-view />
  </div>
</template>

<script lang="ts">
import './assets/scss/reset.scss';
import './assets/scss/variables.scss';
import './assets/scss/global.scss';

export default {
  name: 'App',
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.title {
  flex: 2; /* Faz o título ocupar o máximo de espaço possível */
  text-align: center; /* Centraliza o título dentro do container */
}

h1 {
  margin: 0;
  font-size: 2rem;
  color: #ffffff;
}

/* Estilo para os botões de navegação */
.buttons {
  display: flex;
}

nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav li {
  margin-right: 20px; /* Espaçamento entre os links */
}

nav a {
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}


nav a:hover {
  background-color: #42b983;
  color: #fff;
}

.router-link-exact-active {
  background-color: #42b983;
  color: #fff;
}
</style>
