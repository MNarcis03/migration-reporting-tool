import { LatLngTuple } from "leaflet";

export async function getBirdDots(year: number, month: number): Promise<LatLngTuple[]> {
    const birds: LatLngTuple[] = [];
    for (let i = 0; i < 100; i++) {
        birds.push([Math.random() * 2048, Math.random() * 2048])

    }
    return Promise.resolve(birds);
}
