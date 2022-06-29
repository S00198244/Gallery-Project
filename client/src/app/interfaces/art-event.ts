import { Art } from "./art";
import { IComment } from "./icomment";

export interface ArtEvent {
    _id: string,
    title: string,
    summary: string,
    art: Art[]
    comments: IComment[],
}


