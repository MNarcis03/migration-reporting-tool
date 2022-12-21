import { LatLngTuple } from "leaflet";

export interface BirdDot {
    coords: LatLngTuple,
    color: string,
    nr: number,
    tagsIds: string[]
}