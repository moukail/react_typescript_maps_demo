import React, {useRef, useState} from "react";
import {Box, Divider, IconButton, styled} from "@mui/material";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

interface ImageSliderProps {
    leftSrc: string;
    rightSrc: string;
}

const SliderContainer = styled(Box)({
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    display: 'flex',
});

const Iframe = styled('iframe')({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    border: 0,
    // To scale the content proportionally
    transformOrigin: '0 0', // Maintain top-left origin for scaling
});

const ImageSlider = ({ leftSrc, rightSrc }: ImageSliderProps) => {
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
            console.log('newSliderPosition', newSliderPosition);
        }
    };

    return (
        <>
            <SliderContainer
                ref={containerRef}
                sx={{height: 400, width: '100%', boxShadow: 3}}
            >
                {/* Left Iframe */}
                <Iframe
                    src={leftSrc}
                    style={{
                        clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                        width: '100%', height: '560px'
                    }}
                    title="Left Side"
                />

                {/* Right Iframe */}
                <Iframe
                    src={rightSrc}
                    style={{
                        clipPath: `inset(0 0 0 ${sliderPosition}%)`,
                        width: '100%', height: '560px'
                    }}
                    title="Right Side"
                />

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