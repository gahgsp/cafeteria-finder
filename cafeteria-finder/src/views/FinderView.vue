<!-- <script setup lang="ts">
import { ref } from "vue";
import { MapboxMap } from '@studiometa/vue-mapbox-gl';

const mapCenter = ref([0, 0]);
</script>

<template>
    <main style="display: flex; justify-content: center; align-items: center;">
        <MapboxMap style="height: 100vh; width: 100vw"
            access-token="pk.eyJ1IjoiYWdlbmNlc3R1ZGlvbWV0YSIsImEiOiJjanh5ZW81aHEwOHV3M2lwZzhhNW1vdXl5In0.3hbV2QKVzZWf511JK9xCug"
            map-style="mapbox://styles/mapbox/streets-v11" :center="mapCenter" :zoom="" />
    </main>
</template> -->

<template>
    <v-app>
        <v-main>
            <v-row>
                <v-col cols="2" style="max-width: 300px;">
                    <aside>
                        <v-container>
                            <v-row style="display: flex; justify-content: center; align-items: center;">
                                <v-col cols="4">
                                    <v-avatar color="info" size="x-large">
                                        64
                                    </v-avatar>
                                </v-col>
                                <v-col cols>
                                    <span class="text-h6">User Name</span>
                                </v-col>
                            </v-row>
                            <v-divider style="margin: 1em 0;"></v-divider>
                            <v-row>
                                <v-col cols="4">
                                    <span> <v-icon>mdi-map</v-icon></span>
                                </v-col>
                                <v-col cols="8">
                                    <span>Search</span>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4">
                                    <span> <v-icon>mdi-heart</v-icon></span>
                                </v-col>
                                <v-col cols="8">
                                    <span>Favorites</span>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4">
                                    <span> <v-icon>mdi-cog</v-icon></span>
                                </v-col>
                                <v-col cols="8">
                                    <span>Settings</span>
                                </v-col>
                            </v-row>
                            <v-divider style="margin: 1em 0;"></v-divider>
                            <v-row>
                                <v-col cols="4">
                                    <span> <v-icon>mdi-home</v-icon></span>
                                </v-col>
                                <v-col cols="8">
                                    <span>Log Out</span>
                                </v-col>
                            </v-row>
                        </v-container>
                    </aside>
                </v-col>
                <v-col cols="8">
                    <!-- Map -->
                    <MapboxMap />
                    <v-navigation-drawer v-model="selectedCafeteria" location="bottom" temporary
                        @update:model-value="onModelChange">
                        <div>{{ JSON.stringify(selectedCafeteria) }}</div>
                    </v-navigation-drawer>

                </v-col>
            </v-row>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { useMapStore } from '@/stores/map';
import MapboxMap from '@/components/MapboxMap.vue'
import { storeToRefs } from 'pinia';

const store = useMapStore()
const { selectedCafeteria } = storeToRefs(store)

const onModelChange = (hasChanged: boolean) => {
    if (!hasChanged) {
        store.setSelectedCafeteria(null)
    }
}

</script>