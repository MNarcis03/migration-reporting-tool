import { Button } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import MapComponent from './map-component/MapComponent';
import MapFilter from './map-filter/MapFilter';
import styles from './MapPage.module.scss';

interface MapPageProps { }

const MapPage: FC<MapPageProps> = () => {

    let mapComponentRef = useRef<any>(null);

    document.onkeyup = (event: KeyboardEvent) => {
        if(event.key === ' ') {
            console.log(typeof MapComponent);
            console.log(mapComponentRef);
        }
    }

    useEffect(() => {
        console.log('page loaded');
    })

    return (
        <div className={styles.mapContainer}>
            <div className={styles.mapFilters}>
                <MapFilter data-testid="filter" />
                <Button variant="outlined" onClick={() => {mapComponentRef.current.generateRandomBirds()}}>
                    generate random
                </Button>
            </div>
            <MapComponent childRef={mapComponentRef} />
        </div>
    );
}

export default MapPage;
