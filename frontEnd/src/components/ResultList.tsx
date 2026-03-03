import type { Hotel } from "../../../types/types.js";

export function ResultList({ searchResult }: { searchResult: Hotel[] }) {
    return <div>{searchResult.map((hotel) => (
                <li key={hotel.id} className="hotel-item">
                    {hotel.name} - {hotel.city}
                </li>
            ))}</div>
}