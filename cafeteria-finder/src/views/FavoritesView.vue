<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'
import { useMapStore } from '@/stores/map'
import type { CoffeeShop } from '@/types'
import { useRouter } from 'vue-router'
import FavoritesList from '@/components/FavoritesList.vue'

const router = useRouter()

const favoritesStore = useFavoritesStore()
const mapStore = useMapStore()

const favoriteCoffeeShops = ref<CoffeeShop[]>([])
const isLoadingFavorites = ref<boolean>(false)

onMounted(async () => {
  isLoadingFavorites.value = true
  const { favorites } = await favoritesStore.loadFavorites()
  const { coffeeShops } = await mapStore.loadSpecificCoffeeShops(
    favorites.map((favorite) => favorite.coffeeShopId)
  )
  favoriteCoffeeShops.value = coffeeShops
  isLoadingFavorites.value = false
})

const onNavigateToFavorite = async (coffeeShop: CoffeeShop) => {
  mapStore.setSelectedCoffeeShop(coffeeShop)
  router.push('/finder')
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-col cols="12" class="title-container">
            <div><span class="text-h5 primary">Meus Favoritos</span></div>
            <v-divider class="divider" />
          </v-col>
          <v-col cols="12" v-if="isLoadingFavorites">
            <v-container>
              <div class="text-center">
                <v-progress-circular :size="100" indeterminate class="primary" />
              </div>
            </v-container>
          </v-col>
          <v-col cols="12" class="main" v-else>
            <v-alert color="red" variant="outlined" v-if="!favoriteCoffeeShops.length">
              <template v-slot:title> Nenhum Favorito Encontrado </template>
              Aparentemente você não possui cafeterias favoritas. ):<br />
              Que tal pesquisar por alguma na sua região?
            </v-alert>
            <FavoritesList
              :coffee-shops="favoriteCoffeeShops"
              @on-navigate-to-favorite="onNavigateToFavorite"
              v-if="favoriteCoffeeShops.length"
            />
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.primary {
  color: #f08080;
}

.main {
  padding-top: 0;
}

.favorite-item {
  padding-left: 0px;
}

.divider {
  margin-top: 12px;
  margin-bottom: 12px;
}

.title-container {
  padding-bottom: 0;
}
</style>
