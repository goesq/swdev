<template>
    <div class="search-page">
      <h1>Buscar e Atualizar Dados</h1>
      <div class="search-container">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por nome"
          @input="searchData"
        />
        <button @click="goBackToHomePage">Voltar à Exibição</button>
      </div>
  
      <div v-if="searchedPeople.length">
        <ul>
          <li v-for="person in searchedPeople" :key="person.name">
            <strong>{{ person.name }}</strong> - {{ person.birth_year }}
          </li>
        </ul>
      </div>
  
      <div v-else>
        <p>Nenhum resultado encontrado.</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  interface Person {
    name: string;
    birth_year: string;
  }
  
  export default defineComponent({
    name: 'SearchPage',
    setup() {
      const searchQuery = ref('');
      const searchedPeople = ref<Person[]>([]);
      const router = useRouter();
  
      const searchData = async () => {
        if (searchQuery.value.trim() === '') {
          searchedPeople.value = [];
          return;
        }
        try {
          const response = await axios.get(`https://swapi.dev/api/people/?search=${searchQuery.value}`);
          searchedPeople.value = response.data.results;
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
        }
      };
  
      const goBackToHomePage = () => {
        router.push('/');
      };
  
      return {
        searchQuery,
        searchedPeople,
        searchData,
        goBackToHomePage,
      };
    },
  });
  </script>
  
  <style scoped>
  .search-page {
    padding: 35px;
    background-color: #ffffff;
    font-family: 'Outfit', sans-serif;
  }
  
  h1 {
    color: #111820;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  
  input {
    padding: 10px;
    font-size: 1rem;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-family: 'Outfit', sans-serif;
  }
  
  button:hover {
    background-color: #369a6d;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    background-color: #f3f0f0;
    margin: 10px 0;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  li p {
    margin: 5px 0;
  }
  
  strong {
    color: #ff0000;
  }
  
  div.v-else {
    text-align: center;
    font-size: 1.2rem;
    color: #888;
  }
  </style>
  