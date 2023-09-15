<template>
    <div id="map" class="map-container"></div>
</template>
  
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapStore } from '@/stores/map'

const mapStore = useMapStore()

const coffeeShops = ref<any>(null)

let map: mapboxgl.Map | null = null;

function createRGBPoint({ r, g, b }: { r: number; g: number; b: number }) {
    const diameter = 50;
    const radius = diameter / 2;
    const centerX = radius;
    const centerY = radius;
    const pixelData = new Uint8Array(diameter * diameter * 4); // Cada pixel tem um componente RGBA.

    for (let y = 0; y < diameter; y++) {
        for (let x = 0; x < diameter; x++) {
            const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

            if (distance <= radius) {
                const index = (y * diameter + x) * 4;
                pixelData[index] = r; // Vermelho
                pixelData[index + 1] = g; // Verde
                pixelData[index + 2] = b; // Azul
                pixelData[index + 3] = 255; // Alfa (255 = totalmente opaco)
            }
        }
    }

    return { width: diameter, height: diameter, data: pixelData };
}

function createMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWdlbmNlc3R1ZGlvbWV0YSIsImEiOiJjanh5ZW81aHEwOHV3M2lwZzhhNW1vdXl5In0.3hbV2QKVzZWf511JK9xCug';

    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-49.07277033480926, -26.915345661590365], // Blumenau
        zoom: 15,
    });

    map.on('load', () => {

        // Adiciona ao mapa a definição de uma imagem. No caso, um ponto RGB 2D.
        map.addImage('#ADC178', createRGBPoint({ r: 173, g: 193, b: 120 }))

        // Definição da fonte de dados.
        map.addSource('source', {
            type: 'geojson',
            data: coffeeShops.value,
            cluster: true,
            clusterMaxZoom: 15,
            clusterRadius: 20,
        })

        // Configuraçōes do marcador de "clusters".
        map.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'source',
            filter: ['has', 'point_count'],
            paint: {
                'circle-color': '#d3cdc0',
                'circle-stroke-color': '#a59a83',
                'circle-stroke-width': 1,
                'circle-radius': 20,
            },
        })

        // Configuraçōes do texto exibindo a quantidade de itens de um "cluster".
        map.addLayer({
            id: 'clusters-count',
            type: 'symbol',
            source: 'source',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-size': 12,
                'text-allow-overlap': true,
            },
            paint: {
                'text-color': 'white',
            },
        })

        // Configuraçōes de um marcador individual.
        map.addLayer({
            id: 'unclustered-point',
            type: 'symbol',
            source: 'source',
            layout: {
                'icon-image': ['get', 'color'],
                'icon-size': 0.5,
                'text-field': ['get', 'name'],
                'text-size': 12,
                'text-offset': [0, 1],
                'text-anchor': 'top',
                'icon-allow-overlap': true,
            },
            paint: {
                'text-color': '#7E6C56',
                'text-halo-color': '#FFF',
                'text-halo-width': 1,
                'text-halo-blur': 0,
            },
        })

        // Adiciona ao mapa a barra de pesquisa de cidades.
        map.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                countries: 'BR', // Limitando os resultados da pesquisa apenas para o Brasil.
                zoom: 15,
                placeholder: 'Pesquisar'
            })
        )
    })

    map.on('click', 'unclustered-point', (e: any) => {
        if (!e.features) {
            return
        }
        // Usar a API abaixo pra pegar a rota entre dois points e a distancia / tempo.
        // Pra calcular, ver comentario no post https://stackoverflow.com/questions/61385266/getting-total-duration-and-distance-on-mapbox-javascript
        // const response = await fetch('https://api.mapbox.com/directions/v5/mapbox/driving/-8.61767353533753,42.102184359031504;-8.495246688170312,41.44289308091726?steps=true&geometries=geojson&access_token=pk.eyJ1IjoiYWdlbmNlc3R1ZGlvbWV0YSIsImEiOiJjanh5ZW81aHEwOHV3M2lwZzhhNW1vdXl5In0.3hbV2QKVzZWf511JK9xCug')
        // console.log(response.json())
        mapStore.setSelectedCafeteria(e.features[0])
    })
}

onMounted(async () => {
    const { data } = await mapStore.loadCafeterias()

    coffeeShops.value = (JSON.parse(data.value))[0]
    createMap()
});

onBeforeUnmount(() => {
    if (map) {
        map.remove();
    }
});
</script>
  
<style scoped>
.map-container {
    min-width: 100px;
    min-height: 80vh;
}
</style>
  