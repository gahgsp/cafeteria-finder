export interface User {
    id?: number
    name: string
    email: string
    password: string
}

export interface CoffeeShop {
    id: number
    properties: {
        name: string
        color: string
        address: string
        phone: string
        shift: string
    }
    geometry: {
        coordinates: [number, number]
    }
    timeToArrive?: number
}

export interface Favorite {
    id?: number
    userId: number,
    coffeeShopId: number
}

export interface Rating {
    id?: number
    coffeeShopId: number
    rating: number
}