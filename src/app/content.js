import { useState } from "react";
import axios from 'axios';
import { getGeocode, getLatLng } from "use-places-autocomplete";
import ForecastTile from "./forecast-tile";
import Loc from "./loc.js";
import SearchBar from "./search-bar.js";

export default function Content() {
    const [cachedLocs, setCachedLocs] = useState([]);
    const [currentLoc, setCurrentLoc] = useState(null);
    const [forecast, setForecast] = useState(null);

    // function for getting the office code and gridpoints from NWS for given coords:
    const getOfficeGridpoints = async (coords) => {
        const [lat, lng] = coords.split(",");
        try {
            const response = await axios.get(`https://api.weather.gov/points/${lat}%2C${lng}`);
            const office = response.data.properties.gridId;
            const gridpoints = `${response.data.properties.gridX},${response.data.properties.gridY}`;
            return {office, gridpoints};
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // function for getting a forecast for the given coords from NWS:
    const getForecast = async (coords) => {
        const obj = await getOfficeGridpoints(coords);
        try {
            const response = await axios.get(`https://api.weather.gov/gridpoints/${obj.office}/${obj.gridpoints}/forecast`);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    const selectNewLoc = async (option) => {
        // "option" is the object that is returned by the Google Places API call
        if (!option) return;

        // create the newLoc object:
        let newLoc = {
            city: option.city,
            state: option.state,
        };

        try {
            // the results of 'usePlacesAutocomplete' hook do not contain coords, so have to fetch them here
            // using the placeId, then set them on the newLoc object:
            const results = await getGeocode({ placeId: option.value });
            const { lat, lng } = await getLatLng(results[0]); // function to extract {lat, lng} from the complicated json object returned by getGeocode
            newLoc.coords = `${lat},${lng}`;

            // set the newly geocoded loc to be the currentLoc, get its forecast, and set the forecast:
            setCurrentLoc(newLoc);
            const newForecast = await getForecast(newLoc.coords);
            setForecast(newForecast);

            // add the newLoc to the cachedLocs:
            const newCachedLocs = [...cachedLocs]; // spreading then re-assigning ensures a re-render when setCachedLocs is called
            // let newCachedLocs = cachedLocs;   <-- i.e. this doesn't cause a re-render when setCachedLocs is called below
            newCachedLocs.unshift(newLoc);
            setCachedLocs(newCachedLocs.slice(0, process.env.NEXT_PUBLIC_LOC_CACHE_SIZE));
        } catch (error) {
            console.error(error);
        }
    };

    const selectCachedLoc = async (loc) => {
        try {
            setCurrentLoc(loc);
            const newForecast = await getForecast(loc.coords);
            setForecast(newForecast);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="flex justify-center pb-4">
                <div className="max-w-md w-full">
                    <SearchBar
                        selectNewLocHandler={selectNewLoc}
                    />
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-4">
                {cachedLocs.map((loc, index) => (
                    <Loc
                        key={`${index}-${loc.coords}`}
                        info={loc}
                        selectCachedLocHandler={selectCachedLoc}
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
