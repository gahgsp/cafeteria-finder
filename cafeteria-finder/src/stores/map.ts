import { ref } from 'vue'
import { defineStore } from 'pinia'
import useCustomFetch from '@/composables/fetch'
import type { CoffeeShop } from '@/types'
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

    return { loadCoffeeShops, loadSpecificCoffeeShops, selectedCoffeeShop, setSelectedCoffeeShop }
})