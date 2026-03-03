import {faker} from "@faker-js/faker";
import * as fs from 'fs';
import type {Hotel} from './types/types.js';

const germanCities = ["Berlin", "Hamburg", "München", "Nürnberg", "Augsburg", "Regensburg", "Ingolstadt", "Würzburg", "Fürth", "Erlangen", "Bamberg", "Bayreuth", "Landshut", "Passau", "Stuttgart", "Mannheim", "Karlsruhe", "Freiburg im Breisgau", "Heidelberg", "Heilbronn", "Ulm", "Pforzheim", "Reutlingen", "Ludwigsburg", "Tübingen", "Köln", "Düsseldorf", "Dortmund", "Essen", "Duisburg", "Bochum", "Wuppertal", "Bielefeld", "Bonn", "Münster", "Gelsenkirchen", "Mönchengladbach", "Aachen", "Chemnitz", "Leverkusen", "Solingen", "Herne", "Neuss", "Paderborn", "Bottrop", "Recklinghausen", "Frankfurt am Main", "Wiesbaden", "Kassel", "Darmstadt", "Offenbach am Main", "Hanau", "Giessen", "Marburg", "Fulda", "Leipzig", "Dresden", "Chemnitz", "Zwickau", "Plauen", "Görlitz", "Hannover", "Braunschweig", "Oldenburg", "Osnabrück", "Wolfsburg", "Göttingen", "Salzgitter", "Hildesheim", "Delmenhorst", "Wilhelmshaven", "Bremen", "Bremerhaven", "Kiel", "Lübeck", "Flensburg", "Neumünster", "Norderstedt", "Magdeburg", "Halle (Saale)", "Dessau-Roßlau", "Stendal", "Erfurt", "Jena", "Gera", "Weimar", "Eisenach", "Mainz", "Ludwigshafen am Rhein", "Koblenz", "Trier", "Kaiserslautern", "Worms", "Saarbrücken", "Neunkirchen", "Homburg", "Potsdam", "Cottbus", "Brandenburg an der Havel", "Frankfurt (Oder)", "Schwerin", "Rostock", "Stralsund", "Greifswald", "Wismar"];
const germanHigh = ["Kempinski Hotels", "Steigenberger Hotels & Resorts", "The Ritz-Carlton", "Rocco Forte Hotels", "Park Hyatt", "Grand Hyatt", "Waldorf Astoria", "Adlon Kempinski", "Hotel Bayerischer Hof", "Breidenbacher Hof", "Schloss Elmau", "Vier Jahreszeiten Kempinski", "Jumeirah", "Fairmont Hotel Vier Jahreszeiten", "Regent Hotels"]
const germanMiddle= ["Maritim Hotels", "Leonardo Hotels", "NH Hotels", "Mercure", "Novotel", "Hilton", "Marriott", "Sheraton", "Lindner Hotels & Resorts", "Dorint Hotels & Resorts", "Radisson Blu", "Adina Apartment Hotels", "H-Hotels", "Vienna House", "Arcona Hotels & Resorts", "Crowne Plaza", "Courtyard by Marriott", "25hours Hotels", "Ruby Hotels", "NH Collection"]
const germanLow= ["Motel One", "B&B Hotels", "Ibis", "Ibis Styles", "Ibis Budget", "Premier Inn", "Holiday Inn Express", "A&O Hotels and Hostels", "Meininger Hotels", "The niu", "Moxy Hotels", "Achat Hotels", "McDreams Hotels", "Prizeotel", "Hampton by Hilton", "Super 8 by Wyndham", "Best Western", "IntercityHotel", "Boutique 009", "Sleep'n Well"]

const germanHotel = germanHigh.concat(germanMiddle.concat(germanLow));

const generateHotelData = (count:number):Hotel[] => {
    const hotels :Hotel[] = [];
    for (let i = 0; i < count ; i++) {
        let city = faker.helpers.arrayElement(germanCities)
        hotels.push({
            id: i,
            name: `${faker.helpers.arrayElement(germanHotel)} ${city}`,
            city: city,
            price: faker.number.int({min:50,max:1000}),
            stars: faker.number.int({min:0,max:5}),
            description: faker.lorem.paragraph()
        })
    }
    return hotels;
} 

let hotels = generateHotelData(10000);
fs.writeFileSync("hotelsData_2",JSON.stringify(hotels,null,2))
console.log("10000 data generated and stored into ./hotelsData_2")