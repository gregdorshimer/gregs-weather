"use client";
import { useState, useEffect } from "react";
import axios from 'axios';
import ForecastContent from "./forecast-content";
import Loc from "./loc.js";
import MyAsync from "./my-async.js";


const testURL1 = "https://api.weather.gov/gridpoints/GYX/31,80/forecast";
const testURL2 = "https://api.weather.gov/gridpoints/GYX/76,59/forecast";

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
    const [locs, setLocs] = useState(initLocs);

    function buildURL(city, state) {
        for (let i = 0; i < locs.length; i++) {
            if (locs[i].city == city && locs[i].state == state) {
                return "https://api.weather.gov/gridpoints/" + locs[i].office + "/" + locs[i].gridpoints + "/forecast";
            }
        }
        console.log("bad inputs for buildURL(city, state");
    }

    const fetchForecast = (city, state) => {
        let url = buildURL(city, state);
        axios.get(url)
            .then(({data}) => {
                setForecast(JSON.stringify(data));
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <div className="row">

                <div className="col-10">

                    <div className="col"></div>

                    <div className="col-10">
                        <ForecastContent content={forecast} />  
                    </div>              

                    <div className="col"></div>

                </div>

                <div className="col-2">

                    {/* <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Search..." />
                        <button className="btn btn-primary" onClick={() => search("sample text")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                            </svg>
                        </button>
                    </div> */}

                    {/* TODO react-select search bar Async */}
                    {/* https://react-select.com/home */}
                    {/* possible search API: */}
                    {/* https://developers.google.com/maps/documentation/places/web-service/search-text */}
                    {/* useful link: https://stackoverflow.com/questions/69293081/how-to-load-react-select-async-with-initial-options-for-edit-item-function-when */}
                    <MyAsync locs={locs} locSetter={setLocs} />

                    <div className="vstack gap-2 my-2">

                        {locs.map(loc => <Loc key={loc.coords} info={JSON.stringify(loc)} clickHandler={fetchForecast} />)}

                    </div>

                </div>

            </div>  
        </>
    );

}