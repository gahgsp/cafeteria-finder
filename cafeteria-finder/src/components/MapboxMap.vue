<template>
    <div id="map" class="map-container"></div>
</template>
  
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';

let map: mapboxgl.Map | null = null;

function createMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWdlbmNlc3R1ZGlvbWV0YSIsImEiOiJjanh5ZW81aHEwOHV3M2lwZzhhNW1vdXl5In0.3hbV2QKVzZWf511JK9xCug'; // Replace with your Mapbox Access Token

    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-49.07277033480926, -26.915345661590365], // Blumenau
        zoom: 15,
    });

    map.on('load', () => {
        // Definição da fonte de dados.
        map.addSource('source', {
            type: 'geojson',
            data: '../../data/map.json',
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
                'circle-radius': 10,
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
            id: "unclustered-point",
            type: "circle",
            source: "source",
            filter: ["!", ["has", "point_count"]],
            paint: {
                "circle-color": "#51bbd6",
                "circle-radius": 8,
                "circle-stroke-width": 1,
                "circle-stroke-color": "#fff"
            }
        })

        // TODO: Usar de exemplo, as propriedades após o 'get' devem estar no .json.
        //     map.addLayer({
        //     id: 'layer',
        //     type: 'symbol',
        //     source: 'source',
        //     layout: {
        //       'icon-image': ['get', 'marker-color'],
        //       'icon-size': 0.25,
        //       'text-field': ['get', 'shortname'],
        //       'text-size': 12,
        //       'text-offset': [0, 0.5],
        //       'text-anchor': 'top',
        //       'icon-allow-overlap': true,
        //     },
        //     paint: {
        //       'text-color': '#7e6c56',
        //       'text-halo-color': '#fff',
        //       'text-halo-width': 1,
        //       'text-halo-blur': 0,
        //     },
        //   })

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

        console.log(e.features[0].geometry.coordinates.slice())
    })

    // const handleOnClick = async (position: any) => {
    //     console.log(position.lngLat)
    //     isOpen.value = true
    //     // Usar a API abaixo pra pegar a rota entre dois points e a distancia / tempo.
    //     // Pra calcular, ver comentario no post https://stackoverflow.com/questions/61385266/getting-total-duration-and-distance-on-mapbox-javascript
    //     // const response = await fetch('https://api.mapbox.com/directions/v5/mapbox/driving/-8.61767353533753,42.102184359031504;-8.495246688170312,41.44289308091726?steps=true&geometries=geojson&access_token=pk.eyJ1IjoiYWdlbmNlc3R1ZGlvbWV0YSIsImEiOiJjanh5ZW81aHEwOHV3M2lwZzhhNW1vdXl5In0.3hbV2QKVzZWf511JK9xCug')
    //     // console.log(response.json())
    // }

}

onMounted(() => {
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
    width: 80vw;
    height: 90vh;
}
</style>
  