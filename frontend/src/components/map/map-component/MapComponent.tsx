import { LatLngBoundsExpression, LatLngTuple } from 'leaflet';
import React, { FC, ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { MapContainer, Marker, Popup, SVGOverlay, TileLayer } from 'react-leaflet';
import { COLOR_PRIMARY } from '../../../styling/colors';
import styles from './MapComponent.module.scss';

interface MapComponentProps {

}

const MapComponent: FC<MapComponentProps> = () => {

    const maxLat = 90;
    const maxLng = 180;

    const position: LatLngTuple = [50, 0];
    const maxBounds: LatLngBoundsExpression = [[-maxLat, -maxLng], [maxLat, maxLng]];
    const bounds: LatLngBoundsExpression = maxBounds;

    let [birdsDots, setBirdsDots]: [LatLngTuple[], Function] = useState([]); 

    function generateRandomBirds() {
        const birds = [];
        for(let i = 0; i < 100; i++) {
            birds.push([Math.random() * 2048, Math.random() * 2048])

        }
        setBirdsDots(birds);
    }

    if(birdsDots.length === 0) generateRandomBirds();

    return (
        <MapContainer center={position} zoom={3} maxZoom={3} minZoom={3} scrollWheelZoom={true} className={styles.leafletMap} maxBounds={maxBounds}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <SVGOverlay attributes={{ stroke: 'red' }} bounds={bounds}>
                {
                    birdsDots.map((el: LatLngTuple, i: number) => (
                        <circle r="3" cx={el[1]} cy={el[0]} fill={COLOR_PRIMARY} key={i} />
                    ))
                }
            </SVGOverlay>
        </MapContainer>
    );
};

export default MapComponent;
