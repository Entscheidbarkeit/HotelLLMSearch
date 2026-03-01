import {faker} from "@faker-js/faker";
import * as fs from 'fs';
import {Hotel} from './types.js';

const generateHotelData = (count:number):Hotel[] => {
    const hotels :Hotel[] = [];
    for (let i = 0; i < count ; i++) {
        let city = faker.location.city()
        hotels.push({
            id: i,
            name: `${faker.company.name()} ${city} Hotel`,
            city: city,
            price: faker.number.int({min:50,max:1000}),
            stars: faker.number.int({min:0,max:5}),
            description: faker.lorem.paragraph()
        })
    }
    return hotels;
} 

let hotels = generateHotelData(10000);
fs.writeFileSync("hotelsData",JSON.stringify(hotels,null,2))
console.log("10000 data generated and stored into ./hotelsData")