import { ref } from 'vue'
import { defineStore } from 'pinia'
import useCustomFetch from '@/composables/fetch'

export const useMapStore = defineStore('map', () => {
    const selectedCafeteria = ref(null)

    async function loadCafeterias() {
        const response = await useCustomFetch('http://localhost:3001/cafes')
        return response
    }

    function setSelectedCafeteria(newCafeteria: any) {
        selectedCafeteria.value = newCafeteria
    }

    return { loadCafeterias, selectedCafeteria, setSelectedCafeteria }
})