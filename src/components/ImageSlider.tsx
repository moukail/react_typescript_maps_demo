import React, {useEffect, useRef, useState} from "react";
import {Box, Divider, IconButton, styled} from "@mui/material";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import MapBox from "./MapBox.tsx";
import HereMaps from "./HereMaps.tsx";

const SliderContainer = styled(Box)({
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    display: 'flex',
});

const ImageSlider = () => {

    const [sliderPosition, setSliderPosition] = useState(50); // Initial position at 50%
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isDragging = useRef(false);

    const startDragging = (e: React.MouseEvent) => {
        e.preventDefault();
        isDragging.current = true;
        window.addEventListener('mousemove', handleDrag);
        window.addEventListener('mouseup', stopDragging);
    };

    const stopDragging = () => {
        isDragging.current = false;
        window.removeEventListener('mousemove', handleDrag);
        window.removeEventListener('mouseup', stopDragging);
    };

    const handleDrag = (e: MouseEvent) => {
        if (isDragging.current && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const newSliderPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
            setSliderPosition(Math.max(0, Math.min(100, newSliderPosition))); // Keep within bounds (0 to 100)
        }
    };

    return (
        <>
            <SliderContainer
                ref={containerRef}
                sx={{height: 400, width: '100%', boxShadow: 3}}
            >
                <Box
                    sx={{
                        clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                        //backgroundColor: 'lightblue',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <HereMaps width='100%' height='500px' />
                </Box>
                <Box
                    sx={{
                        clipPath: `inset(0 0 0 ${sliderPosition}%)`,
                        //backgroundColor: 'lightcoral',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <MapBox width='100%' height='500px' />
                </Box>

                <Divider
                    component="div"
                    role="presentation"
                    style={{
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        width: '4px', // Thinner width
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'ew-resize',
                        left: `${sliderPosition}%`
                    }}
                    onMouseDown={startDragging}>
                    <IconButton
                        style={{
                            position: 'absolute',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#e70d0d',
                        }}
                    >
                        <SwapHorizIcon style={{color: '#ffffff'}}/>
                    </IconButton>
                </Divider>

            </SliderContainer>
        </>
    );
}

export default ImageSlider;