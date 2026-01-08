"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Forecast from "./forecast";
import { LoadScript } from "@react-google-maps/api";

export default function WeatherPage({children}) {
    return (
        <div className="container text-center">
                        
            <div className="row">
                <h1>Weather</h1>
            </div>

            {/* load the react-google-maps/api library with the API key:
            this loads the hook 'usePlacesAutocomplete' so that its queries are done using the provided API key.
            <Forecast /> is inside it so that it can access the library */}
            <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                libraries={["places"]}
            >
                <Forecast />
            </LoadScript>
        
            <div className="container text-center fixed-bottom">
                <p>Developed by Greg Dorshimer • January 2026</p>
                {/* TODO footer style */}
            </div>
    
        </div>
    );
}
