import { LatLngBoundsExpression, LatLngTuple, LeafletEvent, LeafletMouseEvent, Map } from 'leaflet';
import React from 'react';
import { MapContainer, Marker, Popup, SVGOverlay, TileLayer } from 'react-leaflet';
import { COLOR_PRIMARY, COLOR_SURFACE } from '../../../styling/colors';
import styles from './MapComponent.module.scss';
import { ActionLog } from '../../../annotations';
import * as birdsService from '../../../services/birds-service';
import { checkPointInsideCircle, convertLatLngToXY } from "./helper";
import { BirdDot } from "../../../models/bird-dot.model";

export interface MapComponentProps {
    childRef: any
}

type MyState = {
    birdDots: BirdDot[],
    zoomLevel: number
};

class MapComponent extends React.Component<MapComponentProps, MyState> {

    private readonly mapRef: React.RefObject<Map>;

    private maxLat = 90;
    private maxLng = 180;
    private maxZoom = 5;
    private minZoom = 1;
    private defaultZoom = 3;
    private listenersHaveBeenSet = false;

    private position: LatLngTuple = [45, 0];
    private maxBounds: LatLngBoundsExpression = [[-this.maxLat, -this.maxLng], [this.maxLat, this.maxLng]];
    private bounds: LatLngBoundsExpression = this.maxBounds;

    state: MyState = {
        birdDots: [],
        zoomLevel: this.defaultZoom
    };

    constructor(props: MapComponentProps) {
        super(props);

        this.mapRef = React.createRef()

        this.updateBirds = this.updateBirds.bind(this);
        props.childRef.current = {
            generateRandomBirds: this.updateBirds
        }

    }
    
    private setZoomListener() {
        console.log(this.mapRef.current);
        this.mapRef.current?.addEventListener('zoom', (event: LeafletEvent) => {
            this.setState((state) => {
                state = {
                    ...state,
                    zoomLevel: event.target._zoom
                }
                return state;
            });
        });
        this.listenersHaveBeenSet = true;
    }
    
    private setHoverListener() {
        console.log(this.mapRef.current);
        this.mapRef.current?.addEventListener('mousemove', (event: LeafletMouseEvent) => {
            const mouseX = event.latlng.lng;
            const mouseY = event.latlng.lat;
            console.log(Math.round(mouseX), Math.round(mouseY));
            const indexesList: number[] = [];
            for(let i = 0; i < this.state.birdDots.length; i++) {
                const x = this.state.birdDots[i].coords[1];
                const y = this.state.birdDots[i].coords[0];
                if(checkPointInsideCircle(mouseX, mouseY, 20, x, y)) indexesList.push(i);
            }
            
            this.setState((state: MyState) => {
                return {
                    birdDots: state.birdDots.map((dot: BirdDot, i) => {
                        if(indexesList.includes(i)) {
                            return {
                                coords: dot.coords,
                                color: COLOR_PRIMARY,
                                nr: dot.nr
                            };
                        } else {
                            return {
                                coords: dot.coords,
                                color: COLOR_SURFACE,
                                nr: dot.nr
                            };
                        }
                    }),
                    zoomLevel: state.zoomLevel
                }
            });
            
        });
        this.listenersHaveBeenSet = true;
    }

    componentDidMount(): void {
        this.updateBirds();
        
    }

    componentDidUpdate(prevProps: Readonly<MapComponentProps>, prevState: Readonly<MyState>, snapshot?: any): void {
        if(!this.listenersHaveBeenSet && this.mapRef.current) {
            this.setZoomListener();
            this.setHoverListener();
        }
    }

    @ActionLog('query bird dots')
    updateBirds() {
        birdsService.getBirdsInfo(2022, 5).then((data: BirdDot[]) => {
        //     birdsService.getRandomBirdDots().then((data: BirdDot[]) => {
            this.setState((state) => {
                state = {
                    birdDots: data.map((dot: BirdDot) => ({
                        coords: dot.coords,
                        color: COLOR_SURFACE,
                        nr: dot.nr
                    })),
                    zoomLevel: this.defaultZoom,
                }
                return state;
            });
        })
    }

    render() {
        return (
            <MapContainer 
                center={this.position}
                zoom={this.defaultZoom}
                maxZoom={this.maxZoom}
                minZoom={this.minZoom}
                scrollWheelZoom={true}
                className={styles.leafletMap}
                maxBounds={this.maxBounds}
                ref={this.mapRef}
            >
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
                        this.state.birdDots.map((birdDot: BirdDot, i: number) => {
                            const { x, y } = convertLatLngToXY(birdDot.coords, this.state.zoomLevel)
                            // console.log('rendering');
                            return (
                                // <circle r="3" cx={x} cy={y} fill={COLOR_PRIMARY} key={i}/>
                                <circle r={4} cx={x} cy={y} fill={birdDot.color} strokeWidth={0} key={i}/>
                            )
                        })
                    }
                    {/*{*/}
                    {/*    (() => {*/}
                    {/*        const { x, y } = convertLatLngToXY([45, 0], this.state.zoomLevel)*/}
                    
                    {/*        return (*/}
                    {/*            <g>*/}
                    {/*                <line x1={-200} x2={1200} y1={1024} y2={1024} stroke={COLOR_PRIMARY} strokeWidth={5} />*/}
                    {/*                <circle cx={x} cy={y} fill={'#009900'} strokeWidth={0} r={7}/>*/}
                    {/*                <circle cx={x} cy={1024} fill={'#009900'} strokeWidth={0} r={7}/>*/}
                    {/*                /!*<circle cx={x} cy={y} fill={'#009900'} strokeWidth={0} r={7}/>*!/*/}
                    {/*            </g>*/}
                    {/*        )*/}
                    {/*    })()*/}
                    {/*}*/}
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

