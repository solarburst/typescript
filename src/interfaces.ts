export interface Place { 
    id: string,
    image:	string,
    name:	string,
    description:	string,
    remoteness:	number,
    bookedDates: number[],
    price: number
 }
 
 export interface User { 
    username: string,
    avatarUrl: string
 }
 
 export interface RequestParams {
    method: 'GET' | 'PATCH',
    endPoint: string,
    parameters: GetPlaceParams | FindPlacesParams | BookPlaceParams
 }
 
 export interface GetPlaceParams {
    id: number,
    coordinates?: string,
 }
 
 export interface FindPlacesParams {
    city?: string,
    coordinates?: string,
    checkInDate: number,
    checkOutDate: number,
    maxPrice?: number
 }
 
 export interface BookPlaceParams {
    id: number,
    checkInDate: number,
    checkOutDate: number
 }