import {useEffect, useRef, useState} from "react";
import H from "@here/maps-api-for-javascript";
import {IpAddress} from "../types/ip-address.type.ts";
import {getIpAddress} from "../services/ipAddress.ts";
import Maps from "./Maps.tsx";

const HereMaps = ({width , height}: {width:string, height: string}) => {
    const [ipAddr, setIpAddr] = useState<IpAddress | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const mapContainerRef = useRef<HTMLDivElement>(null);
    const map = useRef(null);
    const platform = useRef(null);

    useEffect(() => {
        getIpAddress()
            .then(data => {
                setIpAddr(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch IP address:', err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {

        if (map.current || !ipAddr) return;

        // Create a platform object with the API key and useCIT option
        platform.current = new H.service.Platform({
            apikey: import.meta.env.VITE_HERE_API_KEY as string
        });

        // Obtain the default map types from the platform object:
        const defaultLayers = platform.current.createDefaultLayers({
            pois: true
        });

        // Create a new map instance with the Tile layer, center and zoom level
        // Instantiate (and display) a map:
        const newMap = new H.Map(
            mapContainerRef.current,
            defaultLayers.raster.terrain.map, {
                zoom: 14,
                center: { lat: ipAddr.lat, lng: ipAddr.lon },
            }
        );

        // Add panning and zooming behavior to the map
        const behavior = new H.mapevents.Behavior(
            new H.mapevents.MapEvents(newMap)
        );

        // Set the map object to the reference
        map.current = newMap;

        // Add a marker at the specified position
        const marker = new H.map.Marker({ lat: ipAddr.lat, lng: ipAddr.lon });
        map.current.addObject(marker);

    }, [ipAddr]);

    return (
        <Maps width={width} height={height} mapContainerRef={mapContainerRef} loading={loading} ipAddr={ipAddr} />
    );
}
export default HereMaps;