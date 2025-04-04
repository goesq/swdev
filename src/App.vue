<template>
  <div id="app">
    <header>
      <div class="left-nav">
        <router-link to="/">Home</router-link>
      </div>

      <div class="title">
        <h1>Star Wars API - IIOT</h1>
      </div>

      <div class="buttons">
        <nav>
          <ul>
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

/* Novo container pro link Home */
.left-nav {
  flex: 1;
}

.left-nav a {
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.left-nav a:hover,
.router-link-exact-active {
  background-color: #42b983;
  color: #fff;
}

/* Título centralizado */
.title {
  flex: 2;
  text-align: center;
}

h1 {
  margin: 0;
  font-size: 2rem;
  color: #ffffff;
}

/* Botão de buscar à direita */
.buttons {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav li {
  margin-left: 20px;
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

</style>
