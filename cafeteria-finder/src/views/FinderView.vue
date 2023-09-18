<script setup lang="ts">
import CoffeeShopDetails from '@/components/CoffeeShopDetails.vue'
import MapboxMap from '@/components/MapboxMap.vue'
import { useFavoritesStore } from '@/stores/favorites'
import { useMapStore } from '@/stores/map'
import { useRatingStore } from '@/stores/rating'
import { toValue, watchDeep } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const mapStore = useMapStore()
const favoritesStore = useFavoritesStore()
const ratingStore = useRatingStore()

const { selectedCoffeeShop } = storeToRefs(mapStore)

const isShowingCoffeeShopDetails = ref(!!toValue(selectedCoffeeShop))
const isShowingFavoriteAlert = ref(false)

const coffeeShopRating = ref(0)

watchDeep(selectedCoffeeShop, async () => {
  if (toValue(selectedCoffeeShop)) {
    const currentCoffeeShopRating = await ratingStore.loadCoffeeShopRating(
      selectedCoffeeShop.value!.id
    )
    coffeeShopRating.value = currentCoffeeShopRating?.rating ?? 0
  }
  // Reseta o estado para que o componente de detalhes seja destruído do documento HTML.
  isShowingCoffeeShopDetails.value = false

  // Um "timeout" de 0 segundos apenas joga a execução para o fim da fila,
  // desta forma temos o componente destruído por alguns milissegundos
  // e então ao surgir novamente, será instanciado com os valores atualizados.
  setTimeout(() => {
    isShowingCoffeeShopDetails.value = !!toValue(selectedCoffeeShop)
  }, 0)
})

const onModelChange = (hasChanged: boolean) => {
  if (!hasChanged) {
    coffeeShopRating.value = 0
    mapStore.setSelectedCoffeeShop(null)
  }
}

const onChangeRating = async (newRating: number | string) => {
  await ratingStore.updateCoffeeShopRating(toValue(selectedCoffeeShop)!.id, Number(newRating))
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
