import { FC } from 'react';
import MapComponent from './map-component/MapComponent';
import MapFilter from './map-filter/MapFilter';
import styles from './MapPage.module.scss';

interface MapPageProps { }

const MapPage: FC<MapPageProps> = () => {
    return (
        <div className={styles.mapContainer}>
            <MapFilter />
            <MapComponent />
        </div>
    );
}

export default MapPage;
