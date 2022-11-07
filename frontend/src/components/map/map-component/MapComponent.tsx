import { LatLngBoundsExpression, LatLngTuple } from 'leaflet';
import React, { createRef, FC, Ref, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, SVGOverlay, TileLayer } from 'react-leaflet';
import { COLOR_PRIMARY } from '../../../styling/colors';
import styles from './MapComponent.module.scss';
import { ActionLog } from '../../../annotations';
import { getBirdDots } from '../../../services/birds-service';

export interface MapComponentProps {
    childRef: any
}

type MyState = {
    birdDots: LatLngTuple[],
};

class MapComponent extends React.Component<MapComponentProps, MyState> {

    private maxLat = 90;
    private maxLng = 180;

    private position: LatLngTuple = [50, 0];
    private maxBounds: LatLngBoundsExpression = [[-this.maxLat, -this.maxLng], [this.maxLat, this.maxLng]];
    private bounds: LatLngBoundsExpression = this.maxBounds;

    state: MyState = {
        birdDots: [],
    };

    constructor(props: MapComponentProps) {
        super(props);
        this.generateRandomBirds = this.generateRandomBirds.bind(this);
        props.childRef.current = {
            generateRandomBirds: this.generateRandomBirds
        }

    }

    componentDidMount(): void {
        this.generateRandomBirds();
        
    }

    @ActionLog('query bird dots')
    generateRandomBirds() {
        getBirdDots(2022, 5).then((data: LatLngTuple[]) => {
            this.setState((state) => {
                state = {
                    birdDots: [...data]
                }
                return state;
            });
        })
    }

    render() {
        return (
            <MapContainer center={this.position} zoom={3} maxZoom={3} minZoom={3} scrollWheelZoom={true} className={styles.leafletMap} maxBounds={this.maxBounds}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={this.position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <SVGOverlay attributes={{ stroke: 'red' }} bounds={this.bounds}>
                    {
                        this.state.birdDots.map((el: LatLngTuple, i: number) => (
                            <circle r="3" cx={el[1]} cy={el[0]} fill={COLOR_PRIMARY} key={i} />
                        ))
                    }
                </SVGOverlay>
            </MapContainer>
        );
    }
}

export default MapComponent;











// const MapComponent: FC<MapComponentProps> = (props: MapComponentProps) => {

//     let svgRef = useRef<Ref<SVGOverlayLeaflet> | undefined>(null);

//     const maxLat = 90;
//     const maxLng = 180;

//     const position: LatLngTuple = [50, 0];
//     const maxBounds: LatLngBoundsExpression = [[-maxLat, -maxLng], [maxLat, maxLng]];
//     const bounds: LatLngBoundsExpression = maxBounds;

//     let [birdDots, setBirdDots]: [LatLngTuple[], Function] = useState([]);

//     // @ts-ignore
//     @EnteringLog()
//     @ExitingLog()
//         function generateRandomBirds() {
//         // const generateRandomBirds =
//         // () => {
//         const birds = [];
//         for (let i = 0; i < 100; i++) {
//             birds.push([Math.random() * 2048, Math.random() * 2048])

//         }
//         setBirdDots(birds);
//     }

//     props.childRef.current = {
//         generateRandomBirds
//     }

//     if (birdDots.length === 0) generateRandomBirds();

//     return (
//         <MapContainer center={position} zoom={3} maxZoom={3} minZoom={3} scrollWheelZoom={true} className={styles.leafletMap} maxBounds={maxBounds}>
//             <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <Marker position={position}>
//                 <Popup>
//                     A pretty CSS3 popup. <br /> Easily customizable.
//                 </Popup>
//             </Marker>
//             <SVGOverlay attributes={{ stroke: 'red' }} bounds={bounds}>
//                 {
//                     birdDots.map((el: LatLngTuple, i: number) => (
//                         <circle r="3" cx={el[1]} cy={el[0]} fill={COLOR_PRIMARY} key={i} />
//                     ))
//                 }
//             </SVGOverlay>
//         </MapContainer>
//     );
// };

