<script setup lang="ts">
const { currentPath } = defineProps<{
  currentPath: string
}>()

const emits = defineEmits(['onClickFinder', 'onClickFavorites', 'onClickSettings'])

const handleOnClickFinder = () => {
  emits('onClickFinder')
}

const handleOnClickFavorites = () => {
  emits('onClickFavorites')
}

const handleOnClickSettings = () => {
  emits('onClickSettings')
}
</script>

<template>
  <v-bottom-navigation>
    <v-btn
      value="finder"
      @click="handleOnClickFinder"
      :disabled="currentPath == '/finder'"
      class="secondary"
      aria-label="Pesquisar"
      data-testid="finder-button"
    >
      <v-icon>mdi-map-marker</v-icon>
      <span>Pesquisar</span>
    </v-btn>
    <v-btn
      value="favorites"
      @click="handleOnClickFavorites"
      :disabled="currentPath == '/favorites'"
      class="secondary"
      aria-label="Favoritos"
      data-testid="favorites-button"
    >
      <v-icon>mdi-heart</v-icon>
      <span>Favoritos</span>
    </v-btn>
    <v-btn
      value="settings"
      @click="handleOnClickSettings"
      :disabled="currentPath == '/settings'"
      class="secondary"
      aria-label="Configuraçōes"
      data-testid="settings-button"
    >
      <v-icon>mdi-cog</v-icon>
      <span>Configuraçōes</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<style scoped>
.secondary {
  color: #f4978e;
}
</style>
