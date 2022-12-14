import { LatLngBoundsExpression, LatLngTuple, LeafletEvent, LeafletMouseEvent, Map } from 'leaflet';
import React from 'react';
import { Circle, LayerGroup, LayersControl, MapContainer, Marker, Popup, SVGOverlay, TileLayer } from 'react-leaflet';
import { COLOR_PRIMARY, COLOR_SURFACE } from '../../../styling/colors';
import styles from './MapComponent.module.scss';
import { ActionLog } from '../../../annotations';
import * as birdsService from '../../../services/birds-service';
import { checkPointInsideCircle, convertLatLngToXY } from "./helper";
import { BirdDot } from "../../../models/bird-dot.model";
import { DEFAULT_ZOOM, MAX_LAT, MAX_LNG, MAX_ZOOM, MIN_ZOOM } from "./constants";

export interface MapComponentProps {
    childRef: any
}

type MyState = {
    birdDots: BirdDot[],
    zoomLevel: number
};

class MapComponent extends React.Component<MapComponentProps, MyState> {

    private readonly mapRef: React.RefObject<Map>;

    private listenersHaveBeenSet = false;
    private center: LatLngTuple = [51.505, -0.09]

    private position: LatLngTuple = [45, 0];
    private maxBounds: LatLngBoundsExpression = [[-MAX_LAT, -MAX_LNG], [MAX_LAT, MAX_LNG]];
    private bounds: LatLngBoundsExpression = this.maxBounds;

    state: MyState = {
        birdDots: [],
        zoomLevel: DEFAULT_ZOOM
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
        this.mapRef.current?.addEventListener('mousemove', (event: LeafletMouseEvent) => {
            const mouseX = event.latlng.lng;
            const mouseY = event.latlng.lat;
            const indexesList: number[] = [];
            for(let i = 0; i < this.state.birdDots.length; i++) {
                const x = this.state.birdDots[i].coords[1];
                const y = this.state.birdDots[i].coords[0];
                if(checkPointInsideCircle(event.latlng.lng, event.latlng.lat, 4, x, y)) {
                    indexesList.push(i)
                }
            }
            
            this.setState((state: MyState) => {
                return {
                    birdDots: state.birdDots.map((dot: BirdDot, i) => ({
                        ...dot,
                        color: indexesList.includes(i) ? COLOR_PRIMARY : COLOR_SURFACE
                    })),
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
    async updateBirds() {
        birdsService.getBirdsInfo(2022, 5).then((data: BirdDot[]) => {
            console.log('query response:', data);
            this.setState((state) => {
                state = {
                    birdDots: data.map((dot: BirdDot) => ({
                        coords: dot.coords,
                        color: COLOR_SURFACE,
                        nr: dot.nr
                    })),
                    zoomLevel: DEFAULT_ZOOM,
                }
                return state;
            });
        });
    }

    render() {
        return (
            <MapContainer 
                center={this.position}
                zoom={DEFAULT_ZOOM}
                maxZoom={MAX_ZOOM}
                minZoom={MIN_ZOOM}
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
                <LayersControl position="topright">
                    <LayersControl.Overlay checked name="Bird dots">
                        <LayerGroup>
                                {
                                    this.state.birdDots.map((birdDot: BirdDot, i: number) => {
                                        return (
                                            <Circle
                                                center={birdDot.coords}
                                                radius={40000}
                                                fill={true}
                                                fillColor={birdDot.color}
                                                fillOpacity={1}
                                                stroke={false}
                                            />
                                        )
                                    })
                                }
                            <Circle
                                center={this.center}
                                pathOptions={{ fillColor: 'blue' }}
                                radius={200}
                            />
                            <Circle
                                center={[400, 50]}
                                pathOptions={{ fillColor: 'red' }}
                                radius={100}
                                fill={true}
                                fillColor={ '#ff0000' }
                                stroke={false}
                            />
                            <LayerGroup>
                                <Circle
                                    center={[51.51, -0.08]}
                                    pathOptions={{ color: 'green', fillColor: 'green' }}
                                    radius={100}
                                />
                            </LayerGroup>
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>
                {/*<SVGOverlay attributes={{ stroke: 'red' }} bounds={this.bounds}>*/}
                {/*    {*/}
                {/*        this.state.birdDots.map((birdDot: BirdDot, i: number) => {*/}
                {/*            const { x, y } = convertLatLngToXY(birdDot.coords, this.state.zoomLevel)*/}
                {/*            return (*/}
                {/*                <circle r={4} cx={x} cy={y} fill={birdDot.color} strokeWidth={0} key={i}/>*/}
                {/*            )*/}
                {/*        })*/}
                {/*    }*/}
                {/*    <circle r={4} cx={400} cy={50} fill={'#000000'} strokeWidth={0} />*/}
                {/*</SVGOverlay>*/}
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

