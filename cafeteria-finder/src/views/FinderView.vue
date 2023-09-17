<script setup lang="ts">
import { useMapStore } from '@/stores/map';
import { useFavoritesStore } from '@/stores/favorites'
import MapboxMap from '@/components/MapboxMap.vue'
import { storeToRefs } from 'pinia';
import { toValue } from '@vueuse/core'
import { ref } from 'vue';

const mapStore = useMapStore()
const favoritesStore = useFavoritesStore()

const { selectedCoffeeShop } = storeToRefs(mapStore)

const isShowingFavoriteAlert = ref(false)

const coffeeShopRating = ref(0)

const onModelChange = (hasChanged: boolean) => {
    if (!hasChanged) {
        coffeeShopRating.value = 0
        mapStore.setSelectedCoffeeShop(null)
    }
}

const onChangeRating = async (newRating: number | string) => {
    await mapStore.updateCoffeeShopRating(toValue(mapStore.selectedCoffeeShop)!.id, Number(newRating))
}

const onHandleFavorite = () => {
    const currentCoffeeShop = toValue(mapStore.selectedCoffeeShop)
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
                    <v-snackbar v-model="isShowingFavoriteAlert" timeout="2000" color="#00E676" style="z-index: 99999;">
                        <span style="color: #FFF">Cafeteria adicionada aos Favoritos com sucesso.</span>
                        <template v-slot:actions>
                            <v-btn color="white" variant="text" @click="isShowingFavoriteAlert = false">
                                Fechar
                            </v-btn>
                        </template>
                    </v-snackbar>
                </v-col>
            </v-row>
            <v-navigation-drawer v-model="selectedCoffeeShop" location="bottom" :temporary="true"
                @update:model-value="onModelChange">
                <v-container>
                    <v-row no-gutters>
                        <v-col cols="11">
                            <span class="text-h5" style="color: #F08080">{{ selectedCoffeeShop?.properties.name }}</span>
                        </v-col>
                        <v-col cols="1">
                            <v-btn density="compact" icon="mdi-heart" @click="onHandleFavorite" style="color: #F4978E;" />
                        </v-col>
                        <v-col cols="12" style="display: flex; align-items: center;">
                            <v-icon color="#FFDAB9">mdi-clock</v-icon>
                            <span class="text-body-1 font-weight-bold ml-1">
                                {{ Math.round(selectedCoffeeShop?.timeToArrive! / 60) }}
                                minutos para chegar</span>
                        </v-col>
                    </v-row>
                    <v-row no-gutters style="padding-top: 12px; padding-bottom: 12px;">
                        <v-col cols="12">
                            <v-divider />
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12">
                            <span class="text-caption">Endereço:&nbsp;</span>
                            <span class="text-caption font-weight-bold" style="color: #F08080;">{{
                                selectedCoffeeShop?.properties.address }}</span>
                        </v-col>
                        <v-col cols="12">
                            <span class="text-caption">Telefone:&nbsp;</span>
                            <span class="text-caption font-weight-bold" style="color: #F08080;">{{
                                selectedCoffeeShop?.properties.phone }}</span>
                        </v-col>
                        <v-col cols="12">
                            <span class="text-caption">Horário:&nbsp;</span>
                            <span class="text-caption font-weight-bold" style="color: #F08080;">{{
                                selectedCoffeeShop?.properties.shift }}</span>
                        </v-col>
                    </v-row>
                    <v-row no-gutters style="padding-top: 12px; padding-bottom: 12px;">
                        <v-col cols="12">
                            <v-divider />
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12">
                            <span class="text-subtitle-1 font-weight-bold" style="color: #F08080;">Ofertas Especiais</span>
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
                                                <v-card-title class="pb-0 pt-0 text-body-1" style="color: #F08080;">Oferta
                                                    1</v-card-title>
                                                <v-card-subtitle class="text-body-2" style="color: #F4978E;">R$
                                                    10</v-card-subtitle>
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
                                                <v-card-title class="pb-0 pt-0 text-body-1" style="color: #F08080;">Oferta
                                                    2</v-card-title>
                                                <v-card-subtitle class="text-body-2" style="color: #F4978E;">R$
                                                    10</v-card-subtitle>
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
                                                <v-card-title class="pb-0 pt-0 text-body-1" style="color: #F08080;">Oferta
                                                    3</v-card-title>
                                                <v-card-subtitle class="text-body-2" style="color: #F4978E;">R$
                                                    10</v-card-subtitle>
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
                                                <v-card-title class="pb-0 pt-0 text-body-1" style="color: #F08080;">Oferta
                                                    4</v-card-title>
                                                <v-card-subtitle class="text-body-2" style="color: #F4978E;">R$
                                                    10</v-card-subtitle>
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
                                                <v-card-title class="pb-0 pt-0 text-body-1" style="color: #F08080;">Oferta
                                                    5</v-card-title>
                                                <v-card-subtitle class="text-body-2" style="color: #F4978E;">R$
                                                    10</v-card-subtitle>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-slide-group-item>
                            </v-slide-group>
                        </v-col>
                    </v-row>
                    <v-row no-gutters style="padding-top: 12px; padding-bottom: 12px;">
                        <v-col cols="12">
                            <v-divider />
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12">
                            <span class="text-subtitle-1 font-weight-bold" style="color: #F08080;">Avaliações</span>
                        </v-col>
                        <v-col cols="12">
                            <v-rating v-model="coffeeShopRating" @update:model-value="onChangeRating" density="comfortable"
                                color="#F4978E" />
                        </v-col>
                    </v-row>
                </v-container>
            </v-navigation-drawer>
        </v-container>
    </v-main>
</template>

<style scoped>
.v-navigation-drawer__scrim {
    opacity: 0;
}
</style>