import {Box, CircularProgress, Grid2} from "@mui/material";
import {IpAddress} from "../types/ip-address.type.ts";
import {RefObject} from "react";

type MapsProps = {
    mapContainerRef: RefObject<HTMLDivElement>,
    loading: boolean,
    ipAddr: IpAddress | null,
}

const Maps = ({mapContainerRef, loading, ipAddr}: MapsProps) => {
    return (
        <>
            <Box ref={mapContainerRef} sx={{
                width: '100vw',   // Full viewport width
                height: '100vh',  // Full viewport height
                position: 'absolute',
                opacity: 0.5,
                top: 0,
                left: 0,
            }} />
            <Box sx={{
                position: 'relative',
                padding: '20px'
            }}>
                {loading ? (
                    <CircularProgress />  // Loading indicator
                ) : (
                    ipAddr && (
                        <>
                            <Grid2 container spacing={3}>
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
                                <Grid2 size={6}>
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
                        </>
                    )
                )}
            </Box>
        </>
    );
}

export default Maps;