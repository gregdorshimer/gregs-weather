"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";


const testURL1 = "https://api.weather.gov/gridpoints/GYX/31,80/forecast";
const testURL2 = "https://api.weather.gov/gridpoints/GYX/76,59/forecast";

async function fetchForecast(resource) {
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
    // https://api.weather.gov/gridpoints/GYX/76,59/forecast

    // TODO take params to construct URL

    const fetcher = (url) => fetch(url).then((r) => r.json());
    
    const { data, error, isLoading } = useSWR(
        resource,
        fetcher
    );

    if (isLoading) return <p>Loading...</p>;

    if (error) return <p>Failed to fetch data.</p>;

    return data;

    // const data = await fetch("https://api.weather.gov/gridpoints/GYX/31,80/forecast");
    // const forecast = await data.json();
    // console.log(forecast.properties);
    // return forecast.properties;
}

function Forecast({setForecast, resource}) {
    const fetcher = (url) => fetch(url).then((r) => r.json());

    const { data, error, isLoading } = useSWR(
        resource,
        fetcher
    );

    if (isLoading) { setForecast("Loading..."); return <></>; }

    if (error) { setForecast("Failed to fetch data."); return <></>; }

    setForecast(data);

    return <>{data}</>;
}

function ForecastButton({setForecast, setStartFetching, resource}) {

    function handleClick() {
        setStartFetching(true);
    }

    return (
        <>
            <button 
                type="button"
                className="btn btn-primary"
                onClick={handleClick}>
                Fetch Forecast
            </button>
        </>
    );

}

export default function WeatherContent({forecastPromise}) {
    // const [testForecast, setTestForecast] = useState(0);
    const [currentLoc, setCurrentLoc] = useState(testURL1);
    const [forecast, setForecast] = useState();
    const [startFetching, setStartFetching] = useState(false);

    // const forecast = use(forecastPromise);
    // const promise = fetchForecast();
    // const promise = fetch("https://api.weather.gov/gridpoints/GYX/31,80/forecast");

    return (
        <div className="row">

            <div className="col-4">
                {/* TODO left column for location description, legend */}
                <p>Sample location description.</p>
            </div>

            <div className="col-4">
                {/* TODO forecast graph content */}
                
                <p>Sample forecast graph.</p>
                
                <ForecastButton setStartFetching={setStartFetching} />
                
                {startFetching && <Forecast setForecast={setForecast} url={currentLoc} />}

            </div>

            <div className="col-4">
                {/* TODO search bar and recent locations */}
                <p>Sample search bar and recently viewed.</p>
            </div>

        </div>
    );
}