import { FC } from 'react';
import MapComponent from './MapComponent';
import styles from './MapPage.module.scss';

interface MapPageProps { }

const MapPage: FC<MapPageProps> = () => {
    return (
        <div className={styles.mapContainer}>
            <MapComponent />
        </div>
    );
}

export default MapPage;
