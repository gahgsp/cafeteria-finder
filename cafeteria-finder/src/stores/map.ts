import { ref } from 'vue'
import { defineStore } from 'pinia'
import useCustomFetch from '@/composables/fetch'
import type { CoffeeShop } from '@/types'

export const useMapStore = defineStore('map', () => {
    const selectedCoffeeShop = ref<CoffeeShop | null>(null)

    async function loadCoffeeShops() {
        const response = await useCustomFetch<CoffeeShop>('http://localhost:3001/cafes').get().json()
        return response
    }

    function setSelectedCafeteria(newCoffeeShop: CoffeeShop) {
        selectedCoffeeShop.value = newCoffeeShop
    }

    return { loadCoffeeShops, selectedCoffeeShop, setSelectedCafeteria }
})