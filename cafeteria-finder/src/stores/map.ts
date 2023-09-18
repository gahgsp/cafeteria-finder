import useCustomFetch from '@/composables/fetch'
import type { CoffeeShop } from '@/types'
import { toValue } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMapStore = defineStore('map', () => {
  const selectedCoffeeShop = ref<CoffeeShop | null>(null)
  const isCalculatingRoute = ref<boolean>(false)

  async function loadCoffeeShops() {
    const response = await useCustomFetch<CoffeeShop>('http://localhost:3001/cafes').get().json()
    return response
  }

  async function loadSpecificCoffeeShops(
    coffeeShopsIds: number[]
  ): Promise<{ coffeeShops: CoffeeShop[]; isError: boolean }> {
    const coffeeShops = ref<CoffeeShop[]>([])
    const { data, error } = await useCustomFetch('http://localhost:3001/cafes?').get().json()
    const retrievedCoffeeShops: CoffeeShop[] = toValue(data)[0].features

    coffeeShops.value = retrievedCoffeeShops.filter((retrievedCoffeeShop) => {
      return coffeeShopsIds.includes(+retrievedCoffeeShop.id)
    })
    return { coffeeShops: toValue(coffeeShops), isError: !!toValue(error) }
  }

  function setSelectedCoffeeShop(newCoffeeShop: CoffeeShop | null) {
    selectedCoffeeShop.value = newCoffeeShop
  }

  async function calculateRoute(
    userCoordinates: [number, number],
    mapCoordinatesEvent: { lngLat: { lng: number; lat: number } }
  ) {
    isCalculatingRoute.value = true
    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${userCoordinates[0]},${userCoordinates[1]};${mapCoordinatesEvent.lngLat.lng},${mapCoordinatesEvent.lngLat.lat}?steps=true&geometries=geojson&access_token=pk.eyJ1IjoiYWdlbmNlc3R1ZGlvbWV0YSIsImEiOiJjanh5ZW81aHEwOHV3M2lwZzhhNW1vdXl5In0.3hbV2QKVzZWf511JK9xCug`
    )
    isCalculatingRoute.value = false
    return response.json()
  }

  return {
    loadCoffeeShops,
    loadSpecificCoffeeShops,
    calculateRoute,
    isCalculatingRoute,
    selectedCoffeeShop,
    setSelectedCoffeeShop
  }
})
