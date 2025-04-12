"use client";
import { useState } from "react";
import axios from 'axios';
import ForecastContent from "./forecast-content";
import Loc from "./loc.js";
import MyAsync from "./my-async.js";

// NWS API docs:
// Docs home: https://www.weather.gov/documentation/services-web-api
// FAQ: https://weather-gov.github.io/api/gridpoints

// Find coordinates on the map, or use Google Places API:
// https://gps-coordinates.org/

// Find forecast office codes, or use gridpointURL below: 
// https://en.wikipedia.org/wiki/List_of_National_Weather_Service_Weather_Forecast_Offices

// gridpointURL: Get a grid loc and office code (properties.gridX, and properties.gridY, and
// properties.gridId) given lat,long:
// https://api.weather.gov/points/43.65%2C-70.27
// return GYX, 76, 59 (Portland, ME), among other data

// forecastURL: Get forecast given office code and gridpoints:
// https://api.weather.gov/gridpoints/GYX/31,80/forecast
// https://api.weather.gov/gridpoints/GYX/76,59/forecast

export default function Forecast() {
    const initLocs = [
        {
            city: "Portland",
            state: "ME",
            coords: "43.65,-70.27",
            office: "GYX",
            gridpoints: "76,59"
        },
        {
            city: "Salt Lake City",
            state:"UT",
            coords: "40.7,-111.9",
            office: "SLC",
            gridpoints: "100,173",
        },
    ];

    const [locs, setLocs] = useState(initLocs);
    const [forecast, setForecast] = useState(null);

    function buildForecastURL(office, gridpoints) {
        return "https://api.weather.gov/gridpoints/" + office + "/" + gridpoints + "/forecast";
    }

    const fetchForecast = (office, gridpoints) => {
        let forecastURL = buildForecastURL(office, gridpoints);
        axios.get(forecastURL)
            .then(({data}) => {
                setForecast(JSON.stringify(data));
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="row">

            <div className="col-10">
                <div className="col"></div>

                <div className="col-10">
                    <ForecastContent content={forecast} />  
                </div>              

                <div className="col"></div>
            </div>


            <div className="col-2">
                <div className="vstack gap-2 my-2">

                    <MyAsync locs={locs} locSetter={setLocs} forecastFetcher={fetchForecast} />

                    {locs.map((loc, index) => <Loc
                                                    key={"" + index + loc.coords}
                                                    info={JSON.stringify(loc)}
                                                    clickHandler={fetchForecast} />)}

                </div>
            </div>

        </div>  
    );
}