export interface FindFlatParams {
    city: string,
    checkInDate: Date,
    checkOutDate: Date,
    priceLimit?: number
  }
  
  export interface IFlat { 
    id: string,
    title: string,
    details: string,
    photos: string[],
    coordinates: number[],
    bookedDates: Date[],
    totalPrice: number
  }
  
  export class FlatRentSdk { 
    get(id: string): Promise<IFlat>
    search(parameters: FindFlatParams): Promise<IFlat[] | Error>
    book(flatId: number, checkInDate: Date, checkOutDate: Date):number
  }