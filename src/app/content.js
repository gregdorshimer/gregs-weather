import { useState } from "react";
import axios from 'axios';
import ForecastTile from "./forecast-tile";
import Loc from "./loc.js";
import SearchBar from "./search-bar.js";

export default function Content() {
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
        <>
            <div className="flex justify-center pb-4">
                <div className="max-w-md w-full">
                    <SearchBar
                        locs={locs}
                        locSetter={setLocs}
                        forecastFetcher={fetchForecast}
                    />
                </div>

            </div>

            <div className="flex gap-2 overflow-x-auto pb-4">
                {locs.map((loc, index) => (
                    <Loc
                    key={`${index}-${loc.coords}`}
                    info={loc}
                    clickHandler={fetchForecast}
                    />
                ))}
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4">
                {forecast && forecast.properties.periods.map(item => (
                    <ForecastTile key={item.number} info={item} />
                ))}
            </div>
        </>
    );
}
