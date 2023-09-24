<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'
import { useMapStore } from '@/stores/map'
import type { CoffeeShop } from '@/types'
import { useRouter } from 'vue-router'

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
          <v-col cols="12" style="padding-bottom: 0">
            <div><span class="text-h5 primary">Meus Favoritos</span></div>
            <v-divider style="margin-top: 12px; margin-bottom: 12px" />
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
            <v-list lines="two" density="compact" v-if="favoriteCoffeeShops.length">
              <v-list-item
                v-for="coffeeShop in favoriteCoffeeShops"
                :key="coffeeShop.id"
                :title="coffeeShop.properties.name"
                :subtitle="coffeeShop.properties.address"
                class="favorite-item"
              >
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-1">
                    <v-icon color="white">mdi-coffee</v-icon>
                  </v-avatar>
                </template>
                <template v-slot:append>
                  <v-btn
                    color="grey-lighten-1"
                    icon="mdi-navigation-variant"
                    variant="text"
                    @click="onNavigateToFavorite(coffeeShop)"
                  />
                </template>
              </v-list-item>
            </v-list>
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
</style>
