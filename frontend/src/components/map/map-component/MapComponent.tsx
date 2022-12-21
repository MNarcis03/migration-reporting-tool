import { LatLngBoundsExpression, LatLngTuple, LeafletEvent, LeafletMouseEvent, Map } from 'leaflet';
import React from 'react';
import { Circle, LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { COLOR_PRIMARY, COLOR_SURFACE } from '../../../styling/colors';
import styles from './MapComponent.module.scss';
import { ActionLog } from '../../../annotations';
import * as birdsService from '../../../services/birds-service';
import { checkPointInsideCircle, extractTagsIntoEnumList } from "./helper";
import { BirdDot } from "../../../models/bird-dot.model";
import { DEFAULT_ZOOM, MAX_LAT, MAX_LNG, MAX_ZOOM, MIN_ZOOM } from "./constants";
import { TweetModel } from "../../../models/tweet.model";
import { TagsIdsEnum } from "../../../models/tags-ids.enum";

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

    private position: LatLngTuple = [45, 0];
    private maxBounds: LatLngBoundsExpression = [[-MAX_LAT, -MAX_LNG], [MAX_LAT, MAX_LNG]];

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
            const indexesList: number[] = [];
            for(let i = 0; i < this.state.birdDots.length; i++) {
                const x = this.state.birdDots[i].coords[1];
                const y = this.state.birdDots[i].coords[0];
                if(checkPointInsideCircle(event.latlng.lng, event.latlng.lat, 4, x, y)) {
                    indexesList.push(i);
                    console.log('inside');
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
        this.updateBirds(2022, 12);
        
    }

    componentDidUpdate(prevProps: Readonly<MapComponentProps>, prevState: Readonly<MyState>, snapshot?: any): void {
        if(!this.listenersHaveBeenSet && this.mapRef.current) {
            this.setZoomListener();
            this.setHoverListener();
        }
    }

    @ActionLog('query bird dots')
    updateBirds(year: number, month: number) {
        birdsService.getBirdsInfoByMonth(year, month).then((data) => {
            if(!data) return;
            this.setState((state) => {
                state = {
                    birdDots: data.map((data: TweetModel) => ({
                        coords: [data.latitude, data.longitude],
                        color: COLOR_SURFACE,
                        nr: data.appearances,
                        tagsIds: extractTagsIntoEnumList(data.species)
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
                    {
                        Object.keys(TagsIdsEnum).map((key) => {
                            // @ts-ignore
                            return <LayersControl.Overlay checked name={TagsIdsEnum[key]}>
                                <LayerGroup>
                                    {
                                        this.state.birdDots
                                            .filter((birdDot: BirdDot) => {
                                                
                                                // @ts-ignore
                                                return birdDot.tagsIds.includes(TagsIdsEnum[key]);
                                            })
                                            .map((birdDot: BirdDot) => {
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
                                </LayerGroup>
                            </LayersControl.Overlay>
                        })
                    }
                </LayersControl>
            </MapContainer>
        );
    }
}

export default MapComponent;

