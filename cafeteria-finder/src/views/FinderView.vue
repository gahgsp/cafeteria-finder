<script setup lang="ts">
import { useMapStore } from '@/stores/map'
import { useFavoritesStore } from '@/stores/favorites'
import MapboxMap from '@/components/MapboxMap.vue'
import CoffeeShopDetails from '@/components/CoffeeShopDetails.vue'
import { storeToRefs } from 'pinia'
import { toValue, watchDeep } from '@vueuse/core'
import { ref } from 'vue'

const mapStore = useMapStore()
const favoritesStore = useFavoritesStore()

const { selectedCoffeeShop } = storeToRefs(mapStore)

const isShowingCoffeeShopDetails = ref(false)
const isShowingFavoriteAlert = ref(false)

const coffeeShopRating = ref(0)

watchDeep(selectedCoffeeShop, () => {
  isShowingCoffeeShopDetails.value = !!toValue(selectedCoffeeShop)
})

const onModelChange = (hasChanged: boolean) => {
  if (!hasChanged) {
    coffeeShopRating.value = 0
    mapStore.setSelectedCoffeeShop(null)
  }
}

const onChangeRating = async (newRating: number | string) => {
  await mapStore.updateCoffeeShopRating(toValue(selectedCoffeeShop)!.id, Number(newRating))
}

const onFavorite = () => {
  const currentCoffeeShop = toValue(selectedCoffeeShop)
  if (!currentCoffeeShop) {
    return
  }
  favoritesStore.saveFavorite(currentCoffeeShop.id)
  isShowingFavoriteAlert.value = true
}
</script>

<template>
  <v-main>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" md="12">
          <MapboxMap />
          <v-snackbar
            v-model="isShowingFavoriteAlert"
            timeout="2000"
            color="#00E676"
            style="z-index: 99999"
          >
            <span style="color: #fff">Cafeteria adicionada aos Favoritos com sucesso.</span>
            <template v-slot:actions>
              <v-btn color="white" variant="text" @click="isShowingFavoriteAlert = false">
                Fechar
              </v-btn>
            </template>
          </v-snackbar>
        </v-col>
      </v-row>
      <CoffeeShopDetails
        v-if="isShowingCoffeeShopDetails"
        :is-open="isShowingCoffeeShopDetails"
        :selected-coffee-shop="selectedCoffeeShop"
        :initial-rating="coffeeShopRating"
        @on-model-change="onModelChange"
        @on-favorite="onFavorite"
        @on-change-rating="onChangeRating"
      />
    </v-container>
  </v-main>
</template>

<style scoped>
.v-navigation-drawer__scrim {
  opacity: 0;
}
</style>
