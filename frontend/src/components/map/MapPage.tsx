import { FC } from 'react';
import MapComponent from './map-component/MapComponent';
import MapFilter from './map-filter/MapFilter';
import styles from './MapPage.module.scss';

interface MapPageProps { }

const MapPage: FC<MapPageProps> = () => {
    return (
        <div className={styles.mapContainer}>
            <MapFilter data-testid="filter" />
            <MapComponent data-testid="map" />
        </div>
    );
}

export default MapPage;
