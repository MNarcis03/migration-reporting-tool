import { LatLngTuple } from "leaflet";

export const widthForZeroZoom = 256;
export const heightForZeroZoom = 256;

export function convertLatLngToXY(coords: LatLngTuple, zoomLevel: number): {x: number, y: number} {
    const multiplyValue = Math.pow(2, zoomLevel);
    const x = (coords[1] + 180) / 360 * (widthForZeroZoom * multiplyValue);
    const y = (coords[0] - 90) / -180 * (heightForZeroZoom * multiplyValue);
    return {
        x,
        y
    };
}

export function checkPointInsideCircle(circleX: number, circleY: number, radius: number, x: number, y: number): boolean {
    if(Math.abs(circleX - x) > radius) return false;
    if(Math.abs(circleY - y) > radius) return false;
    circleY *= 2;
    y *= 2;
    return (x - circleX) * (x - circleX) + (y - circleY) * (y - circleY) <= radius * radius;
}