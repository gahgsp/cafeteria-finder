import { createFetch } from '@vueuse/core'

const useCustomFetch = createFetch({
    baseUrl: "http://localhost:3001",
})

export default useCustomFetch