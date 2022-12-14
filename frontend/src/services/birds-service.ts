import birdsMockInfo from '../mock/mock-birds.json';
import { BirdDot } from "../models/bird-dot.model";
import axios from "axios";

export async function getRandomBirdDots(): Promise<BirdDot[]> {
    const birds: BirdDot[] = [];
    for (let i = 0; i < 500; i++) {
        birds.push({
            coords: [Math.random() * 180 - 90, Math.random() * 360 - 180],
            color: '',
            nr: 1
        });
        
    }
    return Promise.resolve(birds);
}

export async function getBirdsInfo(year: number, month: number): Promise<BirdDot[]> {
    const birds: BirdDot[] = [];
    // for (let info of birdsMockInfo) {
    //     birds.push({
    //         coords: [parseFloat(info.lat), parseFloat(info.long)],
    //         color: '',
    //         nr: parseInt(info.nr)
    //     });
    // }
    const url = 'http://127.0.0.1:3050/birdTweets';
    return axios.get(url).then(response => response.data.data);
}
