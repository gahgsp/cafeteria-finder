import { ref } from 'vue'
import { defineStore } from 'pinia'
import useCustomFetch from '@/composables/fetch'
import type { CoffeeShop, Rating } from '@/types'
import { toValue } from '@vueuse/core'

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

  async function updateCoffeeShopRating(coffeeShopId: number, newRating: number) {
    const { data } = await useCustomFetch<Rating[]>(
      `http://localhost:3001/ratings?coffeShopId=${coffeeShopId}`
    ).json()
    if (toValue(data)!.length > 0) {
      await useCustomFetch(`http://localhost:3001/ratings`).patch({
        id: toValue(data)![0].id,
        coffeeShopId,
        rating: newRating
      })
    } else {
      await useCustomFetch(`http://localhost:3001/ratings`).post({
        coffeeShopId,
        rating: newRating
      })
    }
  }

  async function loadCoffeeShopRating(coffeeShopId: number): Promise<Rating> {
    const { data } = await useCustomFetch<Rating>(
      `http://localhost:3001/ratings?coffeShopId=${coffeeShopId}`
    ).json()
    return toValue(data)
  }

  return {
    loadCoffeeShops,
    loadSpecificCoffeeShops,
    calculateRoute,
    isCalculatingRoute,
    selectedCoffeeShop,
    setSelectedCoffeeShop,
    updateCoffeeShopRating,
    loadCoffeeShopRating
  }
})
