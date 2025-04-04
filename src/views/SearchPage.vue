<template>
  <div class="search-page">
    <h1>Buscar e Editar Dados</h1>
    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar por nome"
        @input="filterSearch"
      />
    </div>

    <div v-if="searchedData.length">
      <div v-for="(items, category) in categorizedData" :key="category">
        <h2>{{ category }}</h2>
        <div class="cards-container">
          <div v-for="item in items" :key="item.name" class="card">
            <h3 class="item-name">{{ item.name }}</h3>
            <button class="edit-button" @click="openEditModal(item, category)">
              <i class="pi pi-pencil"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Carregando dados...</p>
    </div>

    <button class="align-items-center" @click="goBackToHomePage">Voltar à Exibição</button>

    <div v-if="showEditModal" class="modal-overlay" @click="closeEditModal">
      <div class="modal-content" @click.stop>
        <h2>Editar {{ editingItem?.name }}</h2>
        <input v-model="editingItem.name" type="text" placeholder="Nome" />
        <input v-model="editingItem.image" type="text" placeholder="URL da imagem" />
        <button @click="saveEdit">Salvar</button>
        <button @click="closeEditModal">Cancelar</button>
      </div>
    </div>
  </div>

  

</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SearchPage',
  setup() {
    const searchQuery = ref('');
    const searchedData = ref<any[]>([]);
    const showEditModal = ref(false);
    const editingItem = ref<any>(null);
    const editingCategory = ref<string>('');
    const router = useRouter();

    // Função para buscar dados da API ao carregar a página
    const fetchData = async () => {
      try {
        const [peopleRes, planetsRes, starshipsRes] = await Promise.all([
          axios.get('https://swapi.dev/api/people/'),
          axios.get('https://swapi.dev/api/planets/'),
          axios.get('https://swapi.dev/api/starships/')
        ]);

        searchedData.value = [
          ...peopleRes.data.results.map(person => ({ ...person, category: 'Personagens' })),
          ...planetsRes.data.results.map(planet => ({ ...planet, category: 'Planetas' })),
          ...starshipsRes.data.results.map(starship => ({ ...starship, category: 'Naves' }))
        ];
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    // Computed para categorizar os dados
    const categorizedData = computed(() => {
      return searchedData.value.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
      }, {} as Record<string, any[]>);
    });

    // Filtrar pesquisa conforme o usuário digita
    const filterSearch = () => {
      if (searchQuery.value.trim() === '') {
        fetchData();
        return;
      }
      searchedData.value = searchedData.value.filter(item =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    };

    // Abrir modal de edição
    const openEditModal = (item: any, category: string) => {
      editingItem.value = { ...item };
      editingCategory.value = category;
      showEditModal.value = true;
    };

    // Fechar modal de edição
    const closeEditModal = () => {
      showEditModal.value = false;
      editingItem.value = null;
      editingCategory.value = '';
    };

    // Salvar edição e atualizar os dados
    const saveEdit = async () => {
      try {
        await axios.put(`/api/update/${editingCategory.value.toLowerCase()}`, editingItem.value);
        closeEditModal();
        fetchData();
      } catch (error) {
        console.error('Erro ao salvar edição:', error);
      }
    };

    // Voltar à página inicial
    const goBackToHomePage = () => {
      router.push('/');
    };

    // Carregar os dados automaticamente ao entrar na página
    onMounted(() => {
      fetchData();
    });

    return {
      searchQuery,
      searchedData,
      filterSearch,
      categorizedData,
      goBackToHomePage,
      showEditModal,
      editingItem,
      openEditModal,
      closeEditModal,
      saveEdit
    };
  }
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
  padding: 10px 20px;
  font-size: 1rem;
  margin-bottom: 10px;
  border: 2px solid #ddd;
  border-radius: 22px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #369a6d;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.card {
  background: #021248;
  color: white;
  border-radius: 10px;
  padding: 25px;
  width: 250px;
  height: 150px;
  text-align: center;
  position: relative;
}

.item-name {
  margin-bottom: 10px;
}

.edit-button {
  margin-top: 10px;
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
</style>
