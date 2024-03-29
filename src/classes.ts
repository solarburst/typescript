import { HOMY_API_URL } from './constants.js';
import { FlatRentSdk, FindFlatParams } from './flat-rent-sdk.js';
import { FindPlacesParams, Place, RequestParams } from './interfaces.js';

export abstract class FindPlaces { 
  private static async fetchHomeApi(requestParams: RequestParams): Promise<Place[]> {
    if (requestParams.method === 'GET') {
      const fetchURL = HOMY_API_URL + requestParams.endPoint + this.serializeToGetParams(requestParams.parameters)
      const response = await fetch(fetchURL)
      return await response.json() 
    } else { 
      const fetchURL = HOMY_API_URL + requestParams.endPoint
      const response = await fetch(fetchURL, {
        method: requestParams.method,
        body: JSON.stringify(requestParams.parameters)
      })
      return await response.json()
    }
  }

  private static async getHomeAPI(params: FindPlacesParams): Promise<Place[]> {
    delete params.city

    const places = await this.fetchHomeApi({
      method: 'GET',
      endPoint: '/places',
      parameters: params
    })


    if (Array.isArray(places)) {
      return places
    } else { 
      return []
    }
  }

  private static serializeToGetParams(params: {[key: string]: string | number | undefined}): string { 
    return '?' + Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
  }

  private static async getFlatsSDK(params:FindPlacesParams): Promise<Place[]> {
    const flats = new FlatRentSdk();
    const parameters: FindFlatParams = {
      city: params?.city ? params.city : '',
      checkInDate: new Date(params.checkInDate),
      checkOutDate: new Date(params.checkOutDate),
    }

    params.maxPrice ? parameters.priceLimit = params.maxPrice : null

    const result = await flats.search(parameters)

    if (!Array.isArray(result)) { return [] }

    return result.map(flat => ({
      id: flat.id,
      image: flat.photos[0],
      name:	flat.title,
      description:	flat.details,
      remoteness:	0,
      bookedDates: flat.bookedDates.map(bookDate => bookDate.getTime()),
      price: flat.totalPrice
    }))
  }

  public static async findPlaces(params: FindPlacesParams, homy: boolean, flatRent: boolean):Promise<Place[]> { 
    let allPlaces: Place[] = [];

    if (flatRent) { 
      const places = await this.getFlatsSDK(params)
      allPlaces = [...allPlaces, ...places]
    }

    if (homy) { 
      const places = await this.getHomeAPI(params)
      allPlaces = [...allPlaces, ...places]
    }

    return allPlaces
  }

  public static sortPlaces(places: Place[], orderBy: 'price' | 'remoteness', orderType: 'ASC' |'DESC'): Place[] { 
    if (orderType === 'ASC') { 
      return places.sort((a, b) => a[orderBy] >= b[orderBy] ? 1 : -1)
    } 

    if (orderType === 'DESC') { 
      return places.sort((a, b) => a[orderBy] <= b[orderBy] ? 1 : -1)
    }
    
    return places
  }
}