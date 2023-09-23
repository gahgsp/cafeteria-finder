import { createFetch } from '@vueuse/core'

const useCustomFetch = createFetch({
  baseUrl: 'https://cafeteria-finder-data.onrender.com'
})

export default useCustomFetch
