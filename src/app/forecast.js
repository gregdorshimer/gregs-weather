"use client";
import { useState } from "react";
import axios from 'axios';
import ForecastTile from "./forecast-tile";
import Loc from "./loc.js";
import SearchBar from "./search-bar.js";

export default function Forecast() {
    // define the list of cached locs and the current forecast being displayed
    const [locs, setLocs] = useState([]);
    const [forecast, setForecast] = useState(null);

    // function for construction the url that can get a forecast from NWS for a given gridpoint and office
    function buildForecastURL(office, gridpoints) {
        return "https://api.weather.gov/gridpoints/" + office + "/" + gridpoints + "/forecast";
    }

    // function for getting a forecast, given an NWS office and gridpoints
    const fetchForecast = (office, gridpoints) => {
        let forecastURL = buildForecastURL(office, gridpoints);
        axios.get(forecastURL)
            .then(({data}) => {
                setForecast(data);
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
                    <div className="container">
                        <div className="row mt-3">
                                {forecast ? forecast.properties.periods.slice(0,5).map(
                                    item => <ForecastTile key={item.number} info={item} />) : null}
                        </div>
                    </div>
                    {/* <ForecastContent content={forecast} />   */}
                </div>              

                <div className="col"></div>
            </div>


            <div className="col-2">
                <div className="vstack gap-2 my-2">

                    <SearchBar locs={locs} locSetter={setLocs} forecastFetcher={fetchForecast} />

                    {locs.map((loc, index) => <Loc
                                                    key={"" + index + loc.coords}
                                                    info={loc}
                                                    clickHandler={fetchForecast} />)}

                </div>
            </div>

        </div>  
    );
}