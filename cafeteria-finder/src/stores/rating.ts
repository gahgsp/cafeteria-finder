import { defineStore } from 'pinia'
import useCustomFetch from '@/composables/fetch'
import type { Rating } from '@/types'
import { toValue } from '@vueuse/core'
import { ref } from 'vue'

export const useRatingStore = defineStore('rating', () => {
  const isLoadingRating = ref(false)

  async function updateCoffeeShopRating(coffeeShopId: number, newRating: number) {
    const { data } = await useCustomFetch<Rating[]>(`/ratings?coffeeShopId=${coffeeShopId}`).json()
    if (toValue(data)!.length > 0) {
      await useCustomFetch(`/ratings`).patch({
        id: toValue(data)![0].id,
        coffeeShopId,
        rating: newRating
      })
    } else {
      await useCustomFetch(`/ratings`).post({
        coffeeShopId,
        rating: newRating
      })
    }
  }

  async function loadCoffeeShopRating(coffeeShopId: number): Promise<Rating> {
    isLoadingRating.value = true
    const { data } = await useCustomFetch<Rating>(`/ratings?coffeeShopId=${coffeeShopId}`)
      .get()
      .json()
    isLoadingRating.value = false
    return toValue(data)[0]
  }

  return {
    updateCoffeeShopRating,
    loadCoffeeShopRating,
    isLoadingRating
  }
})
