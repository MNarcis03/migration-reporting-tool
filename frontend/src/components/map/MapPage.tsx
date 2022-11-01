import { Button } from '@mui/material';
import { FC, useRef } from 'react';
import MapComponent from './map-component/MapComponent';
import MapFilter from './map-filter/MapFilter';
import styles from './MapPage.module.scss';

interface MapPageProps { }

const MapPage: FC<MapPageProps> = () => {
    return (
        <div className={styles.mapContainer}>
            <div className={styles.mapFilters}>
                <MapFilter data-testid="filter" />
                <Button variant="outlined">generate random</Button>
            </div>
            <MapComponent data-testid="map" />
        </div>
    );
}

export default MapPage;
