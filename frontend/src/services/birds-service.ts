import { BirdDot } from "../models/bird-dot.model";
import axios from "axios";
import { TweetModel } from "../models/tweet.model";

export async function getRandomBirdDots(): Promise<BirdDot[]> {
    const birds: BirdDot[] = [];
    for (let i = 0; i < 500; i++) {
        birds.push({
            coords: [Math.random() * 180 - 90, Math.random() * 360 - 180],
            color: '',
            nr: 1,
            tagsIds: ['bird']
        });
        
    }
    return Promise.resolve(birds);
}

export async function getBirdsInfoByMonth(year: number, month: number): Promise<void | TweetModel[]> {
    const url = 'http://127.0.0.1:3050/birdMigration';
    return axios.get(url)
        .then(response => {
            const birds: TweetModel[] = response.data.data;
            return birds.filter((tweet) => {
                const nrs = tweet.date.match(/[0-9]+/g);
                return !!nrs && parseInt(nrs[0]) === year && parseInt(nrs[1]) === month;
            });
        })
        .catch(err => console.log(err));
}

export async function getAllBirdsInfo(): Promise<void | TweetModel[]> {
    const url = 'http://127.0.0.1:3050/birdMigration';
    return axios.get(url)
        .then(response => {
            const birds: TweetModel[] = response.data.data;
            return birds;
        })
        .catch(err => console.log(err));
}
