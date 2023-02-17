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
   [key: string]: string, 
    username: string,
    avatarUrl: string
 }
 
 export interface RequestParams {
    method: 'GET' | 'PATCH',
    endPoint: string,
    parameters: GetPlaceParams | FindPlacesParams | BookPlaceParams
 }
 
 export interface GetPlaceParams {
   [key: string]: string | number | undefined,
    id: number,
    coordinates?: string,
 }
 
 export interface FindPlacesParams {
   [key: string]: string | number | undefined,
    city?: string,
    coordinates?: string,
    checkInDate: number,
    checkOutDate: number,
    maxPrice?: number
 }
 
 export interface BookPlaceParams {
   [key: string]: number,
    id: number,
    checkInDate: number,
    checkOutDate: number
 }