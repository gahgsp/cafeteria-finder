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
    <div>
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
                        <MapboxMap style="height: 100vh; width: 83vw;"
                            access-token="pk.eyJ1IjoiYWdlbmNlc3R1ZGlvbWV0YSIsImEiOiJjanh5ZW81aHEwOHV3M2lwZzhhNW1vdXl5In0.3hbV2QKVzZWf511JK9xCug"
                            map-style="mapbox://styles/mapbox/streets-v11" :center="center" :zoom="15"
                            @mb-click="handleOnClick">
                            <MapboxGeocoder
                                access-token="pk.eyJ1IjoiYWdlbmNlc3R1ZGlvbWV0YSIsImEiOiJjanh5ZW81aHEwOHV3M2lwZzhhNW1vdXl5In0.3hbV2QKVzZWf511JK9xCug" />
                        </MapboxMap>
                    </v-col>
                </v-row>
            </v-main>
            <v-dialog v-model="isOpen" :fullscreen="false">
                <v-card>
                    <v-card-text>
                        <span>Apresentar aqui as informações da Cafeteria selecionada.</span>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" block @click="isOpen = false">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-app>

    </div>
</template>

<script setup lang="ts">
import { MapboxMap, MapboxGeocoder } from '@studiometa/vue-mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ref } from 'vue';

const center = ref([-49.07277033480926, -26.915345661590365])

const isOpen = ref(false)

const handleOnClick = async (position: any) => {
    console.log(position.lngLat)
    isOpen.value = true
    // Usar a API abaixo pra pegar a rota entre dois points e a distancia / tempo.
    // Pra calcular, ver comentario no post https://stackoverflow.com/questions/61385266/getting-total-duration-and-distance-on-mapbox-javascript
    // const response = await fetch('https://api.mapbox.com/directions/v5/mapbox/driving/-8.61767353533753,42.102184359031504;-8.495246688170312,41.44289308091726?steps=true&geometries=geojson&access_token=pk.eyJ1IjoiYWdlbmNlc3R1ZGlvbWV0YSIsImEiOiJjanh5ZW81aHEwOHV3M2lwZzhhNW1vdXl5In0.3hbV2QKVzZWf511JK9xCug')
    // console.log(response.json())
}
</script>

<style scoped>
.v-dialog {
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>