import { defineStore } from 'pinia'
import useCustomFetch from '@/composables/fetch'
import { toValue } from '@vueuse/core'
import { useUserStore } from '@/stores/user'

export const useFavoritesStore = defineStore('favorites', () => {

    const userStore = useUserStore()

    async function saveFavorite(coffeeShopId: string) {
        const { data, error } = useCustomFetch('http://localhost:3001/favorites').post({ coffeeShopId, userId: toValue(userStore.currentUser).id })
        return { isError: toValue(error), favorite: toValue(data) }
    }

    return { saveFavorite }
})