import {useEffect, useState} from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import {Box, CircularProgress, Grid2} from "@mui/material";
import L from 'leaflet';
import "leaflet/dist/leaflet.css"; // <- Leaflet styles

// Leaflet marker icon fix for compatibility with Webpack
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import {getIpAddress} from "../services/ipAddress.ts";
import {IpAddress} from "../types/ip-address.type.ts";

const defaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const LeafletMaps = () => {
    const [ipAddr, setIpAddr] = useState<IpAddress | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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

    return (
        <>
            {loading ? (
                <CircularProgress />  // Loading indicator
            ) : (
                ipAddr && (
                    <Grid2 container spacing={3}>
                        <Grid2 size={{ xs: 12, md: 12 }}>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '400px',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    boxShadow: 3,
                                }}
                            >
                                <MapContainer
                                    center={[ipAddr.lat, ipAddr.lon]}
                                    zoom={13}
                                    scrollWheelZoom={true}
                                    style={{ width: '100%', height: '100%' }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[ipAddr.lat, ipAddr.lon]} />
                                </MapContainer>
                            </Box>
                        </Grid2>
                        <Grid2 size="grow">
                            <Grid2 size="grow">
                                <Box>
                                    <h3>My IP Address V4</h3>
                                    <p>{ipAddr.query}</p>
                                    {/*<h3>My IP V6</h3>
                                        <p>{ipAddr.ipv6 || "N/A"}</p>*/}
                                    <h3>Internet Provider</h3>
                                    <p>{ipAddr.isp}</p>
                                    <h3>Proxy</h3>
                                    <p>{ipAddr.proxy? 'Yes' : 'No'}</p>
                                </Box>
                            </Grid2>
                        </Grid2>
                        <Grid2 size="grow">
                            <Box>
                                <h3>Continent</h3>
                                <p>{ipAddr.continent}</p>
                                <h3>country</h3>
                                <p>{ipAddr.country}</p>
                                <h3>City</h3>
                                <p>{ipAddr.city}</p>
                            </Box>
                        </Grid2>
                    </Grid2>
                )
            )}
        </>
    );
}
export default LeafletMaps