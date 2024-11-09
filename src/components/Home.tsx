import ImageSlider from "./ImageSlider.tsx";

const Home = () => {
    return (
        <>
            <ImageSlider
                leftSrc="/mapbox"
                rightSrc="/here-maps"
            />
        </>
    );
}

export default Home;