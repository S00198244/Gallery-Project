import { Art } from "./art";
import { Review } from "./review";

export interface ArtEvent {
    _id: string,
    title: string,
    summary: string,
    startDate: Date,
    endDate: Date,
    art: Art[]
    reviews: Review[],
}


