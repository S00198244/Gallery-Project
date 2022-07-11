import { Art } from "./art";
import { Review } from "./review";

export interface ArtEvent {
    _id: string,
    title: string,
    summary: string,
    art: Art[]
    reviews: Review[],
}


