import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import {useEffect, useState} from "react";
import {getIpAddress} from "../services/ipAddress.ts";
import {IpAddress} from "../types/ip-address.type.ts";
import {Box, CircularProgress, Grid2} from "@mui/material";

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const GoogleMaps = () => {

    const [ipAddr, setIpAddr] = useState<IpAddress>();
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
                <CircularProgress />
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
                                <APIProvider apiKey={MAPS_API_KEY}>
                                    <Map
                                        defaultCenter={{ lat: ipAddr.lat, lng: ipAddr.lon  }}
                                        defaultZoom={10}
                                        gestureHandling={'greedy'}
                                        disableDefaultUI={true}
                                    >
                                        <Marker
                                            position={{ lat: ipAddr.lat, lng: ipAddr.lon  }}
                                            clickable={true}
                                            onClick={() => alert('marker was clicked!')}
                                            title={'clickable google.maps.Marker'}
                                        />
                                    </Map>
                                </APIProvider>
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

export default GoogleMaps;