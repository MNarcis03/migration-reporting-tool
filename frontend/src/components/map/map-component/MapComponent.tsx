import { LatLngTuple } from 'leaflet';
import React, { FC } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import styles from './MapComponent.module.scss';

interface MapComponentProps { }

const MapComponent: FC<MapComponentProps> = () => {
    const position: LatLngTuple = [51, 0];

    return (
        <MapContainer center={position} zoom={5} maxZoom={6} minZoom={2} scrollWheelZoom={true} className={styles.leafletMap}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
};

export default MapComponent;
