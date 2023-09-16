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
}

export interface Favorite {
    id?: number
    userId: number,
    coffeeShopId: number
}