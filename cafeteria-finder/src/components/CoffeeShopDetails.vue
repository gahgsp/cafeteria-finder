<script setup lang="ts">
import { useMapStore } from '@/stores/map'
import type { CoffeeShop } from '@/types'
import { toValue, watchDeep } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const { isOpen, selectedCoffeeShop, initialRating } = defineProps<{
  isOpen: boolean
  selectedCoffeeShop: CoffeeShop | null
  initialRating: number
}>()

const emits = defineEmits(['onModelChange', 'onFavorite', 'onChangeRating'])

const mapStore = useMapStore()
const { isCalculatingRoute } = storeToRefs(mapStore)

const currentIsOpen = ref(isOpen)
const currentRating = ref(initialRating)
const currentIsLoading = ref(isCalculatingRoute)

watchDeep(isCalculatingRoute, () => {
  currentIsLoading.value = !!toValue(isCalculatingRoute)
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
    :temporary="true"
    @update:model-value="onHandleModelChange"
  >
    <v-container>
      <v-container v-if="currentIsLoading">
        <v-row no-gutters>
          <v-col cols="12" style="display: flex; justify-content: center; align-items: center">
            <v-progress-circular :size="100" color="#f08080" indeterminate />
          </v-col>
        </v-row>
      </v-container>
      <v-container v-else>
        <v-row no-gutters>
          <v-col cols="11">
            <span class="text-h5" style="color: #f08080">{{
              selectedCoffeeShop?.properties.name
            }}</span>
          </v-col>
          <v-col cols="1">
            <v-btn
              density="compact"
              icon="mdi-heart"
              @click="onHandleFavorite"
              style="color: #f4978e"
            />
          </v-col>
          <v-col cols="12" style="display: flex; align-items: center">
            <v-icon color="#FFDAB9">mdi-clock</v-icon>
            <span class="text-body-1 font-weight-bold ml-1">
              {{ Math.round(selectedCoffeeShop?.timeToArrive! / 60) }}
              minutos para chegar</span
            >
          </v-col>
        </v-row>
        <v-row no-gutters style="padding-top: 12px; padding-bottom: 12px">
          <v-col cols="12">
            <v-divider />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <span class="text-caption">Endereço:&nbsp;</span>
            <span class="text-caption font-weight-bold" style="color: #f08080">{{
              selectedCoffeeShop?.properties.address
            }}</span>
          </v-col>
          <v-col cols="12">
            <span class="text-caption">Telefone:&nbsp;</span>
            <span class="text-caption font-weight-bold" style="color: #f08080">{{
              selectedCoffeeShop?.properties.phone
            }}</span>
          </v-col>
          <v-col cols="12">
            <span class="text-caption">Horário:&nbsp;</span>
            <span class="text-caption font-weight-bold" style="color: #f08080">{{
              selectedCoffeeShop?.properties.shift
            }}</span>
          </v-col>
        </v-row>
        <v-row no-gutters style="padding-top: 12px; padding-bottom: 12px">
          <v-col cols="12">
            <v-divider />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <span class="text-subtitle-1 font-weight-bold" style="color: #f08080"
              >Ofertas Especiais</span
            >
          </v-col>
          <v-col cols="12">
            <v-slide-group>
              <v-slide-group-item>
                <v-card width="100" height="200" class="ma-4">
                  <v-row align="center">
                    <v-col class="shrink">
                      <v-img src="//placehold.it/100x120" max-width="100"></v-img>
                    </v-col>
                    <v-col class="pt-0" align="center">
                      <v-card-title class="pb-0 pt-0 text-body-1" style="color: #f08080"
                        >Oferta 1</v-card-title
                      >
                      <v-card-subtitle class="text-body-2" style="color: #f4978e"
                        >R$ 10</v-card-subtitle
                      >
                    </v-col>
                  </v-row>
                </v-card>
              </v-slide-group-item>
              <v-slide-group-item>
                <v-card width="100" height="200" class="ma-4">
                  <v-row align="center">
                    <v-col class="shrink">
                      <v-img src="//placehold.it/100x120" max-width="100"></v-img>
                    </v-col>
                    <v-col class="pt-0" align="center">
                      <v-card-title class="pb-0 pt-0 text-body-1" style="color: #f08080"
                        >Oferta 2</v-card-title
                      >
                      <v-card-subtitle class="text-body-2" style="color: #f4978e"
                        >R$ 10</v-card-subtitle
                      >
                    </v-col>
                  </v-row>
                </v-card>
              </v-slide-group-item>
              <v-slide-group-item>
                <v-card width="100" height="200" class="ma-4">
                  <v-row align="center">
                    <v-col class="shrink">
                      <v-img src="//placehold.it/100x120" max-width="100"></v-img>
                    </v-col>
                    <v-col class="pt-0" align="center">
                      <v-card-title class="pb-0 pt-0 text-body-1" style="color: #f08080"
                        >Oferta 3</v-card-title
                      >
                      <v-card-subtitle class="text-body-2" style="color: #f4978e"
                        >R$ 10</v-card-subtitle
                      >
                    </v-col>
                  </v-row>
                </v-card>
              </v-slide-group-item>
              <v-slide-group-item>
                <v-card width="100" height="200" class="ma-4">
                  <v-row align="center">
                    <v-col class="shrink">
                      <v-img src="//placehold.it/100x120" max-width="100"></v-img>
                    </v-col>
                    <v-col class="pt-0" align="center">
                      <v-card-title class="pb-0 pt-0 text-body-1" style="color: #f08080"
                        >Oferta 4</v-card-title
                      >
                      <v-card-subtitle class="text-body-2" style="color: #f4978e"
                        >R$ 10</v-card-subtitle
                      >
                    </v-col>
                  </v-row>
                </v-card>
              </v-slide-group-item>
              <v-slide-group-item>
                <v-card width="100" height="200" class="ma-4">
                  <v-row align="center">
                    <v-col class="shrink">
                      <v-img src="//placehold.it/100x120" max-width="100"></v-img>
                    </v-col>
                    <v-col class="pt-0" align="center">
                      <v-card-title class="pb-0 pt-0 text-body-1" style="color: #f08080"
                        >Oferta 5</v-card-title
                      >
                      <v-card-subtitle class="text-body-2" style="color: #f4978e"
                        >R$ 10</v-card-subtitle
                      >
                    </v-col>
                  </v-row>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
          </v-col>
        </v-row>
        <v-row no-gutters style="padding-top: 12px; padding-bottom: 12px">
          <v-col cols="12">
            <v-divider />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <span class="text-subtitle-1 font-weight-bold" style="color: #f08080">Avaliações</span>
          </v-col>
          <v-col cols="12">
            <v-rating
              v-model="currentRating"
              @update:model-value="onHandleChangeRating"
              density="comfortable"
              color="#F4978E"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-navigation-drawer>
</template>

<style scoped>
.v-navigation-drawer__scrim {
  opacity: 0;
}
</style>
