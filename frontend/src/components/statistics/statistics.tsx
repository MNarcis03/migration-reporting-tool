import React, { FC } from 'react';
import styles from './statistics.module.scss';

interface StatisticsProps {}

const Statistics: FC<StatisticsProps> = () => (
  <div className={styles.Statistics}>
    Statistics Component
  </div>
);

export default Statistics;
