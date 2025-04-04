<template>
    <div class="home-page">
      <div v-if="characters.length">
        <h1 class="category-title">Personagens</h1>
        <button @click="showOnlyFavorites = !showOnlyFavorites" class="filter-button">
          <strong>{{ showOnlyFavorites ? 'Todos' : 'Favoritos' }}</strong>
        </button>
        <div class="cards-container">
          <div
            v-for="character in filteredCharacters"
            :key="character.name"
            class="card"
          >
            <h3>{{ character.name }}</h3>
            <button @click="openModal(character, 'character')">Detalhes</button>
            <button @click="toggleFavorite(character.name)" class="favorite-button">
              {{ isFavorite(character.name) ? '★' : '☆' }}
            </button>
          </div>
        </div>
      </div>
  
      <div v-if="planets.length">
        <h1 class="category-title">Planetas</h1>
        <div class="cards-container">
          <div v-for="planet in planets" :key="planet.name" class="card">
            <h3>{{ planet.name }}</h3>
            <button @click="openModal(planet, 'planet')">Detalhes</button>
          </div>
        </div>
      </div>

      <div v-if="starships.length">
        <h1 class="category-title">Naves</h1>
        <div class="cards-container">
          <div v-for="starship in starships" :key="starship.name" class="card">
            <h3>{{ starship.name }}</h3>
            <button @click="openModal(starship, 'starship')">Detalhes</button>
          </div>
        </div>
      </div>
      
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <template v-if="selectedItemType === 'character'">
            <h2>{{ selectedCharacter?.name }}</h2>
            <p><strong>Gênero:</strong> {{ selectedCharacter?.gender }}</p>
            <p><strong>Altura:</strong> {{ selectedCharacter?.height }} cm</p>
            <p><strong>Filmes:</strong> {{ selectedCharacter?.films.length }}</p>
            <img v-if="selectedCharacter?.image" :src="selectedCharacter.image" alt="Imagem do item" class="modal-image" />
          </template>
  
          <template v-else-if="selectedItemType === 'planet'">
            <h2>{{ selectedCharacter?.name }}</h2>
            <p><strong>Diâmetro:</strong> {{ selectedCharacter?.diameter }} km</p>
          </template>
  
          <template v-else-if="selectedItemType === 'starship'">
            <h2>{{ selectedCharacter?.name }}</h2>
            <p><strong>Capacidade de Passageiros:</strong> {{ selectedCharacter?.passengers }}</p>
          </template>
  
          <button @click="closeModal">Fechar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, reactive, onMounted, computed } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    name: 'HomePage',
    setup() {
      const characters = reactive<any[]>([]);
      const planets = reactive<any[]>([]);
      const starships = reactive<any[]>([]);
      const showModal = ref(false);
      const selectedCharacter = ref<any>(null);
      const selectedItemType = ref<'character' | 'planet' | 'starship' | null>(null);
      const favorites = reactive<Set<string>>(new Set());
      const showOnlyFavorites = ref(false);
  
      const openModal = (item: any, type: 'character' | 'planet' | 'starship') => {
        selectedCharacter.value = item;
        selectedItemType.value = type;
        showModal.value = true;
      };
  
      const closeModal = () => {
        showModal.value = false;
        selectedCharacter.value = null;
        selectedItemType.value = null;
      };
  
      const toggleFavorite = (name: string) => {
        if (favorites.has(name)) {
          favorites.delete(name);
        } else {
          favorites.add(name);
        }
      };
  
      const isFavorite = (name: string) => favorites.has(name);
  
      const filteredCharacters = computed(() => {
        return showOnlyFavorites.value
          ? characters.filter(c => favorites.has(c.name))
          : characters;
      });
  
      onMounted(() => {
        axios.get('https://swapi.dev/api/people/')
          .then(response => {
            const people = response.data.results.map(person => ({
              name: person.name,
              height: person.height,
              gender: person.gender === 'male' ? 'Masculino' :
                      person.gender === 'female' ? 'Feminino' :
                      person.gender === 'n/a' || person.gender === 'none' ? 'Não definido' :
                      'Desconhecido',
              films: person.films,
              image: person.image
            }));
            characters.push(...people);
          })
          .catch(error => console.error('Erro ao buscar personagens:', error));
  
        axios.get('https://swapi.dev/api/planets/')
          .then(response => {
            const planetList = response.data.results.map(planet => ({
              name: planet.name,
              diameter: planet.diameter
            }));
            planets.push(...planetList);
          })
          .catch(error => console.error('Erro ao buscar planetas:', error));
  
        axios.get('https://swapi.dev/api/starships/')
          .then(response => {
            const starshipList = response.data.results.map(starship => ({
              name: starship.name,
              passengers: starship.passengers
            }));
            starships.push(...starshipList);
          })
          .catch(error => console.error('Erro ao buscar naves:', error));
      });
  
      return {
        characters,
        planets,
        starships,
        showModal,
        selectedCharacter,
        selectedItemType,
        openModal,
        closeModal,
        toggleFavorite,
        isFavorite,
        filteredCharacters,
        showOnlyFavorites
      };
    }
  });
  </script>
  
  <style scoped>
  .home-page {
    padding: 35px;
    background-color: #ffffff;
    font-family: 'Outfit', sans-serif;
  }
  
  .category-title {
    color: #021248;
    margin-top: 20px;
    text-align: center;
    padding: 30px;
  }
  
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
  }
  
  .card {
    width: 200px;
    min-height: 150px;
    background: #021248;
    color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 15px;
    text-align: center;
    position: relative;
  }
  
  .card button {
    margin-top: 10px;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .favorite-button {
  position: absolute;
  top: 0.25px;
  right: 5px;
  background: transparent;
  color: #ffcc00;
  font-size: 30px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

  
  .favorite-button:active {
    transform: scale(1.2);
  }
  
  

  .filter-button {
    display: block;
    margin: 10px auto;
    padding: 10px 15px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
    background-color: #42b983;
    color: rgb(255, 255, 255);
    border: none;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  }

  .modal-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}
  
  .modal-content button {
    margin-top: 10px;
    padding: 8px 12px;
    background: #ff0000;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  