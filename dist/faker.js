"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var fs = require("fs");
var generateHotelData = function (count) {
    var hotels = [];
    for (var i = 0; i < count; i++) {
        var city = faker_1.faker.location.city();
        hotels.push({
            id: i,
            name: "".concat(faker_1.faker.company.name(), " ").concat(city, " Hotel"),
            city: city,
            price: faker_1.faker.number.int({ min: 50, max: 1000 }),
            stars: faker_1.faker.number.int({ min: 0, max: 5 }),
            description: faker_1.faker.lorem.paragraph()
        });
    }
    return hotels;
};
var hotels = generateHotelData(10000);
fs.writeFileSync("hotelsData", JSON.stringify(hotels, null, 2));
console.log("10000 data generated and stored into ./hotelsData");
