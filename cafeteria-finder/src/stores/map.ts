import { ref } from 'vue'
import { defineStore } from 'pinia'
import useCustomFetch from '@/composables/fetch'
import type { CoffeeShop, Rating } from '@/types'
import { toValue } from '@vueuse/core'

export const useMapStore = defineStore('map', () => {
    const selectedCoffeeShop = ref<CoffeeShop | null>(null)

    async function loadCoffeeShops() {
        const response = await useCustomFetch<CoffeeShop>('http://localhost:3001/cafes').get().json()
        return response
    }

    async function loadSpecificCoffeeShops(coffeeShopsIds: number[]): Promise<{ coffeeShops: CoffeeShop[], isError: boolean }> {
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

    async function updateCoffeeShopRating(coffeeShopId: number, newRating: number) {
        const { data } = await useCustomFetch<Rating[]>(`http://localhost:3001/ratings?coffeShopId=${coffeeShopId}`).json()
        if (toValue(data)!.length > 0) {
            await useCustomFetch(`http://localhost:3001/ratings`).patch({ id: toValue(data)![0].id, coffeeShopId, rating: newRating })
        } else {
            await useCustomFetch(`http://localhost:3001/ratings`).post({ coffeeShopId, rating: newRating })
        }
    }

    async function loadCoffeeShopRating(coffeeShopId: number): Promise<Rating> {
        const { data } = await useCustomFetch<Rating>(`http://localhost:3001/ratings?coffeShopId=${coffeeShopId}`).json()
        return toValue(data)
    }

    return { loadCoffeeShops, loadSpecificCoffeeShops, selectedCoffeeShop, setSelectedCoffeeShop, updateCoffeeShopRating, loadCoffeeShopRating }
})