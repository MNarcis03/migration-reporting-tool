import React, { FC, useState } from 'react';
import * as birdsService from "../../services/birds-service";
import { TweetModel } from "../../models/tweet.model";
import { Card } from "@mui/material";
import styles from './StatisticsPage.module.scss';
import { months } from "./constants";

interface StatisticsProps { }

const Statistics: FC<StatisticsProps> = () => {
    const [tweetsList, setTweetsList] = useState([] as TweetModel[]);
    
    const getBirds = () => {
        birdsService.getAllBirdsInfo().then((data) => {
            if(!data) return;
            setTweetsList(data);
        });
    };

    const getTweetsFromMonth = (month: number) => {
        return tweetsList.filter((tweet: TweetModel) => {
            const tweetMonth = tweet.date.match(/[0-9]+/g);
            return tweetMonth && parseInt(tweetMonth[1]) === month;
        });
    }
    
    if(!tweetsList.length) {
        getBirds();
    }

    return (
        <div className={styles.statistics}>
            {
                months.map((month: { nr: number, name: string }) => {
                    const tweetsOfMonth = getTweetsFromMonth(month.nr);
                    const birdsNr = tweetsOfMonth.reduce((sum, tweet: TweetModel) => sum + parseInt(tweet.appearances + ''), 0);
                    const locations = tweetsOfMonth.reduce((locationsList, tweet) => 
                        `${locationsList}${!locationsList ? '' : ','} ${tweet.location}`, ''
                    );
                    return (
                        <Card variant="outlined" className={styles.card}>
                            <h2><b>{month.name}</b></h2>
                            <p><b>Nr of apparitions:</b> {birdsNr}</p>
                            <p className={styles.locations}><b>Locations:</b> {locations}</p>
                        </Card>
                    );
                })
            }
        </div>
    );
};

export default Statistics;
