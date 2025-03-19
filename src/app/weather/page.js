import "bootstrap/dist/css/bootstrap.min.css";
import { Chau_Philomene_One } from "next/font/google";
import Link from "next/link"
import Suspense from 'react'
import WeatherContent from "./weather-content";


async function fetchForecast() {
    // NWS API docs:
    // Docs home: https://www.weather.gov/documentation/services-web-api
    // FAQ: https://weather-gov.github.io/api/gridpoints

    // Find coordinates on the map: https://gps-coordinates.org/

    // Find forecast office codes: https://en.wikipedia.org/wiki/List_of_National_Weather_Service_Weather_Forecast_Offices
    
    // Get a grid loc (properties.gridX, and properties.gridY, and office is properties.gridId) given
    // coordinates:
    // https://api.weather.gov/points/43.66%2C-70.26
    // return GYX, 76, 59 (Portland, ME), among other data

    // Get forecast for an office and a grid loc: https://api.weather.gov/gridpoints/GYX/31,80/forecast

    // TODO

    const data = await fetch("https://api.weather.gov/gridpoints/GYX/31,80/forecast");
    const forecast = await data.json();
    console.log(forecast.properties);
    return forecast.properties;
}

export default function WeatherPage({children}) {
    // const promise = fetchForecast();
    // const promise = fetch("https://api.weather.gov/gridpoints/GYX/31,80/forecast");

    return (
        // <Suspense fallback={<div>Loading...</div>}>
            <div className="container text-center">
                            
                <div className="row">
                    {/* TODO title area */}
                    <h1>Weather</h1>
                    <Link href="/"><button type="button" className="btn btn-primary">Home</button></Link>
                </div>
            

            
                    <WeatherContent />
            
            
            
                <div className="container text-center fixed-bottom">
                    <p>Developed by Greg Dorshimer • March 2025</p>
                    {/* TODO footer here e.g. "Built by Greg Dorshimer 2025" */}
                </div>
        
            </div>
        // </Suspense>
    );
}
