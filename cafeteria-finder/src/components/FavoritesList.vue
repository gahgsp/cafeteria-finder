<script setup lang="ts">
import type { CoffeeShop } from '@/types'
import { toValue } from 'vue'

const { coffeeShops } = defineProps<{
  coffeeShops: CoffeeShop[]
}>()

const emits = defineEmits(['onNavigateToFavorite'])

const onHandleFavoriteNavigate = (coffeeShop: CoffeeShop) => {
  emits('onNavigateToFavorite', toValue(coffeeShop))
}
</script>

<template>
  <v-list lines="two" density="compact" v-if="coffeeShops.length">
    <v-list-item
      v-for="coffeeShop in coffeeShops"
      :key="coffeeShop.id"
      :title="coffeeShop.properties.name"
      :subtitle="coffeeShop.properties.address"
      class="favorite-item"
    >
      <template v-slot:prepend>
        <v-avatar color="grey-lighten-1">
          <v-icon color="white">mdi-coffee</v-icon>
        </v-avatar>
      </template>
      <template v-slot:append>
        <v-btn
          color="grey-lighten-1"
          icon="mdi-navigation-variant"
          variant="text"
          @click="onHandleFavoriteNavigate(coffeeShop)"
        />
      </template>
    </v-list-item>
  </v-list>
</template>
