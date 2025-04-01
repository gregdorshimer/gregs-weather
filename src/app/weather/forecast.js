"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from 'axios';


const testURL1 = "https://api.weather.gov/gridpoints/GYX/31,80/forecast";
const testURL2 = "https://api.weather.gov/gridpoints/GYX/76,59/forecast";

export default function Forecast() {
    const [currentLoc, setCurrentLoc] = useState(testURL2);
    const [forecast, setForecast] = useState();

    const fetchForecast = () => {
        axios.get(currentLoc)
            .then(({data}) => {
                console.log(data);
                setForecast(JSON.stringify(data));
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="row">

            <div className="col-4">
                {/* TODO left column for location description, legend */}
                <p>Sample location description.</p>
            </div>

            <div className="col-4">
                {/* TODO forecast graph content */}
                
                <p>Sample forecast graph.</p>
                
                <button 
                    type="button"
                    className="btn btn-primary"
                    onClick={fetchForecast}>
                    Fetch Forecast
                </button>

                <p>{forecast}</p>
                

            </div>

            <div className="col-4">
                {/* TODO search bar and recent locations */}
                <p>Sample search bar and recently viewed.</p>
            </div>

        </div>
    );

}