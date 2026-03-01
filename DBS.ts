import type { Hotel } from "./types.js";
import * as fs from "fs";
import type { Filters } from "./types.js";

class HotelDB {
    private hotels: Hotel[];

    constructor (path:string) {
        let rawData = fs.readFileSync(path,"utf-8");
        this.hotels = JSON.parse(rawData);
    }

    public searchByFilter(filter:Filters): Hotel[]{
        let rst = this.hotels.filter((hotel) => {            
            if (filter.name && !hotel.name.toLowerCase().includes(filter.name.toLowerCase())) {
            return false;
        }

        if (filter.city && !hotel.city.toLowerCase().includes(filter.city.toLowerCase())) {
            return false;
        }

        if (filter.price) {
            const min = filter.price.min ?? 0;
            const max = filter.price.max ?? Number.MAX_SAFE_INTEGER;
            if (hotel.price < min || hotel.price > max) return false;
        }

        if (filter.stars) {
            const min = filter.stars.min ?? 0;
            const max = filter.stars.max ?? 5;
            if (hotel.stars < min || hotel.stars > max) return false;
        }

        return true;
        }).slice(0,5);
        console.log(`number of hotels found: ${rst.length}`)
        return rst;
    }
}

export const hotelDBS = new HotelDB("../hotelsData");
