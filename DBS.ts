import { Hotel } from "./types.js";
import * as fs from "fs";
import { Filters } from "./types.js";

class HotelDB {
    private hotels: Hotel[];

    constructor (path:string) {
        let rawData = fs.readFileSync(path,"utf-8");
        this.hotels = JSON.parse(rawData);
    }

    public searchByFilter(filter:Filters): Hotel[]{
        let rst = this.hotels.filter((hotel) => {            
            if(filter.name)
                return hotel.name.toLowerCase().includes(filter.name.toLowerCase());
            return hotel;
        }).filter((hotel) => {
            if(filter.city)
                return hotel.city.toLowerCase().includes(filter.city.toLowerCase());
            return hotel
        }).filter((hotel) => {
            if(filter.price){
                if (filter.price.min && filter.price.max)
                    return hotel.price<=filter.price.max && hotel.price >= filter.price.min;
                else if(filter.price.min && ! filter.price.max)
                    return hotel.price >= filter.price.min;
                else if(! filter.price.min && filter.price.max)
                    return hotel.price <= filter.price.max;
            }
            return hotel;
        }).filter((hotel) => {
            if(filter.stars){
                if (filter.stars.min && filter.stars.max)
                    return hotel.stars<=filter.stars.max && hotel.stars >= filter.stars.min;
                else if(filter.stars.min && ! filter.stars.max)
                    return hotel.stars >= filter.stars.min;
                else if(! filter.stars.min && filter.stars.max)
                    return hotel.stars <= filter.stars.max;
            }
            return hotel;
        }).slice(0,5)
        return rst;
    }
}

export const hotelDBS = new HotelDB("../hotelsData");
