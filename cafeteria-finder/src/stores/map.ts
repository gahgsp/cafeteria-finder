import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', () => {
    const selectedCafeteria = ref(null)

    function setSelectedCafeteria(newCafeteria: any) {
        selectedCafeteria.value = newCafeteria
    }

    return { selectedCafeteria, setSelectedCafeteria }
})