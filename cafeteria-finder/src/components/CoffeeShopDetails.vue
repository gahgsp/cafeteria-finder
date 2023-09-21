<script setup lang="ts">
import { useMapStore } from '@/stores/map'
import { useRatingStore } from '@/stores/rating'
import type { CoffeeShop } from '@/types'
import { toValue, watchDeep } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const { isOpen, selectedCoffeeShop, initialRating } = defineProps<{
  isOpen: boolean
  selectedCoffeeShop: CoffeeShop | null
  initialRating: number
}>()

const emits = defineEmits(['onModelChange', 'onFavorite', 'onChangeRating'])

const mapStore = useMapStore()
const { isCalculatingRoute } = storeToRefs(mapStore)

const ratingStore = useRatingStore()
const { isLoadingRating } = storeToRefs(ratingStore)

const currentIsOpen = ref(isOpen)
const currentRating = ref(initialRating)
const currentIsLoadingRoute = ref(isCalculatingRoute)
const currentIsLoadingRating = ref(isLoadingRating)

watch(isCalculatingRoute, (newValue) => {
  currentIsLoadingRoute.value = newValue
})

watch(isLoadingRating, (newValue) => {
  currentIsLoadingRating.value = newValue
})

const onHandleModelChange = (newModel: boolean) => {
  emits('onModelChange', newModel)
}

const onHandleFavorite = () => {
  emits('onFavorite')
}

const onHandleChangeRating = (newRating: number | string) => {
  emits('onChangeRating', Number(newRating))
}
</script>

<template>
  <v-navigation-drawer
    v-model="currentIsOpen"
    location="bottom"
    @update:model-value="onHandleModelChange"
  >
    <v-container>
      <v-container v-if="currentIsLoadingRoute || currentIsLoadingRating">
        <v-row no-gutters>
          <v-col cols="12" class="center-container">
            <v-progress-circular :size="100" indeterminate class="primary" />
          </v-col>
        </v-row>
      </v-container>
      <v-container v-else>
        <v-row no-gutters>
          <v-col cols="11">
            <span class="text-h5 primary">{{ selectedCoffeeShop?.properties.name }}</span>
          </v-col>
          <v-col cols="1">
            <v-btn density="compact" icon="mdi-heart" @click="onHandleFavorite" class="secondary" />
          </v-col>
          <v-col cols="12" class="timer-container">
            <v-icon color="#FFDAB9">mdi-clock</v-icon>
            <span class="text-body-1 font-weight-bold ml-1">
              {{ Math.round(selectedCoffeeShop?.timeToArrive! / 60) }}
              minutos para chegar</span
            >
          </v-col>
        </v-row>
        <v-row no-gutters class="divider-container">
          <v-col cols="12">
            <v-divider />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <span class="text-caption">Endereço:&nbsp;</span>
            <span class="text-caption font-weight-bold primary">{{
              selectedCoffeeShop?.properties.address
            }}</span>
          </v-col>
          <v-col cols="12">
            <span class="text-caption">Telefone:&nbsp;</span>
            <span class="text-caption font-weight-bold primary">{{
              selectedCoffeeShop?.properties.phone
            }}</span>
          </v-col>
          <v-col cols="12">
            <span class="text-caption">Horário:&nbsp;</span>
            <span class="text-caption font-weight-bold primary">{{
              selectedCoffeeShop?.properties.shift
            }}</span>
          </v-col>
        </v-row>
        <v-row no-gutters class="divider-container">
          <v-col cols="12">
            <v-divider />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <span class="text-subtitle-1 font-weight-bold primary">Ofertas Especiais</span>
          </v-col>
          <v-col cols="12">
            <v-slide-group>
              <v-slide-group-item
                v-for="sale in selectedCoffeeShop?.properties.sales"
                :key="sale.id"
              >
                <v-card width="100" height="200" class="ma-4">
                  <v-row align="center">
                    <v-col class="shrink">
                      <v-img :src="sale.image ?? 'http://placehold.it/100x120'" max-width="100" />
                    </v-col>
                    <v-col class="pt-0" align="center">
                      <v-card-title class="pb-0 pt-0 text-body-1 primary">{{
                        sale.title
                      }}</v-card-title>
                      <v-card-subtitle class="text-body-2 secondary"
                        >R$ {{ sale.price }}</v-card-subtitle
                      >
                    </v-col>
                  </v-row>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
          </v-col>
        </v-row>
        <v-row no-gutters class="divider-container">
          <v-col cols="12">
            <v-divider />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <span class="text-subtitle-1 font-weight-bold primary">Avaliações</span>
          </v-col>
          <v-col cols="12">
            <v-rating
              v-model="currentRating"
              @update:model-value="onHandleChangeRating"
              density="comfortable"
              class="secondary"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-navigation-drawer>
</template>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.timer-container {
  display: flex;
  align-items: center;
}

.divider-container {
  padding-top: 12px;
  padding-bottom: 12px;
}

.primary {
  color: #f08080;
}

.secondary {
  color: #f4978e;
}
.v-navigation-drawer__scrim {
  display: none;
}
</style>
