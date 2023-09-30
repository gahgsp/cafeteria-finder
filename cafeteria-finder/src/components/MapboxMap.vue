<script setup lang="ts">
import { createRGBPoint } from '@/composables/map'
import { useMapStore } from '@/stores/map'
// @ts-ignore
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css'
import { toValue, useGeolocation, watchDeep } from '@vueuse/core'
// @ts-ignore
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { storeToRefs } from 'pinia'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const geolocation = useGeolocation()

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

const createMap = () => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWdlbmNlc3R1ZGlvbWV0YSIsImEiOiJjanh5ZW81aHEwOHV3M2lwZzhhNW1vdXl5In0.3hbV2QKVzZWf511JK9xCug'

  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center:
      mapStore.selectedCoffeeShop?.geometry.coordinates ||
      (geolocation.coords.value.longitude !== Infinity
        ? [geolocation.coords.value.longitude, geolocation.coords.value.latitude] // Localização do Usuário
        : [-49.07652828529268, -26.909289754380417]), // Blumenau
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

    if (geolocation.coords.value.longitude !== Infinity) {
      new mapboxgl.Marker()
        .setLngLat([geolocation.coords.value.longitude, geolocation.coords.value.latitude])
        .addTo(map)
    }

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

  map.on('click', (e: any) => {
    if (!e.features) {
      mapStore.setSelectedCoffeeShop(null)
      return
    }
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

    const newSelectedCoffeeShop = e.features[0]
    newSelectedCoffeeShop.properties.sales = JSON.parse(newSelectedCoffeeShop.properties.sales)
    mapStore.setSelectedCoffeeShop(newSelectedCoffeeShop)

    generateRoute(e)
  })
}

const generateRoute = async (event: any) => {
  const route = await mapStore.calculateRoute(
    [geolocation.coords.value.longitude, geolocation.coords.value.latitude],
    event
  )

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
  const response = await mapStore.loadCoffeeShops()
  coffeeShops.value = toValue(response)[0]
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
  mapStore.setSelectedCoffeeShop(null)
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

@media (min-width: 960px) {
  .map-container {
    min-height: 75vh;
  }
}
</style>
