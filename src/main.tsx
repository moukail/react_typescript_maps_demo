import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Layout from "./Layout.tsx";
import Home from  "./components/Home.tsx"
import MapBox from './components/MapBox.tsx'
import GoogleMaps from "./components/GoogleMaps.tsx";
import HereMaps from "./components/HereMaps.tsx";
import LeafletMaps from "./components/LeafletMaps.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />} >
                        <Route index element={<Home />} />
                        <Route path="/mapbox" element={<MapBox width='100vw' height='100vh' />} />
                        <Route path="/here-maps" element={<HereMaps width='100vw' height='100vh' />} />
                        <Route path="/leaflet-maps" element={<LeafletMaps />} />
                        <Route path="/google-maps" element={<GoogleMaps />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);

