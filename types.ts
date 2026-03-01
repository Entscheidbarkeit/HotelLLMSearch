export interface Hotel {
    id:number;
    name:string;
    city:string;
    price:number;
    stars:number;
    description:string;
}

export interface Filters{
    name?:string;
    city?:string;
    price?: {min?: number, max?: number};
    stars?: {min?: number, max?: number};
}