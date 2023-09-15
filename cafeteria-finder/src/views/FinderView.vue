<template>
    <v-main>
        <v-container>
            <v-row no-gutters>
                <v-col cols="12" md="12">
                    <MapboxMap />
                </v-col>
            </v-row>
            <v-navigation-drawer v-model="selectedCafeteria" location="bottom" :temporary="true"
                @update:model-value="onModelChange">
                <v-container>
                    <v-row no-gutters>
                        <v-col cols="11">
                            <span class="text-h5">{{ selectedCafeteria ? selectedCafeteria['properties']['name'] : ''
                            }}</span>
                        </v-col>
                        <v-col cols="1">
                            <v-btn density="compact" icon="mdi-heart" style="color: #F4978E;"></v-btn>
                        </v-col>
                        <v-col cols="12" style="display: flex; align-items: center;">
                            <v-icon>mdi-clock</v-icon>
                            <span class="text-body-2 font-weight-bold ml-1">15 minutos para chegar</span>
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
                            <span class="text-caption font-weight-bold">{{ selectedCafeteria ?
                                selectedCafeteria['properties']['address']
                                : '' }}</span>
                        </v-col>
                        <v-col cols="12">
                            <span class="text-caption">Telefone:&nbsp;</span>
                            <span class="text-caption font-weight-bold">{{ selectedCafeteria ?
                                selectedCafeteria['properties']['phone'] :
                                '' }}</span>
                        </v-col>
                        <v-col cols="12">
                            <span class="text-caption">Horário:&nbsp;</span>
                            <span class="text-caption font-weight-bold">{{ selectedCafeteria ?
                                selectedCafeteria['properties']['shift'] :
                                '' }}</span>
                        </v-col>
                    </v-row>
                    <v-row no-gutters style="padding-top: 12px; padding-bottom: 12px;">
                        <v-col cols="12">
                            <v-divider />
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12">
                            <span class="text-subtitle-1 font-weight-bold">Ofertas Especiais</span>
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
                                                <v-card-title class="pb-0 pt-0 text-body-1">Oferta 1</v-card-title>
                                                <v-card-subtitle class="text-body-2">R$ 10</v-card-subtitle>
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
                                                <v-card-title class="pb-0 pt-0 text-body-1">Oferta 2</v-card-title>
                                                <v-card-subtitle class="text-body-2">R$ 10</v-card-subtitle>
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
                                                <v-card-title class="pb-0 pt-0 text-body-1">Oferta 3</v-card-title>
                                                <v-card-subtitle class="text-body-2">R$ 10</v-card-subtitle>
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
                                                <v-card-title class="pb-0 pt-0 text-body-1">Oferta 4</v-card-title>
                                                <v-card-subtitle class="text-body-2">R$ 10</v-card-subtitle>
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
                                                <v-card-title class="pb-0 pt-0 text-body-1">Oferta 5</v-card-title>
                                                <v-card-subtitle class="text-body-2">R$ 10</v-card-subtitle>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-slide-group-item>
                            </v-slide-group>
                        </v-col>
                    </v-row>
                </v-container>
            </v-navigation-drawer>
        </v-container>
    </v-main>
</template>

<script setup lang="ts">
import { useMapStore } from '@/stores/map';
import MapboxMap from '@/components/MapboxMap.vue'
import { storeToRefs } from 'pinia';

const mapStore = useMapStore()

const { selectedCafeteria } = storeToRefs(mapStore)

const onModelChange = (hasChanged: boolean) => {
    if (!hasChanged) {
        mapStore.setSelectedCafeteria(null)
    }
}
</script>

<style scoped>
.v-navigation-drawer__scrim {
    opacity: 0;
}
</style>