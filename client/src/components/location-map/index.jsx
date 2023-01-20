import React from "react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import { useState } from "react";
const libraries = ["places"];
const LocationMap = (props) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyD3DFJdrc6s8YMh9FXRU7ekVkN8lXFdWiI",
        libraries: libraries,
    });

    const center = props.center;
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));

    return (
        <React.Fragment>
            {isLoaded && (
                <GoogleMap
                    id="google-map-script"
                    state={map}
                    center={center}
                    zoom={15}
                    mapContainerStyle={{
                        width: "100%",
                        height: "100%",
                    }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    onLoad={(map) => setMap(map)}
                />
            )}
        </React.Fragment>
    );
};

export default LocationMap;
