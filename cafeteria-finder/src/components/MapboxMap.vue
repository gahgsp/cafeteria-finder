<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useMapStore } from '@/stores/map'
import { toValue, watchDeep } from '@vueuse/core'
import { storeToRefs } from 'pinia'

// TODO: Remover o comentário e usar a API sem mock para a versão final.
// const geolocation = useGeolocation()

const mapStore = useMapStore()
const { selectedCoffeeShop: watchableSelectedCoffeeShop } = storeToRefs(mapStore)

const coffeeShops = ref<any>(null)

let map: mapboxgl.Map | null = null

watchDeep(watchableSelectedCoffeeShop, (obj) => {
  if (!obj) {
    if (map.getLayer('route')) {
      map.removeLayer('route')
    }
    if (map.getSource('route')) {
      map.removeSource('route')
    }
  }
})

function createRGBPoint({ r, g, b }: { r: number; g: number; b: number }) {
  const diameter = 50
  const radius = diameter / 2
  const centerX = radius
  const centerY = radius
  const pixelData = new Uint8Array(diameter * diameter * 4) // Cada pixel tem um componente RGBA.

  for (let y = 0; y < diameter; y++) {
    for (let x = 0; x < diameter; x++) {
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)

      if (distance <= radius) {
        const index = (y * diameter + x) * 4
        pixelData[index] = r // Vermelho
        pixelData[index + 1] = g // Verde
        pixelData[index + 2] = b // Azul
        pixelData[index + 3] = 255 // Alfa (255 = totalmente opaco)
      }
    }
  }

  return { width: diameter, height: diameter, data: pixelData }
}

function createMap() {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWdlbmNlc3R1ZGlvbWV0YSIsImEiOiJjanh5ZW81aHEwOHV3M2lwZzhhNW1vdXl5In0.3hbV2QKVzZWf511JK9xCug'

  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: mapStore.selectedCoffeeShop?.geometry.coordinates || [
      -49.07277033480926, -26.915345661590365
    ], // Blumenau
    zoom: 15
  })

  map.on('load', () => {
    // Adiciona ao mapa a definição de uma imagem. No caso, um ponto RGB 2D.
    map.addImage('#F08080', createRGBPoint({ r: 240, g: 128, b: 128 }))

    // Definição da fonte de dados.
    map.addSource('source', {
      type: 'geojson',
      data: toValue(coffeeShops),
      cluster: true,
      clusterMaxZoom: 15,
      clusterRadius: 20
    })

    // Configuraçōes do marcador de "clusters".
    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'source',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': '#F8AD9D',
        'circle-stroke-color': '#F4978E',
        'circle-stroke-width': 1,
        'circle-radius': 30
      }
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
        'text-allow-overlap': true
      },
      paint: {
        'text-color': 'white'
      }
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
        'icon-allow-overlap': true
      },
      paint: {
        'text-color': '#F08080',
        'text-halo-color': '#FFDAB9',
        'text-halo-width': 1,
        'text-halo-blur': 0
      }
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

  map.on('click', 'unclustered-point', async (e: any) => {
    if (!e.features) {
      mapStore.setSelectedCoffeeShop(null)
      return
    }

    if (map.getLayer('route')) {
      map.removeLayer('route')
    }
    if (map.getSource('route')) {
      map.removeSource('route')
    }

    mapStore.setSelectedCoffeeShop(e.features[0])

    generateRoute(e)
  })
}

const generateRoute = async (event: any) => {
  const route = await mapStore.calculateRoute([-49.06967512599098, -26.91337301328545], event)

  // Adiciona a fonte de dados com a geometria referente à melhor rota até a cafeteria.
  map.addSource('route', {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route.routes[0].geometry.coordinates
      }
    }
  })

  // Adiciona a camada responsável por desenhar a rota retornada.
  map.addLayer({
    id: 'route',
    type: 'line',
    source: 'route',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#F4978E',
      'line-width': 4
    }
  })

  mapStore.setSelectedCoffeeShop({
    ...mapStore.selectedCoffeeShop!,
    timeToArrive: route.routes[0].duration
  })
}

onMounted(async () => {
  const { data } = await mapStore.loadCoffeeShops()
  coffeeShops.value = toValue(data)[0]
  createMap()
  if (toValue(watchableSelectedCoffeeShop)) {
    generateRoute({
      lngLat: {
        lng: watchableSelectedCoffeeShop.value!.geometry.coordinates[0],
        lat: watchableSelectedCoffeeShop.value!.geometry.coordinates[1]
      }
    })
  }
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
  }
})
</script>

<template>
  <v-card>
    <div id="map" class="map-container"></div>
  </v-card>
</template>

<style scoped>
.map-container {
  min-width: 100px;
  min-height: 80vh;
  border-radius: 4px;
}
</style>
