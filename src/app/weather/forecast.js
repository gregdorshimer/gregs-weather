"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from 'axios';
import ForecastContent from "./forecast-content";


const testURL1 = "https://api.weather.gov/gridpoints/GYX/31,80/forecast";
const testURL2 = "https://api.weather.gov/gridpoints/GYX/76,59/forecast";

const locs = {
    "Portland, ME": {
        coords: "43.65,-70.27",
        office: "GYX",
        gridpoints: "76,59"
    },
    "Salt Lake City, UT": {
        coords: "40.7,-111.9",
        office: "SLC",
        gridpoints: "100,173",
    }
};

function buildURL(loc) {
    // "loc" must be a string that is a present as a key in "locs"
    return "https://api.weather.gov/gridpoints/" + locs[loc].office + "/" + locs[loc].gridpoints + "/forecast";
}


// NWS API docs:
// Docs home: https://www.weather.gov/documentation/services-web-api
// FAQ: https://weather-gov.github.io/api/gridpoints

// Find coordinates on the map: https://gps-coordinates.org/

// Find forecast office codes: https://en.wikipedia.org/wiki/List_of_National_Weather_Service_Weather_Forecast_Offices

// Get a grid loc (properties.gridX, and properties.gridY, and office is properties.gridId) given
// coordinates:
// https://api.weather.gov/points/43.65%2C-70.27
// return GYX, 76, 59 (Portland, ME), among other data

// Get forecast for an office and a grid loc:
// https://api.weather.gov/gridpoints/GYX/31,80/forecast
// https://api.weather.gov/gridpoints/GYX/76,59/forecast

export default function Forecast() {
    const [currentLoc, setCurrentLoc] = useState(testURL1);
    const [forecast, setForecast] = useState();

    const fetchForecast = (loc) => {
        let url = buildURL(loc);
        axios.get(url)
            .then(({data}) => {
                // console.log(data.properties.periods);
                setForecast(JSON.stringify(data));
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <div className="row">

                {/* <div className="col-4"> */}
                    {/* TODO left column for location description, legend */}
                    {/* <p>Sample location description.</p> */}
                {/* </div> */}

                <div className="col-10">
                    {/* TODO forecast graph content */}

                    <div className="col"></div>

                    <div className="col-10">
                        <ForecastContent content={forecast} />  
                    </div>              

                    <div className="col"></div>

                </div>

                <div className="col-2">
                    {/* TODO search bar and recent locations */}

                    <div className="vstack gap-2">

                        <button 
                            type="button"
                            className="btn btn-primary"
                            onClick={() => fetchForecast("Portland, ME")}>
                            Portland, ME
                        </button>

                        <button 
                            type="button"
                            className="btn btn-primary"
                            onClick={() => fetchForecast("Salt Lake City, UT")}>
                            Salt Lake City, UT
                        </button>

                    </div>

                </div>

            </div>
        </>
    );

}