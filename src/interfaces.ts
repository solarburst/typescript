export interface User { 
    username: string,
    avatarUrl: string
}

export interface Place { 
    id: number,
    image: string,
    name: string,
    description: string,
    remoteness:	number,
    bookedDates: number[],
    price: number
}

export interface RequestParams {
    method: 'GET' | 'PATCH',
    endPoint: string,
    parameters: GetPlaceParams | FindPlacesParams | BookPlaceParams
}
 
export interface GetPlaceParams extends Record<string, string | number> {
    id: number,
    coordinates?: string,
}
 
export interface FindPlacesParams extends Record<string, string | number> {
    coordinates: string,
    checkInDate: number,
    checkOutDate: number,
    maxPrice?: number
}
 
export interface BookPlaceParams extends Record<string, number> {
    id: number,
    checkInDate: number,
    checkOutDate: number
}

export interface SearchFormData { 
    'city': string,
    'coordinates': [number, number],
    'check-in-date': Date,
    'check-out-date': Date,
    'max-price': number,
}