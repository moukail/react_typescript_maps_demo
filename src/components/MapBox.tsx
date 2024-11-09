import {useEffect, useRef, useState} from 'react'
import mapboxgl from 'mapbox-gl';
import {getIpAddress} from "../services/ipAddress.ts";
import {IpAddress} from "../types/ip-address.type.ts";
import Maps from "./Maps.tsx";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;

function MapBox({width , height}: {width:string, height: string}) {
    const [ipAddr, setIpAddr] = useState<IpAddress | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const markerRef = useRef<mapboxgl.Marker | null>(null); // Marker reference

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

        if (!ipAddr) return;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current as HTMLDivElement,
            style: 'mapbox://styles/mapbox/light-v11',
            center: [ipAddr.lon, ipAddr.lat], // Set initial center to New York City
            zoom: 13,
        });

        // Add a marker to the map
        markerRef.current = new mapboxgl.Marker({ color: 'red' }) // Optional color
            .setLngLat([ipAddr.lon, ipAddr.lat]) // Set marker position to the user's IP-based location
            .addTo(map); // Add marker to the map

        return () => {
            map.remove();
            markerRef.current = null; // Clean up marker reference
        };
    }, [ipAddr]);

    return (
        <Maps width={width} height={height} mapContainerRef={mapContainerRef} loading={loading} ipAddr={ipAddr} />
    );
}

export default MapBox
